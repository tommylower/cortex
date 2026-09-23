#!/usr/bin/env node
// check-studio: keeps the studio skill self-contained and grounded.
// run by scripts/validate-skills.sh, scripts/publish.sh, and scripts/hooks/pre-push.
// scripts/test-check-studio.sh plants every defect class below and proves it fails,
// and proves ordinary edits still pass.
//
// it guards against the known ways studio went wrong. it is not a proof: text written
// outside these exact rules can still point somewhere else, so review still matters.
//
// what it checks, exactly:
//   tracked    git answers; no studio file is ignored by git or a symlink; no .gitignore file
//              anywhere in cortex names a studio path
//   reachable  every studio file, of any type, is named in SKILL.md (except SKILL.md,
//              README.md, AGENTS.md), so no unlisted file can sit in studio
//   private    no sentence in a studio doc (.md or .mdx, any case) both calls something
//              gitignored, git-ignored, ignored by git, untracked, not tracked, not in git,
//              per-install, local-only, private to this machine, or a private file, copy,
//              note, row, or folder, and names studio, rules.md, rows, invariants, the law,
//              this file, or these files, unless never, not, no, none, or nothing comes within
//              the four words before the private word in the same clause
//   paths      in studio docs (backticks and the commands inside them, links incl. <...> and
//              titles, html src/href, prose):
//              - a path starting with a studio folder (doctrine/, practices/, any case) or ./
//                must exist in studio; so must a scripts/ path naming preflight (studio's
//                script). other scripts/ paths are the project's
//              - a bare lowercase .md name (not .mdx) must exist in studio, except
//                implementation-notes.md. name any other markdown file with its folder
//                (docs/pricing.md) or in uppercase (README.md, CLAUDE.md)
//              - a relative path with a local/ segment, or any path through cortex/local/
//                (cortex's private folder), fails; system paths like /usr/local/ are allowed
//              - any path with a .. segment fails
//              - an absolute or home path (/, ~, $HOME), including inside a backticked
//                command, fails if it is a markdown file or runs through a studio or cortex
//                folder; a relative link out of studio or a file:// url fails
//              other paths (docs/architecture.md, .next/, ~/.cache/puppeteer) are project or
//              tool locations and are allowed
//   refs       every reference written (`file.md`, topic) names a row or heading in that
//              file, even when it wraps across lines; a heading's grade suffix is ignored
//   values     load-bearing rows keep a value, whatever it is: motion numbers (three
//              durations in ms, the words enter and exit, and two easings not counting
//              --ease-* token names), per-project choices (design.config.ts), and the exit
//              ease row if present (an easing); behavior engine must exist
//   retired    the removed system stays out of studio, as a file name or in any text file:
//              house.* and friction.* files (any extension but images), house.template,
//              studio-law.md, an arc/ folder or arc/ path, friction logs, the learning
//              journal, the arc notebook, study queues, the `workbench` and `groundwork`
//              skills, waveframe, nightcap
//   outside    no file in another skill folder (tracked or untracked, any text file, or a
//              symlink) reaches into studio by relative path, repo path, ~/.claude path, or a
//              skills-relative studio/<file> path, in any letter case; a doc naming a studio file ("studio's `x`", "`x` in the
//              studio skill") or a studio repo path names a real one; no cortex doc names a
//              retired studio file
//   rules      rules.md has invariants 1-10 in order, and defaults and experiments sections
//   rows       every table in rules.md and practices/ has a graded header (topic | rule |
//              evidence [| recheck when]) and every row fills every cell
//   inventory  every skill inventory.md lists exists, and every design skill is listed
//   asbuilt    asbuilt's rule-grades.md exists and its invariants, wrapped lines included,
//              match studio's word for word
//   clients    no studio file name or text carries a client alias (project-x, proj-x,
//              project_x, Project X, projectX, with or without a trailing digit; not
//              Project I), or a name from local/client-names.txt (private; publish.sh and the
//              pre-push hook require it). matching strips accents and splits camelCase. a
//              name matches as a whole word, as the exact join of two or three words within a
//              line, or, for names of 6+ letters, as a word prefix (acmecorpbooth). a name of
//              two or more words also matches word by word across line breaks. names under 6
//              letters
//              match whole words only (kiwi, not kiwifruit)
//
// `node scripts/check-studio.mjs --scan-names` reads text on stdin and applies the clients
// matcher to it; the pre-push hook uses it on the lines and messages being pushed.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(process.env.CHECK_STUDIO_ROOT || path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const listRoot = path.resolve(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const studio = path.join(root, "design/workflows/studio");
const rel = (p) => path.relative(root, p);
const read = (f) => fs.readFileSync(f, "utf8");
let failures = 0;
const fail = (check, msg) => {
  failures += 1;
  console.log(`FAIL  studio ${check}: ${msg}`);
};
function run(check, fn) {
  const before = failures;
  fn();
  if (failures === before) console.log(`OK    studio ${check}`);
}
const git = (args, input) =>
  execFileSync("git", ["-C", root, ...args], { input, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });

