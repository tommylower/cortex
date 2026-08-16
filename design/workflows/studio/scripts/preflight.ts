#!/usr/bin/env -S npx tsx
// preflight: the studio prebuild gate (doctrine/enforcement.md). runs before a
// build exists, so it never imports project code. profile-agnostic: with no
// config file it runs the universal checks; a design.config.ts (or a
// workbench-stamped project's workbench.config.ts) declaring skinPrefix, css,
// and engine activates the profile-scoped checks too. read textually, never
// imported. the invariants:
//
//   1. tokens-only        raw hex / raw color fn / one-off px inside a
//                         .{prefix}-* block in any css; raw hex / color literal
//                         anywhere in tsx/css outside app/globals.css; raw px in
//                         tsx style={{...}} objects (same px policy as css).
//   2. dark-completeness  every --color-* role defined in :root has a .dark key
//                         AND an @theme inline re-export. scoped to --color-*
//                         on purpose (per doctrine): non-color custom props
//                         (--sidebar-w, ...) may theme via @media
//                         (prefers-color-scheme) or not theme at all.
//   3. no-utility-on-skin a className that mixes a .{prefix}-* class with a
//                         tailwind/cva utility. covers string literals AND
//                         className={...} expressions: clsx/cn args, ternary
//                         branches, template-literal static parts. (skipped
//                         under css=cva-utilities.)
//   4. cva-boundary       class-variance-authority / *Variants importable only
//                         from components/ui/. static imports, require(), and
//                         dynamic import() are all checked, with ", ' or `
//                         specifiers.
//
// plus one advisory (WARN, never a failure): css modules (*.module.css) and
// styled-jsx blocks bypass the single-skin model, so under css=single-skin
// their presence is flagged for review.
//
// grandfather list: an optional .preflightignore at the project root lists one
// relative path prefix per line (# comments and blank lines ignored). matching
// files are exempt from the per-file checks (tokens-only file scans,
// no-utility-on-skin, cva-boundary) and the summary line reports
// "N grandfathered". globals-wide checks (dark-completeness) are unaffected.
// this instantiates the css-invariants grandfather rule: accepted skins are
// not retokenized by a prebuild gate; the hard bar applies to new code.
//
// zero runtime deps beyond node builtins. run: npx tsx scripts/preflight.ts
//
// px policy (documented, property-aware): 0 is always allowed. 1px and 2px are
// allowed ONLY on width-bearing border/outline properties: the border and
// outline shorthands, the border side/logical longhands (border-top,
// border-inline-start, ...), and *-width longhands. border-radius,
// border-spacing, outline-offset and every other property must use a var()
// token or a relative unit for any nonzero px. the same rule applies to css
// declarations in .{prefix}-* blocks and to tsx style={{...}} entries
// (camelCase names are normalized to kebab before the test). known blind
// spots: unquoted numeric style entries (padding: 40, which React treats as
// px) are not scanned; a class list assigned to a variable first (const cls =
// "brand-x flex"; className={cls}) is never scanned, an inherent limit of
// lexical scanning with no dataflow.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

type Violation = { check: string; file: string; line: number; message: string };

const ROOT = process.cwd();
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "out",
  "coverage",
  "scripts", // dev tooling (including this file) is not product code
]);

