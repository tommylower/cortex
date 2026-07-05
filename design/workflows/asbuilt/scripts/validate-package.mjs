#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const packageArg = process.argv[2];

if (!packageArg) {
  console.error("usage: validate-package.mjs <package-dir>");
  process.exit(2);
}

const root = path.resolve(packageArg);
const requiredFiles = [
  "README.md",
  "SKILL.md",
  "AGENTS.md",
  "references/tokens.md",
  "references/architecture.md",
  "references/components.md",
  "references/platform-mapping.md"
];

const failures = [];

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) {
    failures.push(`missing ${relativePath}`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
}

function requireMatch(label, text, regex, message) {
  if (!regex.test(text)) failures.push(`${label}: ${message}`);
}

function validateReadme(text) {
  requireMatch("README.md", text, /status:\s*(none|draft|partial|ready|archived)/i, "missing valid status");
  requireMatch("README.md", text, /source of truth:/i, "missing source of truth");
  requireMatch("README.md", text, /unresolved:/i, "missing unresolved list");
  requireMatch("README.md", text, /repo\s*\|/i, "missing provenance table");
  requireMatch("README.md", text, /commit\s*\|/i, "missing source commit");
}

function validateSkill(text) {
  requireMatch("SKILL.md", text, /^---\n[\s\S]*?\n---/m, "missing frontmatter");
  requireMatch("SKILL.md", text, /^name:\s*[a-z0-9-]+/m, "missing skill name");
  requireMatch("SKILL.md", text, /^description:\s*.+/m, "missing description");
  requireMatch("SKILL.md", text, /Component Intake/i, "missing component intake rule");
}

function validateAgents(text) {
  requireMatch("AGENTS.md", text, /Read Order/i, "missing read order");
  requireMatch("AGENTS.md", text, /Source Of Truth|Source of truth/i, "missing source-of-truth rule");
  requireMatch("AGENTS.md", text, /Validation/i, "missing validation instructions");
  requireMatch("AGENTS.md", text, /Do Not/i, "missing negative rules");
}

function validateTokens(text) {
  requireMatch("references/tokens.md", text, /Existing Tokens/i, "missing existing tokens");
  requireMatch("references/tokens.md", text, /Proposed Tokens/i, "missing proposed tokens");
  requireMatch("references/tokens.md", text, /Raw Value Clusters/i, "missing raw value clusters");
  requireMatch("references/tokens.md", text, /Motion Tokens/i, "missing motion tokens");
}

function validateArchitecture(text) {
  requireMatch("references/architecture.md", text, /Strata/i, "missing strata");
  requireMatch("references/architecture.md", text, /Dependency Rule/i, "missing dependency rule");
  requireMatch("references/architecture.md", text, /Mechanical Checks/i, "missing mechanical checks");
  requireMatch("references/architecture.md", text, /Known Violations/i, "missing known violations");
}

function componentSections(text) {
  return text
    .split(/\n##\s+/)
    .slice(1)
    .filter((section) => !/^Component Intake Rule\b/.test(section.trim()));
}

function validateComponents(text) {
  const sections = componentSections(text);
  if (!sections.length) {
    failures.push("references/components.md: missing at least one component card");
    return;
  }

  const fields = ["bucket", "floor", "source", "slots", "axes", "states", "motion", "tokens", "status"];
  sections.forEach((section) => {
    const name = section.split(/\r?\n/, 1)[0].trim();
    for (const field of fields) {
      if (!new RegExp(`^${field}:`, "im").test(section)) {
        failures.push(`references/components.md: ${name} missing ${field}`);
      }
    }
    if (!/(draft|partial|ready)/i.test(section)) {
      failures.push(`references/components.md: ${name} missing valid status`);
    }
  });
}

function validatePlatform(text) {
  requireMatch("references/platform-mapping.md", text, /Framework And Runtime/i, "missing framework/runtime");
  requireMatch("references/platform-mapping.md", text, /Real Paths/i, "missing real paths");
  requireMatch("references/platform-mapping.md", text, /Translation Layer/i, "missing translation layer");
  requireMatch("references/platform-mapping.md", text, /Dependencies/i, "missing dependencies");
  requireMatch("references/platform-mapping.md", text, /Build And Verification Commands/i, "missing commands");
  requireMatch("references/platform-mapping.md", text, /Divergences/i, "missing divergences");
}

function validateOptionalJson(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) return;
  try {
    JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON (${error.message})`);
  }
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`not a directory: ${root}`);
  process.exit(2);
}

for (const file of requiredFiles) read(file);

validateReadme(read("README.md"));
validateSkill(read("SKILL.md"));
validateAgents(read("AGENTS.md"));
validateTokens(read("references/tokens.md"));
validateArchitecture(read("references/architecture.md"));
validateComponents(read("references/components.md"));
validatePlatform(read("references/platform-mapping.md"));
validateOptionalJson("references/tokens.dtcg.json");

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exit(1);
}

console.log(`OK ${root}`);
