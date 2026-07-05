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

const codeExts = new Set([".astro", ".js", ".jsx", ".svelte", ".ts", ".tsx", ".vue"]);

const floorPatterns = [
  ["radix", /@radix-ui\//],
  ["base-ui", /@base-ui\//],
  ["react-aria", /react-aria|react-stately|react-spectrum/],
  ["headless-ui", /@headlessui\//],
  ["floating-ui", /@floating-ui\//]
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
  if (!codeExts.has(path.extname(file))) return false;
  const normalized = file.split(path.sep).join("/");
  return /(^|\/)(app|components|src|packages|ui|views|routes)(\/|$)/.test(normalized);
}

function unique(values) {
  return [...new Set(values)].sort();
}

function extractComponents(text, file) {
  const names = [];
  const regexes = [
    /export\s+function\s+([A-Z][A-Za-z0-9_]*)/g,
    /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=/g,
    /function\s+([A-Z][A-Za-z0-9_]*)/g,
    /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(?:forwardRef|React\.forwardRef|\()/g
  ];
  for (const regex of regexes) {
    for (const match of text.matchAll(regex)) names.push(match[1]);
  }

  if (!names.length) {
    const base = path.basename(file, path.extname(file));
    if (/^[A-Z]/.test(base)) names.push(base);
  }

  return unique(names);
}

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const floors = floorPatterns
    .filter(([, regex]) => regex.test(text))
    .map(([name]) => name);
  const stateHints = unique((text.match(/\b(?:hover|focus-visible|focus|active|disabled|loading|success|error|empty|open|closed|selected|checked|pressed|aria-[a-z-]+|role=)\b/g) || []));
  const variantHints = [];
  if (/\bcva\s*\(|class-variance-authority/.test(text)) variantHints.push("cva");
  if (/\btv\s*\(|tailwind-variants/.test(text)) variantHints.push("tailwind-variants");
  if (/\bvariants?\s*[:=]/.test(text)) variantHints.push("variants");
  if (/\bcompoundVariants\b/.test(text)) variantHints.push("compoundVariants");

  return {
    path: path.relative(root, file),
    components: extractComponents(text, file),
    floors: unique(floors),
    variantHints: unique(variantHints),
    stateHints
  };
}

function printMarkdown(results) {
  console.log(`# Component Scan`);
  console.log();
  console.log(`root: \`${root}\``);
  console.log();
  console.log(`| path | components | floors | variants | state hints |`);
  console.log(`| --- | --- | --- | --- | --- |`);
  for (const item of results) {
    console.log(`| \`${item.path}\` | ${item.components.join(", ") || "-"} | ${item.floors.join(", ") || "-"} | ${item.variantHints.join(", ") || "-"} | ${item.stateHints.slice(0, 12).join(", ") || "-"} |`);
  }
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`not a directory: ${root}`);
  process.exit(2);
}

const results = walk(root).map(scanFile).filter((item) => {
  return item.components.length || item.floors.length || item.variantHints.length || item.stateHints.length;
}).sort((a, b) => a.path.localeCompare(b.path));

if (asJson) {
  console.log(JSON.stringify({ root, results }, null, 2));
} else {
  printMarkdown(results);
}