// ---- config: read textually, never import (preflight runs pre-build) ---------
// discovery order: design.config.ts (studio-native), then workbench.config.ts
// (a stamped canvas project). no config is not an error: the universal checks
// run with the default prefix, and the profile-scoped checks (no-utility-on-
// skin, engine resolution) stay off until a profile declares them.
function readConfig(): { prefix: string; css: string; engine: string; source: string } {
  let text: string | null = null;
  let source = "none";
  for (const name of ["design.config.ts", "workbench.config.ts"]) {
    try {
      text = readFileSync(join(ROOT, name), "utf8");
      source = name;
      break;
    } catch {
      /* try the next name */
    }
  }
  if (text === null) return { prefix: "brand", css: "universal", engine: "", source };
  const prefix = text.match(/skinPrefix\s*:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? "brand";
  const css = text.match(/\bcss\s*:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? "single-skin";
  const engine = text.match(/\bengine\s*:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? "base-ui";
  return { prefix, css, engine, source };
}

// ---- grandfather list: optional .preflightignore at the project root ---------
// one relative path prefix per line; # comments and blank lines ignored.
function readIgnorePrefixes(): string[] {
  let text: string;
  try {
    text = readFileSync(join(ROOT, ".preflightignore"), "utf8");
  } catch {
    return [];
  }
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.replace(/^\.\//, "").replace(/^\//, ""));
}

// ---- file walk ---------------------------------------------------------------
function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (IGNORE_DIRS.has(name)) continue;
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const lineAt = (text: string, index: number): number =>
  text.slice(0, index).split("\n").length;

const rel = (file: string): string => relative(ROOT, file) || file;

// path helpers ----------------------------------------------------------------
const norm = (file: string): string => rel(file).split(sep).join("/");
const isGlobals = (file: string): boolean => norm(file).endsWith("app/globals.css");
const isUnderUi = (file: string): boolean =>
  /(^|\/)components\/ui\//.test(norm(file));

// ---- shared literal detectors ------------------------------------------------
const HEX = /#[0-9a-fA-F]{3,8}\b/;
// a color function whose args carry a raw number literal (not a bare var()).
const COLOR_FN = /\b(?:oklch|oklab|rgb|rgba|hsl|hsla|lab|lch)\(\s*[^)]*\d/;
// px length; capture the numeric value so the policy can inspect it.
const PX = /(?<![\w.-])(\d+(?:\.\d+)?)px\b/g;

// the px policy in one place. prop is the declaration's property name, css
// kebab-case or style-object camelCase (normalized to kebab here). 1px/2px
// hairlines are legal only where they set a border/outline WIDTH: the border
// and outline shorthands, the border side/logical longhands, and *-width
// longhands. border-radius, border-spacing, outline-offset are not widths.
function pxAllowed(value: number, propRaw: string): boolean {
  if (value === 0) return true;
  if (value !== 1 && value !== 2) return false;
  const prop = propRaw.replace(/([A-Z])/g, "-$1").toLowerCase();
  if (prop === "border" || prop === "outline") return true;
  if (/^border-(top|right|bottom|left|block|inline)(-(start|end))?$/.test(prop)) return true;
  if (/-width$/.test(prop)) return true;
  return false;
}

// index of the "}" matching the "{" at openIndex, honoring nesting.
function matchBrace(text: string, openIndex: number): number {
  let depth = 0;
  for (let i = openIndex; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// ---- lightweight css block parser -------------------------------------------
type Block = { selector: string; bodyStart: number; bodyEnd: number };

function parseBlocks(css: string): Block[] {
  const blocks: Block[] = [];
  // walk with a brace stack and remember the selector text that precedes each
  // "{" (text since the last "{", "}" or ";", comments removed).
  let selStart = 0;
  const openStack: { selector: string; bodyStart: number }[] = [];
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 1;
      continue;
    }
    if (c === "{") {
      const selector = css
        .slice(selStart, i)
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .trim();
      openStack.push({ selector, bodyStart: i + 1 });
      selStart = i + 1;
    } else if (c === "}") {
      const open = openStack.pop();
      if (open) blocks.push({ selector: open.selector, bodyStart: open.bodyStart, bodyEnd: i });
      selStart = i + 1;
    } else if (c === ";") {
      selStart = i + 1;
    }
  }
  return blocks;
}

// the raw declaration text of a block, excluding text owned by nested blocks.
function ownText(css: string, block: Block, all: Block[]): { text: string; offset: number } {
  // blank out any nested block bodies so we only scan this block's own decls.
  let out = css.slice(block.bodyStart, block.bodyEnd);
  for (const b of all) {
    if (b === block) continue;
    if (b.bodyStart > block.bodyStart && b.bodyEnd <= block.bodyEnd) {
      const s = b.bodyStart - block.bodyStart;
      const e = b.bodyEnd - block.bodyStart;
      out = out.slice(0, s) + out.slice(s, e).replace(/[^\n]/g, " ") + out.slice(e);
    }
  }
  return { text: out, offset: block.bodyStart };
}

// ---- check 1: tokens-only ----------------------------------------------------
function checkTokensOnly(files: string[], prefix: string, v: Violation[]) {
  const brandSel = new RegExp(`\\.${prefix}(?![\\w-])|\\.${prefix}-`);
  for (const file of files) {
    const isCss = file.endsWith(".css");
    const isTsx = /\.(tsx|jsx)$/.test(file);
    if (!isCss && !isTsx) continue;
    const text = readFileSync(file, "utf8");

    // part (a): px + hex + color-fn inside .{prefix}-* blocks of any css file.
    if (isCss) {
      const blocks = parseBlocks(text);
      for (const block of blocks) {
        if (!brandSel.test(block.selector)) continue;
        const { text: body, offset } = ownText(text, block, blocks);
        // hex
        for (const m of body.matchAll(new RegExp(HEX, "g"))) {
          v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, offset + m.index!), message: `raw hex "${m[0]}" in .${prefix}-* block; use a var() token` });
        }
        // color fn
        for (const m of body.matchAll(new RegExp(COLOR_FN, "g"))) {
          v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, offset + m.index!), message: `raw color function "${m[0].trim()}...)" in .${prefix}-* block; use a var() token` });
        }
        // px, property-aware: parse declarations so the border/outline hairline
        // allowance applies per property, never per block.
        const declRe = /([\w-]+)\s*:\s*([^;]*)/g;
        for (const d of body.matchAll(declRe)) {
          const prop = d[1].toLowerCase();
          const valOffset = d.index! + d[0].length - d[2].length;
          for (const m of d[2].matchAll(PX)) {
            const val = parseFloat(m[1]);
            if (pxAllowed(val, prop)) continue;
            v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, offset + valOffset + m.index!), message: `one-off length "${m[0]}" on "${prop}" in .${prefix}-* block; only 0 anywhere, and 1px/2px on width-bearing border/outline props, may stay raw. use a var() token or a relative unit` });
          }
        }
      }
    }

    // part (b): raw px inside tsx style={{...}} objects, same policy as css.
    if (isTsx) {
      const styleRe = /style\s*=\s*\{/g;
      for (const s of text.matchAll(styleRe)) {
        const open = s.index! + s[0].length - 1;
        const close = matchBrace(text, open);
        if (close === -1) continue;
        const body = text.slice(open + 1, close);
        const entryRe = /([\w$]+)\s*:\s*("[^"]*"|'[^']*'|`[^`]*`)/g;
        for (const d of body.matchAll(entryRe)) {
          // pass the raw camelCase name; pxAllowed normalizes to kebab itself.
          const prop = d[1];
          // template literals: only static parts are literal values.
          const value = d[2].replace(/\$\{[^}]*\}/g, " ");
          const valOffset = d.index! + d[0].length - d[2].length;
          for (const m of value.matchAll(PX)) {
            const val = parseFloat(m[1]);
            if (pxAllowed(val, prop)) continue;
            v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, open + 1 + valOffset), message: `one-off length "${m[0]}" on "${d[1]}" in a style={{...}} object; only 0 anywhere, and 1px/2px on width-bearing border/outline props, may stay raw. use a var() token or a relative unit` });
          }
        }
      }
    }

    // part (c): raw hex / color literal anywhere in tsx/css OUTSIDE globals.css.
    if (isGlobals(file)) continue;
    for (const m of text.matchAll(new RegExp(HEX, "g"))) {
      v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, m.index!), message: `raw hex "${m[0]}" outside app/globals.css; raw values live only in @theme/:root/.dark` });
    }
    for (const m of text.matchAll(new RegExp(COLOR_FN, "g"))) {
      v.push({ check: "tokens-only", file: rel(file), line: lineAt(text, m.index!), message: `raw color function "${m[0].trim()}...)" outside app/globals.css; raw values live only in @theme/:root/.dark` });
    }
  }
}