// ---------------------------------------------------------------- client matcher
const clientList = [path.join(root, "local/client-names.txt"), path.join(listRoot, "local/client-names.txt")].find((p) =>
  fs.existsSync(p),
);
const words = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
const clientNames = clientList
  ? read(clientList)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((n) => ({ raw: n, key: words(n).join("") }))
      .filter((n) => n.key)
  : null;
function namesIn(text) {
  const found = [];
  const lines = text.split("\n").map(words);
  const flat = lines.flat();
  for (const n of clientNames || []) {
    const parts = words(n.raw);
    if (parts.length >= 2) {
      let hit = false;
      for (let i = 0; i + parts.length <= flat.length && !hit; i++) hit = parts.every((w, k) => flat[i + k] === w);
      if (hit) {
        found.push(n.raw);
        continue;
      }
    }
    lineLoop: for (const ws of lines) for (let i = 0; i < ws.length; i++) {
      if (
        ws[i] === n.key ||
        (n.key.length >= 6 && ws[i].startsWith(n.key)) ||
        (ws[i + 1] !== undefined && ws[i] + ws[i + 1] === n.key) ||
        (ws[i + 2] !== undefined && ws[i] + ws[i + 1] + ws[i + 2] === n.key)
      ) {
        found.push(n.raw);
        break lineLoop;
      }
    }
  }
  return found;
}
const alias = /\b[Pp][Rr][Oo][Jj](?:[Ee][Cc][Tt])?[-_][A-Za-z]\d*\b|\b[Pp]roject[A-Z]\d*\b|\b[Pp]roject (?!I\b)[A-Z]\d*\b|\bPROJECT (?!I\b)[A-Z]\d*\b/;

if (process.argv.includes("--scan-names")) {
  if (!clientNames || !clientNames.length) {
    console.error("check-studio --scan-names: local/client-names.txt is missing or empty");
    process.exit(1);
  }
  const text = fs.readFileSync(0, "utf8");
  const found = namesIn(text);
  if (found.length) {
    console.error(`client names in the scanned text: ${[...new Set(found)].join(", ")}`);
    process.exit(1);
  }
  process.exit(0);
}

// ---------------------------------------------------------------- files
const studioLinks = [];
function walk(dir, out = [], links = null) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store" || entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      if (links) links.push(full);
      continue;
    }
    if (entry.isDirectory()) walk(full, out, links);
    else out.push(full);
  }
  return out;
}
const isText = (f) => fs.existsSync(f) && !fs.readFileSync(f).subarray(0, 4096).includes(0);

const studioFiles = walk(studio, [], studioLinks);
const studioDocs = studioFiles.filter((f) => /\.mdx?$/i.test(f));
const studioNames = new Set(studioFiles.map((f) => path.basename(f).toLowerCase()));
const studioDirs = new Set(["doctrine", "practices", "scripts"]);
const squashSpace = (s) => s.replace(/\s+/g, " ");

