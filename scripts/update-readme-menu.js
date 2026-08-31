#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const readmePath = path.join(root, "README.md");
const catalogPath = path.join(root, "catalog", "shelves.json");
const startMarker = "<!-- skill-menu:start -->";
const endMarker = "<!-- skill-menu:end -->";
const checkOnly = process.argv.includes("--check");

if (process.argv.slice(2).some((arg) => arg !== "--check")) {
  console.error("usage: update-readme-menu.js [--check]");
  process.exit(2);
}

function frontmatterValue(file, key) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${path.relative(root, file)} has no frontmatter`);

  const lines = match[1].split(/\r?\n/);
  const index = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (index < 0) throw new Error(`${path.relative(root, file)} has no ${key}`);

  let value = lines[index].slice(lines[index].indexOf(":") + 1).trim();
  if (/^[>|][-+]?\d*$/.test(value)) {
    const continuation = [];
    for (let lineIndex = index + 1; lineIndex < lines.length; lineIndex += 1) {
      if (!lines[lineIndex].trim()) {
        continuation.push("");
        continue;
      }
      if (!/^\s/.test(lines[lineIndex])) break;
      continuation.push(lines[lineIndex].trim());
    }
    value = continuation.join(" ");
  }
  return value.replace(/^(["'])(.*)\1$/, "$2");
}

function conciseDescription(description) {
  const compact = description.replace(/\s+/g, " ").trim();
  const boundaries = [
    ". Use when",
    ". Use this",
    ". When the user",
    ". Triggers:",
  ];
  const indexes = boundaries
    .map((boundary) => compact.indexOf(boundary))
    .filter((index) => index >= 0);

  const summary = indexes.length
    ? compact.slice(0, Math.min(...indexes) + 1)
    : compact;
  if (summary.length <= 180) return summary;

  const shortened = summary.slice(0, 180);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}…`;
}

function skillsForShelf(shelf) {
  const shelfPath = path.join(root, shelf.path);
  return fs
    .readdirSync(shelfPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillPath = path.join(shelfPath, entry.name, "SKILL.md");
      if (!fs.existsSync(skillPath)) return null;
      return {
        name: frontmatterValue(skillPath, "name"),
        description: conciseDescription(
          frontmatterValue(skillPath, "description"),
        ),
        link: path.relative(root, skillPath).split(path.sep).join("/"),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderMenu() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const shelves = catalog.shelves.filter(
    (shelf) => shelf.public && shelf.path !== "marketing/skills",
  );
  const lines = [
    "_Generated from public skill frontmatter. Run `node scripts/update-readme-menu.js` to refresh it._",
  ];
  let currentGroup = "";

  for (const shelf of shelves) {
    const group = shelf.path.split("/")[0];
    if (group !== currentGroup) {
      const title = group === "agent-workflows" ? "agent workflows" : group;
      lines.push("", `### ${title}`);
      currentGroup = group;
    }

    if (group === "design") {
      lines.push("", `#### ${shelf.label.replace(/^Design /, "").toLowerCase()}`);
    }

    for (const skill of skillsForShelf(shelf)) {
      lines.push(`- [\`${skill.name}\`](${skill.link}) — ${skill.description}`);
    }
  }

  return lines.join("\n");
}

const readme = fs.readFileSync(readmePath, "utf8");
const start = readme.indexOf(startMarker);
const end = readme.indexOf(endMarker);

if (start < 0 || end < 0 || end <= start) {
  console.error("README.md is missing valid skill-menu markers");
  process.exit(1);
}

const generated = renderMenu();
const next = `${readme.slice(0, start + startMarker.length)}\n${generated}\n${readme.slice(end)}`;

if (next === readme) {
  console.log("OK    README skill menu");
  process.exit(0);
}

if (checkOnly) {
  console.error(
    "FAIL  README skill menu is stale; run node scripts/update-readme-menu.js",
  );
  process.exit(1);
}

fs.writeFileSync(readmePath, next);
console.log("updated README skill menu");