// ---- check 2: dark role completeness ----------------------------------------
function checkDarkCompleteness(prefix: string, v: Violation[]) {
  const file = join(ROOT, "app", "globals.css");
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return; // no globals.css: no token file to audit; other checks report.
  }
  const blocks = parseBlocks(text);
  const bodyFor = (pred: (s: string) => boolean): { body: string; line: number } | null => {
    const b = blocks.find((x) => pred(x.selector));
    if (!b) return null;
    return { body: text.slice(b.bodyStart, b.bodyEnd), line: lineAt(text, b.bodyStart) };
  };
  const propsIn = (body: string): Set<string> => {
    const set = new Set<string>();
    for (const m of body.matchAll(/(--[\w-]+)\s*:/g)) set.add(m[1]);
    return set;
  };

  const root = bodyFor((s) => s === ":root");
  const dark = bodyFor((s) => s === ".dark");
  const light = bodyFor((s) => s === ".light");
  const themeInline = bodyFor((s) => /@theme\s+inline/.test(s));

  if (!root) {
    v.push({ check: "dark-completeness", file: rel(file), line: 1, message: "no :root block in app/globals.css" });
    return;
  }
  const rootProps = propsIn(root.body);
  const darkProps = dark ? propsIn(dark.body) : new Set<string>();
  const lightProps = light ? propsIn(light.body) : null; // null: no .light block, parity not required
  const inlineProps = themeInline ? propsIn(themeInline.body) : new Set<string>();
  const rootLine = (name: string): number => {
    const idx = root.body.indexOf(name);
    return idx === -1 ? root.line : lineAt(text, blocks.find((x) => x.selector === ":root")!.bodyStart + idx);
  };

  for (const role of rootProps) {
    // scoped to --color-* roles (per doctrine): non-color custom props may
    // theme via @media (prefers-color-scheme) or not theme at all.
    if (!role.startsWith("--color-")) continue;
    // every --color-* role needs a .dark key.
    if (!darkProps.has(role)) {
      v.push({ check: "dark-completeness", file: rel(file), line: rootLine(role), message: `role "${role}" defined in :root has no .dark key; dark mode degrades silently` });
    }
    // every --color-* role generates a utility, so it needs an @theme inline re-export.
    if (!inlineProps.has(role)) {
      v.push({ check: "dark-completeness", file: rel(file), line: rootLine(role), message: `role "${role}" generates a utility but is not re-exported in @theme inline` });
    }
    // when a .light pin block exists (the canvas review cells depend on it),
    // it needs parity too, or the role's light cell collapses under a global
    // dark toggle: the exact silent degradation this check exists to stop.
    if (lightProps !== null && !lightProps.has(role)) {
      v.push({ check: "dark-completeness", file: rel(file), line: rootLine(role), message: `role "${role}" defined in :root has no .light key; its light review cell collapses under a global dark toggle` });
    }
  }
}

