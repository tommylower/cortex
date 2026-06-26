#!/usr/bin/env node
/* Verify that a Muller-Brockmann scaffold is using its grid as structure. */

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function loadPuppeteer() {
  const requested = process.env.PUP;
  const candidates = requested ? [requested] : ["puppeteer-core", "puppeteer"];

  for (const candidate of candidates) {
    let resolved;
    try {
      resolved = require.resolve(candidate);
    } catch (error) {
      if (error.code === "MODULE_NOT_FOUND") continue;
      throw error;
    }

    return require(resolved);
  }

  console.error(
    "missing Puppeteer dependency: install puppeteer or puppeteer-core in the project, or set PUP=/absolute/path/to/puppeteer"
  );
  process.exit(2);
}

function option(name, fallback) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function pageUrl() {
  const raw = process.argv.slice(2).find((arg) => !arg.startsWith("--")) || "./index.html";
  if (/^https?:\/\//.test(raw) || raw.startsWith("file://")) return raw;
  const filePath = path.resolve(raw);
  if (!fs.existsSync(filePath)) {
    console.error(`missing file: ${filePath}`);
    process.exit(2);
  }
  return pathToFileURL(filePath).href;
}

async function main() {
  const puppeteer = loadPuppeteer();
  const url = pageUrl();
  const widths = option("widths", "1440,1180,900").split(",").map((value) => Number.parseInt(value, 10));
  const baseline = Number.parseFloat(option("baseline", "8"));
  const launch = {
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dbus",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--hide-scrollbars",
    ],
  };
  if (process.env.CHROME) launch.executablePath = process.env.CHROME;

  const browser = await puppeteer.launch(launch);
  const page = await browser.newPage();
  let failed = false;

  for (const width of widths) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const result = await page.evaluate((baselineUnit) => {
      const opticalSelector = "[data-mb-optical], .mb-masthead, .mb-numeral, .mb-section-title";
      const grid = document.querySelector(".mb-grid");
      if (!grid) return { missing: ".mb-grid" };

      const gridRect = grid.getBoundingClientRect();
      const gridStyle = getComputedStyle(grid);
      const tracks = gridStyle.gridTemplateColumns.split(" ").map(Number.parseFloat).filter(Number.isFinite);
      const gap = Number.parseFloat(gridStyle.columnGap) || 0;
      const starts = [];
      const ends = [];
      let x = gridRect.left;

      for (let index = 0; index < tracks.length; index += 1) {
        starts.push(x);
        x += tracks[index];
        ends.push(x);
        if (index < tracks.length - 1) x += gap;
      }

      const nearestDistance = (value, values) =>
        values.reduce((min, candidate) => Math.min(min, Math.abs(candidate - value)), Number.POSITIVE_INFINITY);
      const nearestValue = (value, values) =>
        values.reduce((best, candidate) => (Math.abs(candidate - value) < Math.abs(best - value) ? candidate : best), values[0]);

      let columnError = 0;
      let worstColumn = "";
      document.querySelectorAll(".mb-band > *").forEach((element) => {
        if (element.matches(opticalSelector)) return;
        const rect = element.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        const error = Math.max(nearestDistance(rect.left, starts), nearestDistance(rect.right, ends));
        if (error > columnError) {
          columnError = error;
          worstColumn = element.className || element.tagName;
        }
      });

      let overlayError = 0;
      document.querySelectorAll(".mb-guides__col").forEach((column, index) => {
        const rect = column.getBoundingClientRect();
        if (starts[index] != null) overlayError = Math.max(overlayError, Math.abs(rect.left - starts[index]));
        if (ends[index] != null) overlayError = Math.max(overlayError, Math.abs(rect.right - ends[index]));
      });

      const rowsTop = document.querySelector(".mb-guides__rows")?.getBoundingClientRect().top || gridRect.top;
      let baselineError = 0;
      document.querySelectorAll("[data-mb-baseline], p, li, figcaption").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        const offset = rect.top - rowsTop;
        const modulo = ((offset % baselineUnit) + baselineUnit) % baselineUnit;
        baselineError = Math.max(baselineError, Math.min(modulo, baselineUnit - modulo));
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      let inkError = 0;
      let worstInk = "";
      if (context) {
        document.querySelectorAll(opticalSelector).forEach((element) => {
          const style = getComputedStyle(element);
          let glyph = (element.textContent || "").trim().charAt(0);
          if (!glyph) return;
          if (style.textTransform === "uppercase") glyph = glyph.toUpperCase();
          context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          const offset = context.measureText(glyph).actualBoundingBoxLeft;
          if (!Number.isFinite(offset)) return;
          const rect = element.getBoundingClientRect();
          const target = nearestValue(rect.left, starts);
          const inkLeft = rect.left - offset;
          const error = Math.abs(inkLeft - target);
          if (error > inkError) {
            inkError = error;
            worstInk = `${element.className || element.tagName} "${glyph}"`;
          }
        });
      }

      return {
        columns: tracks.length,
        columnError: Number(columnError.toFixed(2)),
        overlayError: Number(overlayError.toFixed(2)),
        baselineError: Number(baselineError.toFixed(2)),
        inkError: Number(inkError.toFixed(2)),
        worstColumn,
        worstInk,
      };
    }, baseline);

    if (result.missing) {
      console.log(`[FAIL] vw=${width} missing ${result.missing}`);
      failed = true;
      continue;
    }

    const pass =
      result.columnError <= 0.75 &&
      result.overlayError <= 0.75 &&
      result.baselineError <= baseline / 2 &&
      result.inkError <= 1.25;
    if (!pass) failed = true;

    console.log(
      `[${pass ? "PASS" : "FAIL"}] vw=${width} cols=${result.columns} col=${result.columnError}px overlay=${result.overlayError}px baseline=${result.baselineError}px ink=${result.inkError}px worstCol=${result.worstColumn || "-"} worstInk=${result.worstInk || "-"}`
    );
  }

  await browser.close();
  if (failed) {
    console.error("GRID VERIFY: FAIL");
    process.exit(1);
  }
  console.log("GRID VERIFY: PASS");
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(2);
});
