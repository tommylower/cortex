#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rootArg = args.find((arg) => !arg.startsWith("--")) || ".";
const root = path.resolve(rootArg);
const asJson = args.includes("--json");

const ignoreDirs = new Set([
  ".git",
  ".next",
  ".nuxt",
  ".svelte-kit",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "vendor"
]);

const textExts = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".mdx",
  ".scss",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue"
]);

const patterns = [
  ["color.hex", /(?<![\w-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\w-])/g],
  ["color.func", /\b(?:rgb|rgba|hsl|hsla|oklch|oklab|color)\([^)]+\)/g],
  ["tailwind.arbitrary", /\b[a-z0-9_:/.-]+-\[[^\]\n]+\]/gi],
  ["motion.duration", /\b\d+(?:\.\d+)?m?s\b/g],
  ["motion.easing", /\b(?:cubic-bezier|steps)\([^)]+\)/g],
  ["space.px", /(?<![\w.-])-?\d+(?:\.\d+)?px\b/g],
  ["radius", /\b(?:rounded|radius)-\[[^\]\n]+\]/gi]
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && shouldRead(full)) {
      files.push(full);
    }
  }
  return files;
}

function shouldRead(file) {
  if (file.endsWith(".lock")) return false;
  return textExts.has(path.extname(file));
}

function add(map, type, value, file, lineNumber, line) {
  const key = `${type}\u0000${value}`;
  const existing = map.get(key) || {
    type,
    value,
    count: 0,
    examples: []
  };
  existing.count += 1;
  if (existing.examples.length < 5) {
    existing.examples.push({
      path: path.relative(root, file),
      line: lineNumber,
      text: line.trim().slice(0, 180)
    });
  }
  map.set(key, existing);
}

function scanFile(file, map) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const [type, pattern] of patterns) {
      pattern.lastIndex = 0;
      for (const match of line.matchAll(pattern)) {
        add(map, type, match[0], file, index + 1, line);
      }
    }
  }
}

function printMarkdown(results) {
  console.log(`# Raw Value Scan`);
  console.log();
  console.log(`root: \`${root}\``);
  console.log();
  console.log(`| type | value | count | examples |`);
  console.log(`| --- | --- | ---: | --- |`);
  for (const item of results) {
    const examples = item.examples
      .map((example) => `\`${example.path}:${example.line}\``)
      .join("<br>");
    console.log(`| ${item.type} | \`${item.value.replaceAll("|", "\\|")}\` | ${item.count} | ${examples} |`);
  }
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`not a directory: ${root}`);
  process.exit(2);
}

const map = new Map();
for (const file of walk(root)) {
  scanFile(file, map);
}

const results = [...map.values()].sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));

if (asJson) {
  console.log(JSON.stringify({ root, results }, null, 2));
} else {
  printMarkdown(results);
}