// ---- registry sanity: duplicate section ids -----------------------------------
// two sections with one id make the second silently unreachable on the canvas
// (find() returns the first) and duplicate static params. the scan is scoped
// to the sections array literal and counts only ids at section-object depth,
// so data objects inside a render, nested arrays, and comments cannot false-
// positive. strings and comments are walked, never regexed blind.
function checkRegistryIds(v: Violation[]) {
  const file = join(ROOT, "src", "design", "sections.tsx");
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return; // no canvas registry in this project: nothing to check.
  }
  const arr = text.match(/\bsections\s*(?::[^=]*)?=\s*\[/);
  if (!arr || arr.index === undefined) return;
  const start = arr.index + arr[0].length;

  const seen = new Map<string, number>();
  let depthBrace = 0; // {} depth inside the array; a section object is depth 1
  let depthBracket = 1; // [] depth; starts inside the sections array
  let i = start;
  while (i < text.length && depthBracket > 0) {
    const ch = text[i];
    const two = text.slice(i, i + 2);
    if (two === "//") {
      const nl = text.indexOf("\n", i);
      i = nl === -1 ? text.length : nl + 1;
      continue;
    }
    if (two === "/*") {
      const end = text.indexOf("*/", i + 2);
      i = end === -1 ? text.length : end + 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      // at section-object depth, capture an id: "..." field; otherwise skip the string
      const before = text.slice(Math.max(start, i - 24), i);
      const isIdField = depthBrace === 1 && depthBracket === 1 && /\bid\s*:\s*$/.test(before);
      let j = i + 1;
      while (j < text.length && text[j] !== ch) {
        if (text[j] === "\\") j++;
        j++;
      }
      if (isIdField) {
        const id = text.slice(i + 1, j);
        const line = lineAt(text, i);
        if (seen.has(id)) {
          v.push({ check: "registry-ids", file: rel(file), line, message: `duplicate section id "${id}" (first at line ${seen.get(id)}); the second registration is unreachable on the canvas` });
        } else {
          seen.set(id, line);
        }
      }
      i = j + 1;
      continue;
    }
    if (ch === "{") depthBrace++;
    else if (ch === "}") depthBrace--;
    else if (ch === "[") depthBracket++;
    else if (ch === "]") depthBracket--;
    i++;
  }
}

