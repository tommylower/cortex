#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const catalogPath = path.join(root, "catalog", "shelves.json");

function loadCatalog() {
  return JSON.parse(fs.readFileSync(catalogPath, "utf8"));
}

function usage() {
  console.error(`Usage:
  skill-catalog.js categories [--sync|--validate|--public]
  skill-catalog.js validate`);
}

function filterShelves(shelves, mode) {
  if (mode === "--sync") return shelves.filter((shelf) => shelf.sync);
  if (mode === "--validate") return shelves.filter((shelf) => shelf.validate);
  if (mode === "--public") return shelves.filter((shelf) => shelf.public);
  if (!mode) return shelves;
  throw new Error(`Unknown categories mode: ${mode}`);
}

function validateCatalog(catalog) {
  const errors = [];
  const seen = new Set();

  if (!Array.isArray(catalog.shelves)) {
    errors.push("catalog.shelves must be an array");
    return errors;
  }

  for (const shelf of catalog.shelves) {
    if (!shelf.path) {
      errors.push("shelf missing path");
      continue;
    }

    if (seen.has(shelf.path)) {
      errors.push(`duplicate shelf path: ${shelf.path}`);
    }
    seen.add(shelf.path);

    const abs = path.join(root, shelf.path);
    const directoryRequired = shelf.public || shelf.validate;
    if (directoryRequired && !fs.existsSync(abs)) {
      errors.push(`missing shelf directory: ${shelf.path}`);
    }

    for (const key of ["public", "sync", "validate"]) {
      if (typeof shelf[key] !== "boolean") {
        errors.push(`${shelf.path} has non-boolean ${key}`);
      }
    }
  }

  return errors;
}

const [command, mode] = process.argv.slice(2);

try {
  const catalog = loadCatalog();

  if (command === "categories") {
    for (const shelf of filterShelves(catalog.shelves, mode)) {
      console.log(shelf.path);
    }
  } else if (command === "validate") {
    const errors = validateCatalog(catalog);
    if (errors.length) {
      for (const error of errors) console.error(`FAIL  ${error}`);
      process.exit(1);
    }
    console.log("OK    catalog/shelves.json");
  } else {
    usage();
    process.exit(2);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