// markdown helpers ------------------------------------------------------------
function section(text, heading) {
  const re = new RegExp(`^##\\s+${heading}\\b[^\\n]*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "mi");
  const m = text.match(re);
  return m ? m[1] : null;
}
function rowsByTopic(file) {
  const map = new Map();
  for (const line of read(file).split("\n")) {
    const h = line.match(/^#{1,4}\s+(.+?)\s*$/);
    if (h) map.set(h[1].replace(/\s+—\s+.*$/, "").toLowerCase(), line);
    if (line.startsWith("|") && !line.startsWith("|---")) {
      const first = line.split("|")[1]?.trim().toLowerCase();
      if (first) map.set(first, line);
    }
  }
  return map;
}
function numbered(block) {
  const items = [];
  for (const line of block.split("\n")) {
    const m = line.match(/^(\d+)\.\s+(.+)$/);
    if (m) items.push({ n: Number(m[1]), text: m[2] });
    else if (items.length && /^\s+\S/.test(line)) items[items.length - 1].text += " " + line.trim();
    else if (items.length && !line.trim()) items.push(null);
  }
  return items.filter(Boolean);
}

// ---------------------------------------------------------------- tracked
run("tracked", () => {
  try {
    git(["rev-parse", "--is-inside-work-tree"]);
  } catch (err) {
    fail("tracked", `git did not answer: ${String(err.stderr || err.message).trim()}`);
    return;
  }
  try {
    git(["check-ignore", "--stdin"], [...studioFiles, ...studioLinks].map(rel).join("\n"))
      .split("\n")
      .filter(Boolean)
      .forEach((f) => fail("tracked", `${f} is ignored by git`));
  } catch (err) {
    if (err.status !== 1) fail("tracked", `git check-ignore failed: ${String(err.stderr || err.message).trim()}`);
  }
  for (const link of studioLinks) fail("tracked", `${rel(link)} is a symlink; studio holds real files only`);
  let ignores = [];
  try {
    ignores = git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).split("\0").filter((f) => /(^|\/)\.gitignore$/.test(f));
  } catch {}
  if (!ignores.includes(".gitignore") && fs.existsSync(path.join(root, ".gitignore"))) ignores.push(".gitignore");
  for (const gi of ignores) {
    const full = path.join(root, gi);
    if (!fs.existsSync(full)) continue;
    read(full).split("\n").forEach((line, i) => {
      if (!line.trim().startsWith("#") && /(^|\/)(design\/)?(workflows\/)?studio(\/|$)/i.test(line.trim()))
        fail("tracked", `${gi}:${i + 1} ignores a studio path: ${line.trim()}`);
    });
  }
});

// ---------------------------------------------------------------- reachable
run("reachable", () => {
  const skill = read(path.join(studio, "SKILL.md"));
  for (const f of [...studioFiles, ...studioLinks]) {
    const r = path.relative(studio, f).split(path.sep).join("/");
    if (["SKILL.md", "README.md", "AGENTS.md"].includes(r)) continue;
    if (!skill.includes(`\`${r}\``)) fail("reachable", `${r} is not named in SKILL.md, so no session reads it`);
  }
});

// ---------------------------------------------------------------- private
run("private", () => {
  const privateWords =
    /\bgit-?ignored\b|\bignored by git\b|\buntracked\b|\bnot (?:tracked|in git)\b|\bper[\s-]install\b|\blocal[\s-]only\b|\bprivate to this machine\b|\bprivate (?:file|copy|notes?|rows?|folder)\b/i;
  const lawWords = /\bstudio\b|\brules\.md\b|\brows?\b|\binvariants?\b|\bthe law\b|\bthis file\b|\bthese files\b/i;
  for (const file of studioDocs) {
    for (const sentence of squashSpace(read(file)).split(/(?<=[.;!?|])\s+/)) {
      const m = sentence.match(privateWords);
      const clause = sentence.slice(0, m ? m.index : 0).split(/[,:;()—]/).pop();
      if (m && /\b(?:never|not|no|none|nothing)\b/i.test(clause.trim().split(/\s+/).slice(-4).join(" "))) continue; // a stated ban, not a claim
      if (m && lawWords.test(sentence.replace(m[0], "")))
        fail("private", `${rel(file)} calls studio's rules "${m[0]}": "${sentence.slice(0, 90)}"`);
    }
  }
});