// ---- check 3: no utility on skin --------------------------------------------
const UTIL_WORDS = new Set([
  "flex", "grid", "block", "inline", "inline-block", "inline-flex", "inline-grid",
  "hidden", "contents", "flow-root", "table", "table-cell", "table-row", "container",
  "absolute", "relative", "fixed", "sticky", "static",
  "grow", "shrink", "truncate", "isolate",
  "antialiased", "subpixel-antialiased", "italic", "not-italic",
  "underline", "overline", "line-through", "no-underline",
  "uppercase", "lowercase", "capitalize", "normal-case",
  "border", "rounded", "shadow", "ring", "outline",
]);
const UTIL_PREFIXES = [
  "p", "px", "py", "pt", "pb", "pl", "pr", "ps", "pe",
  "m", "mx", "my", "mt", "mb", "ml", "mr", "ms", "me",
  "w", "h", "min", "max", "size", "basis",
  "gap", "space",
  "text", "bg", "from", "via", "to", "fill", "stroke",
  "border", "rounded", "shadow", "ring", "outline", "divide",
  "font", "leading", "tracking",
  "items", "justify", "content", "self", "place", "order", "col", "row",
  "top", "bottom", "left", "right", "inset", "z",
  "opacity", "transition", "duration", "delay", "ease", "animate",
  "scale", "rotate", "translate", "skew", "origin",
  "overflow", "object", "cursor", "select", "aspect", "columns", "flex", "grid",
];

function isUtility(raw: string): boolean {
  let token = raw.trim();
  if (!token) return false;
  token = token.replace(/^!/, "");
  // arbitrary-value syntax: p-[3px], bg-[#fff], grid-cols-[...] etc.
  if (/\[.+\]/.test(token)) return true;
  // variant prefixes (hover:, md:, dark:, group-hover:) -> test the base.
  const base = token.includes(":") ? token.slice(token.lastIndexOf(":") + 1) : token;
  if (!base) return false;
  // project apis that are NOT utilities.
  if (base.startsWith("type-")) return false;
  const bare = base.replace(/^-/, ""); // negative utilities: -mt-2
  if (UTIL_WORDS.has(bare)) return true;
  for (const p of UTIL_PREFIXES) {
    if (bare === p || bare.startsWith(p + "-")) return true;
  }
  return false;
}

// every string-literal fragment inside one className value. for a plain string
// attribute that is the string itself; for a braced expression (clsx/cn calls,
// ternaries, template literals) it is every quoted substring inside, with
// template ${...} holes blanked so only static parts count.
function classNameFragments(text: string, valueStart: number): string[] | null {
  const c = text[valueStart];
  if (c === '"' || c === "'") {
    const close = text.indexOf(c, valueStart + 1);
    if (close === -1) return null;
    return [text.slice(valueStart + 1, close)];
  }
  if (c === "{") {
    const close = matchBrace(text, valueStart);
    if (close === -1) return null;
    const expr = text.slice(valueStart + 1, close);
    const fragments: string[] = [];
    for (const m of expr.matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`/g)) {
      const raw = m[1] ?? m[2] ?? m[3] ?? "";
      fragments.push(raw.replace(/\$\{[^}]*\}/g, " "));
    }
    return fragments;
  }
  return null;
}

function checkNoUtilityOnSkin(files: string[], prefix: string, v: Violation[]) {
  const brandTok = new RegExp(`^${prefix}(-|$)`);
  const attrRe = /className\s*=\s*/g;
  for (const file of files) {
    if (!/\.(tsx|jsx)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const a of text.matchAll(attrRe)) {
      const fragments = classNameFragments(text, a.index! + a[0].length);
      if (!fragments) continue;
      // all fragments of one className merge into a single class list (that is
      // exactly what clsx/cn do), so brand + utility across args still fails.
      const tokens = fragments.flatMap((f) => f.split(/\s+/)).filter(Boolean);
      const hasBrand = tokens.some((t) => brandTok.test(t));
      if (!hasBrand) continue;
      const utils = tokens.filter((t) => isUtility(t));
      if (utils.length === 0) continue;
      v.push({ check: "no-utility-on-skin", file: rel(file), line: lineAt(text, a.index!), message: `className mixes .${prefix}-* skin with utility class(es) [${utils.join(", ")}]; one skin class owns visuals, no utilities` });
    }
  }
}

// ---- check 4: cva import boundary -------------------------------------------
function checkCvaBoundary(files: string[], v: Violation[]) {
  const importRe = /import\s+(?:type\s+)?(?:([\w*]+)\s*,?\s*)?(?:\{([^}]*)\})?\s*(?:from\s+)?["']([^"']+)["']/g;
  // require("class-variance-authority") and dynamic import("...") launder the
  // same dependency past the static-import scan; flag them identically. the
  // specifier may be quoted with ", ' or ` (a static template literal).
  const callRe = /\b(require|import)\s*\(\s*["'`]class-variance-authority["'`]\s*\)/g;
  for (const file of files) {
    if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file)) continue;
    if (isUnderUi(file)) continue; // allowed home for cva
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(importRe)) {
      const [full, def, named, spec] = m;
      const names: string[] = [];
      if (def && def !== "*") names.push(def.trim());
      if (named) for (const n of named.split(",")) {
        const clean = n.split(/\s+as\s+/)[0].trim();
        if (clean) names.push(clean);
      }
      const fromCva = spec === "class-variance-authority";
      const variantSym = names.find((n) => n === "cva" || /Variants$/.test(n));
      if (fromCva) {
        v.push({ check: "cva-boundary", file: rel(file), line: lineAt(text, m.index!), message: `imports class-variance-authority outside components/ui/; cva stays in the primitive stratum` });
      } else if (variantSym) {
        v.push({ check: "cva-boundary", file: rel(file), line: lineAt(text, m.index!), message: `imports variant helper "${variantSym}" outside components/ui/; cva output stays in the primitive stratum` });
      }
      void full;
    }
    for (const m of text.matchAll(callRe)) {
      v.push({ check: "cva-boundary", file: rel(file), line: lineAt(text, m.index!), message: `${m[1]}("class-variance-authority") outside components/ui/; cva stays in the primitive stratum` });
    }
  }
}

// ---- check 5: engine resolution (symmetric, both profiles) --------------------
// the engine profile asserts which behavior floor the primitives use, and the
// check enforces it in both directions: engine "base-ui" bans @radix-ui/*
// imports, engine "radix" bans @base-ui/* imports. a wrong-engine pull fails
// no matter which way the supplier's default drifts (current shadcn defaults
// to base-ui; older registries and templates still resolve to radix).
// known blind spots, same lexical-scan class as the className limits above:
// a bare side-effect import (no from, no binding, cannot smuggle a working
// primitive) and a wrapper package that re-exports the banned engine (a
// specifier scan cannot follow into node_modules).
function checkEngineResolution(files: string[], engine: string, v: Violation[]) {
  const banned = engine === "base-ui" ? "@radix-ui/" : engine === "radix" ? "@base-ui/" : null;
  if (!banned) return;
  const wanted = engine === "base-ui" ? "@base-ui/react" : "@radix-ui/*";
  const bannedRe = new RegExp(
    `\\b(?:from\\s*|require\\s*\\(\\s*|import\\s*\\(\\s*)["'\`](${banned.replace(/[/@]/g, "\\$&")}[^"'\`]*)["'\`]`,
    "g",
  );
  for (const file of files) {
    if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(bannedRe)) {
      v.push({ check: "engine-resolution", file: rel(file), line: lineAt(text, m.index!), message: `imports ${m[1]} while engine="${engine}"; reject the wrong-engine pull and rebuild the primitive on ${wanted} (or switch the profile engine deliberately)` });
    }
  }
}