// ---------------------------------------------------------------- paths
const projectMd = new Set(["implementation-notes.md"]); // a project file the operator's own rules prescribe
const lowercaseMd = (name) => /^[a-z0-9][a-z0-9._-]*\.md$/.test(name);
function checkPath(file, raw, via) {
  const p = raw.replace(/[.,;:)]+$/, "").replace(/^-{1,2}[\w-]+=/, "").replace(/^\$\{?HOME\}?/, "~"); // a flag's value is the path
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(p) && !/^file:/i.test(p)) return; // http(s) and friends
  const bare = p.replace(/#.*$/, "");
  const isMd = /\.mdx?$/i.test(bare);
  if (/^file:/i.test(p)) return fail("paths", `${rel(file)} points at a file url (${via}): ${p}`);
  if ((!/^[~/]/.test(p) && /(^|\/)local\//i.test(p)) || /cortex\/local\//i.test(p))
    return fail("paths", `${rel(file)} points into cortex's private local/ folder (${via}): ${p}`);
  if (/(^|\/)\.\.(\/|$)/.test(p) && !/^[~/]/.test(p)) return fail("paths", `${rel(file)} points outside studio (${via}): ${p}`);
  if (/^[~/]/.test(p)) {
    if (isMd || /\/(?:studio|cortex)(?:\/|$)/i.test(p)) fail("paths", `${rel(file)} points at studio law outside studio (${via}): ${p}`);
    return; // tool and system locations are fine
  }
  const dotted = p.startsWith("./");
  const clean = bare.replace(/^\.\//, "");
  if (!clean) return;
  if (/^design\/workflows\/studio(\/|$)/i.test(clean)) {
    if (!fs.existsSync(path.join(root, clean))) fail("paths", `${rel(file)} names ${p} (${via}), which is not in studio`);
    return;
  }
  const first = clean.split("/")[0].toLowerCase();
  const studioFolder = (studioDirs.has(first) && first !== "scripts") || (first === "scripts" && /^scripts\/preflight/i.test(clean));
  if (dotted || (clean.includes("/") && studioFolder)) {
    if (!fs.existsSync(path.join(studio, clean))) fail("paths", `${rel(file)} names ${p} (${via}), which is not in studio`);
    return;
  }
  if (clean.includes("/")) return;
  if (lowercaseMd(clean) && !studioNames.has(clean.toLowerCase()) && !projectMd.has(clean))
    fail("paths", `${rel(file)} names ${p} (${via}), which is not in studio; name another file with its folder (docs/${p})`);
}
run("paths", () => {
  for (const file of studioDocs) {
    const text = read(file);
    const links = [
      ...[...text.matchAll(/\]\(\s*<([^>]+)>(?:\s+"[^"]*")?\s*\)/g)].map((m) => m[1]),
      ...[...text.matchAll(/\]\(\s*([^)\s<>]+)(?:\s+"[^"]*")?\s*\)/g)].map((m) => m[1]),
      ...[...text.matchAll(/^\s*\[[^\]]+\]:\s*<?(\S+?)>?(?:\s+"[^"]*")?\s*$/gm)].map((m) => m[1]),
      ...[...text.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]),
    ];
    for (const link of links) {
      if (/^file:/i.test(link)) checkPath(file, link, "link");
      else if (!/^[a-z][a-z0-9+.-]*:/i.test(link) && !link.startsWith("#")) {
        const target = path.resolve(path.dirname(file), link.replace(/#.*$/, ""));
        if (!(target + path.sep).startsWith(studio + path.sep) && target !== studio) fail("paths", `${rel(file)} links outside studio: ${link}`);
        else if (!fs.existsSync(target)) fail("paths", `${rel(file)} links to missing ${link}`);
      }
    }
    const body = text
      .replace(/\]\([^)]*\)/g, "]")
      .replace(/^\s*\[[^\]]+\]:.*$/gm, "")
      .replace(/\b(?:src|href)\s*=\s*["'][^"']*["']/gi, "");
    for (const m of body.matchAll(/`([^`\n]+)`/g)) {
      const span = m[1];
      const anchored = /^(~|\$\{?HOME\}?|\/|\.\.?\/|file:)/.test(span);
      const studioPath = /^(?:doctrine|practices|scripts)\//i.test(span);
      if (!anchored && !studioPath && /\s/.test(span)) {
        // a command: check any studio, home, or relative path inside it
        for (const [tok] of span.matchAll(/(?<![\w./-])(?:(?:doctrine|practices|scripts)\/|~\/|\$\{?HOME\}?\/|\.\.\/|\/(?=[\w.-]+\/)|local\/)[^\s`'"]+/gi)) checkPath(file, tok, "code");
        continue;
      }
      if (!anchored && (/^@/.test(span) || /[<>{}*]/.test(span))) continue; // package scopes, placeholders, globs
      if (anchored || span.includes("/") || /\.mdx?$/i.test(span)) checkPath(file, span, "code");
    }
    const prose = body.replace(/`[^`\n]*`/g, " ");
    const proseRe =
      /(?<![\w@.:/-])(?:(?:~|\$\{?HOME\}?|\/|file:\/\/|(?:\.{1,2}\/)+)[^\s)`'"]*|(?:doctrine|practices|scripts)\/[\w./-]*|(?:[\w.-]+\/)*[\w.-]+\.mdx?\b)/gi;
    for (const [p] of prose.matchAll(proseRe)) checkPath(file, p, "prose");
  }
});

// ---------------------------------------------------------------- refs + values
run("refs", () => {
  for (const file of studioDocs) {
    const text = squashSpace(read(file));
    for (const m of text.matchAll(/\(\s*`([\w./-]+\.mdx?)`\s*,\s*`?([^)`]+?)`?\s*\)/gi)) {
      const target = path.join(studio, m[1]);
      if (!fs.existsSync(target)) {
        fail("refs", `${rel(file)} refers to ${m[1]}, which is not in studio`);
        continue;
      }
      if (!rowsByTopic(target).has(m[2].toLowerCase()))
        fail("refs", `${rel(file)} refers to "${m[2]}" in ${m[1]}, which has no such row or heading`);
    }
  }
});
run("values", () => {
  const rules = rowsByTopic(path.join(studio, "rules.md"));
  const duration = /\d+(?:\s?[–-]\s?\d+)?\s?ms\b/g;
  const easing = /cubic-bezier\(|\bease-in-out\b|\bease-in\b|\bease-out\b|\blinear\b|steps\(/gi;
  const noTokens = (s) => s.replace(/--[\w-]+/g, " ");
  const cell = (row) => (row && row.startsWith("|") ? row.split("|")[2] || "" : "");
  const need = [
    ["motion numbers", (r) => (r.match(duration) || []).length >= 3 && /enter/i.test(r) && /exit/i.test(r) && (noTokens(r).match(easing) || []).length >= 2, "three durations in ms, and an enter and an exit easing"],
    ["behavior engine", () => true, ""],
    ["per-project choices", (r) => /design\.config\.ts/.test(r), "where choices are declared (design.config.ts)"],
  ];
  for (const [topic, ok, what] of need) {
    const row = rules.get(topic);
    if (!row) fail("values", `rules.md has no "${topic}" row`);
    else if (!ok(cell(row))) fail("values", `rules.md "${topic}" row lost its value (${what})`);
  }
  const exit = rules.get("exit ease");
  if (exit && !(noTokens(cell(exit)).match(easing) || []).length) fail("values", `rules.md "exit ease" row lost its value (an easing)`);
});

// ---------------------------------------------------------------- retired
const retiredFiles = /(?<![\w-])(?:house|friction)\.(?!(?:svg|png|jpe?g|gif|webp|ico|avif)\b)[a-z0-9]{1,12}\b|house\.template|studio-law\.md/i;
run("retired", () => {
  const retired = [
    retiredFiles, /friction[\s_-]*log/i, /learning[\s_-]*journal/i, /\barc[\s_-](?:notebook|journal)\b/i,
    /code\/arc\b|\barc\/(?=[\s`'")]|$|[\w.-]+\.\w{1,5}\b|[\w.-]+\/)/im, /\bstudy[\s_-]queue/i,
    /`workbench`|\bworkbench skill\b/i, /`groundwork`|\bgroundwork skill\b/i, /\bwaveframe\b/i, /\bnightcap\b/i,
  ];
  const retiredFile = /^(?:(?:house|friction)(?:\.(?!(?:svg|png|jpe?g|gif|webp|ico|avif)$)|$)|(?:house\.template|study[\s_-]?queue|learning[\s_-]?journal|studio[\s_-]?law)(?:\.|$))/i;
  for (const file of [...studioFiles, ...studioLinks]) {
    const parts = path.relative(studio, file).split(path.sep);
    if (retiredFile.test(parts[parts.length - 1]) || parts.slice(0, -1).some((d) => /^arc$/i.test(d)))
      fail("retired", `${rel(file)} brings back a retired file or folder`);
    if (!isText(file)) continue;
    const text = read(file);
    for (const re of retired) if (re.test(text)) fail("retired", `${rel(file)} mentions ${re.source}`);
  }
});

// ---------------------------------------------------------------- outside
run("outside", () => {
  let files = [];
  try {
    files = git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).split("\0").filter(Boolean);
  } catch {
    fail("outside", "git ls-files failed; cannot scan cortex");
    return;
  }
  const skip = (f) =>
    f.startsWith("marketing/") || f.startsWith("design/workflows/studio/") || f === "SKILL_AUDIT.md" ||
    f === "scripts/check-studio.mjs" || f === "scripts/test-check-studio.sh";
  const inSkill = (f) => {
    let dir = path.dirname(path.join(root, f));
    while (dir.startsWith(root) && dir !== root) {
      if (fs.existsSync(path.join(dir, "SKILL.md"))) return true;
      dir = path.dirname(dir);
    }
    return false;
  };
  const intoStudio = /(?:\.\.\/)+(?:[\w-]+\/)*studio(?![\w-])|workflows\/studio(?![\w-])|skills\/studio(?![\w-])|(?<![\w.-])studio\/(?:rules|playbook|inventory|skill|readme|agents)\.md\b|(?<![\w.-])studio\/(?:practices|doctrine|scripts)\//i;
  for (const f of files.filter((x) => !skip(x))) {
    const full = path.join(root, f);
    let st;
    try {
      st = fs.lstatSync(full);
    } catch {
      continue;
    }
    if (st.isSymbolicLink()) {
      const target = path.resolve(path.dirname(full), fs.readlinkSync(full));
      if ((target + path.sep).toLowerCase().startsWith((studio + path.sep).toLowerCase()) || target.toLowerCase() === studio.toLowerCase())
        fail("outside", `${f} is a symlink into studio; refer to the studio skill by name`);
      continue;
    }
    if (!st.isFile() || !isText(full)) continue;
    const text = read(full);
    const isDoc = /\.mdx?$/i.test(f);
    if (isDoc && retiredFiles.test(text)) fail("outside", `${f} names a retired studio file`);
    if (inSkill(f)) {
      if (intoStudio.test(text)) fail("outside", `${f} reaches into studio by path; refer to the studio skill by name`);
    } else if (isDoc) {
      for (const m of text.matchAll(/workflows\/studio\/([\w./-]*\w)/gi))
        if (!fs.existsSync(path.join(studio, m[1]))) fail("outside", `${f} names design/workflows/studio/${m[1]}, which doesn't exist`);
    }
    if (isDoc)
      for (const m of squashSpace(text).matchAll(/`?studio`?(?:\s+skill)?['’]s\s+`([^`]+)`|`([^`]+)`\s+in\s+(?:the\s+)?`?studio`?(?:\s+skill)?\b/gi)) {
        const p = m[1] || m[2];
        if (/[/]|\.\w+$/.test(p) && !fs.existsSync(path.join(studio, p)))
          fail("outside", `${f} names studio's \`${p}\`, which studio doesn't have`);
      }
  }
});

// ---------------------------------------------------------------- rules + rows
const rulesText = read(path.join(studio, "rules.md"));
const studioInvariants = numbered(section(rulesText, "invariants") || "");
run("rules", () => {
  for (const h of ["invariants", "defaults", "experiments"])
    if (section(rulesText, h) === null) fail("rules", `rules.md has no "## ${h}" section`);
  if (studioInvariants.length < 1 || studioInvariants.length > 10)
    fail("rules", `rules.md must hold 1-10 invariants, found ${studioInvariants.length}`);
  studioInvariants.forEach((inv, i) => {
    if (inv.n !== i + 1) fail("rules", `invariant numbering breaks at "${inv.n}. ${inv.text.slice(0, 40)}"`);
  });
});
run("rows", () => {
  const shapes = new Map([["topic|rule|evidence", 3], ["topic|rule|evidence|recheck when", 4]]);
  for (const file of [path.join(studio, "rules.md"), ...studioDocs.filter((f) => path.dirname(f) === path.join(studio, "practices"))]) {
    const lines = read(file).split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith("|")) continue;
      if ((lines[i - 1] || "").startsWith("|")) continue; // not the first line of a table
      if (!(lines[i + 1] || "").startsWith("|---")) {
        fail("rows", `${rel(file)}:${i + 1} has table rows with no header; add rows inside a graded table`);
        continue;
      }
      const header = lines[i].split("|").slice(1, -1).map((c) => c.trim().toLowerCase()).join("|");
      const cells = shapes.get(header);
      if (!cells) {
        fail("rows", `${rel(file)}:${i + 1} has a table that isn't a graded-row table (topic | rule | evidence [| recheck when])`);
        continue;
      }
      for (let j = i + 2; j < lines.length && lines[j].startsWith("|"); j++) {
        const parts = lines[j].replace(/\\\|/g, "").split("|").slice(1, -1).map((c) => c.trim());
        if (parts.length !== cells || parts.some((c) => !c))
          fail("rows", `${rel(file)}:${j + 1} row needs ${cells} filled cells: "${(parts[0] || "").slice(0, 40)}"`);
      }
    }
  }
});

// ---------------------------------------------------------------- inventory
const skillDirs = new Map();
for (const shelf of JSON.parse(read(path.join(root, "catalog/shelves.json"))).shelves) {
  const dir = path.join(root, shelf.path);
  if (!fs.existsSync(dir)) continue;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }))
    if (entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "SKILL.md"))) skillDirs.set(entry.name, shelf.path);
}
run("inventory", () => {
  const inv = read(path.join(studio, "inventory.md"));
  const listed = new Set([...(section(inv, "skills") || "").matchAll(/^- `([a-z0-9-]+)`:/gm)].map((m) => m[1]));
  for (const name of listed) if (!skillDirs.has(name)) fail("inventory", `inventory.md lists "${name}", which is not a skill`);
  for (const [name, shelf] of skillDirs)
    if (shelf.startsWith("design/") && !listed.has(name)) fail("inventory", `design skill "${name}" (${shelf}) has no verdict in inventory.md`);
});