// ---- check: engine import boundary --------------------------------------------
// headless engines live in the primitive stratum only. any @base-ui/* or
// @radix-ui/* import outside components/ui/ is a stratum leak: it is how a
// forked copy of a primitive lands in product code (review-pipeline stage 8
// says never fork; this makes it mechanical). the engine-resolution check
// bans the WRONG engine everywhere; this one bans ANY engine outside ui.
function checkEngineBoundary(files: string[], v: Violation[]) {
  const engineRe = /\b(?:from\s*|require\s*\(\s*|import\s*\(\s*)["'`]((?:@base-ui|@radix-ui)\/[^"'`]*)["'`]/g;
  for (const file of files) {
    if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file)) continue;
    if (isUnderUi(file)) continue; // the engines' one legal home
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(engineRe)) {
      v.push({ check: "engine-boundary", file: rel(file), line: lineAt(text, m.index!), message: `imports ${m[1]} outside components/ui/; engines live in the primitive stratum. import the existing primitive, never fork it` });
    }
  }
}

// ---- advisory: single-skin escape hatches (WARN, never a failure) -------------
function warnSkinEscapes(files: string[], css: string, prefix: string): string[] {
  if (css !== "single-skin") return [];
  const warns: string[] = [];
  for (const file of files) {
    if (file.endsWith(".module.css")) {
      warns.push(`WARN  ${rel(file)}  css module bypasses the single-skin model; fold its rules into .${prefix}-* classes in app/globals.css`);
    }
    if (/\.(tsx|jsx)$/.test(file)) {
      const text = readFileSync(file, "utf8");
      const m = text.match(/<style\s+jsx\b/);
      if (m) {
        warns.push(`WARN  ${rel(file)}:${lineAt(text, m.index!)}  styled-jsx block bypasses the single-skin model; fold it into .${prefix}-* classes in app/globals.css`);
      }
    }
  }
  return warns;
}

// ---- advisory: grandfather scope (WARN, never a failure) ----------------------
// grandfathering exists for pre-existing product code on the existing-project
// path. a prefix that covers the seed's canonical paths (app/globals.css,
// components/ui, or the whole app/ / components/ / src/ tree) is a smell, not
// accepted skin (css-invariants grandfathering).
function warnGrandfatherScope(prefixes: string[]): string[] {
  const warns: string[] = [];
  for (const p of prefixes) {
    const bare = p.replace(/\/+$/, "");
    const coversGlobals = "app/globals.css".startsWith(bare);
    const coversUi = "components/ui".startsWith(bare) || bare.startsWith("components/ui");
    const blanket = bare === "" || bare === "." || bare === "app" || bare === "components" || bare === "src";
    if (coversGlobals || coversUi || blanket) {
      warns.push(`WARN  .preflightignore prefix "${p}" covers seed-canonical paths; grandfathering is for pre-existing product code, never the seed strata`);
    }
  }
  return warns;
}

// ---- run ---------------------------------------------------------------------
function main() {
  const { prefix, css, engine, source } = readConfig();
  const allFiles = walk(ROOT);
  // per-file checks skip grandfathered files; globals-wide checks are unaffected.
  const ignorePrefixes = readIgnorePrefixes();
  const isGrandfathered = (f: string): boolean =>
    ignorePrefixes.some((p) => norm(f).startsWith(p));
  const grandfathered = allFiles.filter(isGrandfathered);
  const files = allFiles.filter((f) => !isGrandfathered(f));
  const v: Violation[] = [];

  const checks: { id: string; label: string; run: () => void }[] = [
    { id: "tokens-only", label: "tokens only", run: () => checkTokensOnly(files, prefix, v) },
    { id: "dark-completeness", label: ".dark role completeness", run: () => checkDarkCompleteness(prefix, v) },
    { id: "cva-boundary", label: "cva import boundary", run: () => checkCvaBoundary(files, v) },
  ];
  if (engine) checks.push({ id: "engine-resolution", label: `engine resolution (${engine})`, run: () => checkEngineResolution(files, engine, v) });
  checks.push({ id: "engine-boundary", label: "engine import boundary", run: () => checkEngineBoundary(files, v) });
  checks.push({ id: "registry-ids", label: "registry ids unique", run: () => checkRegistryIds(v) });
  if (css === "single-skin") {
    checks.splice(2, 0, { id: "no-utility-on-skin", label: "no utility on skin", run: () => checkNoUtilityOnSkin(files, prefix, v) });
  }

  for (const c of checks) c.run();
  const warns = [...warnGrandfatherScope(ignorePrefixes), ...warnSkinEscapes(files, css, prefix)];

  const gf = grandfathered.length ? ` · ${grandfathered.length} grandfathered` : "";
  const profile = source === "none" ? `profile=universal (no config)` : `skin=".${prefix}-*" · css="${css}" · engine="${engine}" (${source})`;
  console.log(`preflight · ${profile} · ${files.length} files scanned${gf}\n`);

  if (v.length === 0) {
    for (const c of checks) console.log(`  PASS  ${c.label}`);
    for (const w of warns) console.log(`  ${w}`);
    console.log(`\npreflight: clean. all ${checks.length} checks passed.${warns.length ? ` ${warns.length} warning(s), not failures.` : ""}`);
    process.exit(0);
  }

  const byCheck = new Map<string, Violation[]>();
  for (const item of v) {
    if (!byCheck.has(item.check)) byCheck.set(item.check, []);
    byCheck.get(item.check)!.push(item);
  }
  for (const c of checks) {
    const hits = byCheck.get(c.id) ?? [];
    if (hits.length === 0) {
      console.log(`  PASS  ${c.label}`);
    } else {
      console.log(`  FAIL  ${c.label}  (${hits.length})`);
      for (const h of hits) console.log(`        [${h.check}] ${h.file}:${h.line}  ${h.message}`);
    }
  }
  for (const w of warns) console.log(`  ${w}`);
  console.log(`\npreflight: ${v.length} violation(s). fix before build.`);
  process.exit(1);
}

main();