// ---------------------------------------------------------------- asbuilt
run("asbuilt", () => {
  const grades = path.join(root, "design/workflows/asbuilt/references/rule-grades.md");
  if (!fs.existsSync(grades)) {
    fail("asbuilt", `${rel(grades)} is missing; asbuilt's invariants must mirror studio's`);
    return;
  }
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const theirs = numbered(section(read(grades), "Current Invariants") || "").map((i) => norm(i.text));
  const ours = studioInvariants.map((i) => norm(i.text));
  if (theirs.join("\n") !== ours.join("\n")) fail("asbuilt", `${rel(grades)} invariants differ from studio rules.md; copy studio's list`);
});

// ---------------------------------------------------------------- clients
run("clients", () => {
  for (const file of [...studioFiles, ...studioLinks])
    if (alias.test(rel(file)) || (isText(file) && alias.test(read(file))))
      fail("clients", `${rel(file)} carries a client alias; evidence is a date and a cost`);
  if (!clientNames) {
    console.log("SKIP  studio clients: no local/client-names.txt (the alias check still ran)");
    return;
  }
  for (const file of studioFiles)
    for (const n of namesIn(rel(file) + " " + (isText(file) ? read(file) : "")))
      fail("clients", `${rel(file)} names "${n}"; use a date and the cost instead`);
});

if (failures) {
  console.log(`\n${failures} studio check(s) failed`);
  process.exit(1);
}
