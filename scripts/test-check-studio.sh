#!/usr/bin/env bash
# test-check-studio: proves scripts/check-studio.mjs catches every defect class it claims,
# and lets ordinary edits through. works on a temp copy of cortex; never touches the real tree.
# client-name cases use made-up names, so no real client name ever lands in this public file.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
R="$TMP/cortex"
mkdir -p "$R"
rsync -a --exclude .git --exclude node_modules --exclude local "$ROOT/" "$R/"
mkdir -p "$R/local"
printf '# test names only\nacmecorp\nzebra labs\nkiwi\n' > "$R/local/client-names.txt"
(
  cd "$R"
  git init -q
  printf 'local/\n' >> .gitignore
  git add -A
  git -c user.email=test@local -c user.name=test commit -qm snapshot
)

S="design/workflows/studio"
bad=0
total=0

edit() { # edit <append|replace|droprow> <file> <args...>
  node - "$R" "$@" <<'JS'
const fs = require("fs"), path = require("path");
const [root, op, file, a, b] = process.argv.slice(2);
const p = path.join(root, file);
if (op === "append") { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.appendFileSync(p, "\n" + a + "\n"); process.exit(0); }
let t = fs.readFileSync(p, "utf8");
if (op === "replace") { if (!t.includes(a)) { console.error("edit: text not found in " + file); process.exit(2); } t = t.replace(a, b); }
if (op === "droprow") { const lines = t.split("\n"); const kept = lines.filter((l) => !l.startsWith("| " + a + " |")); if (kept.length === lines.length) { console.error("edit: row not found: " + a); process.exit(2); } t = kept.join("\n"); }
if (op === "addrow") { const lines = t.replace(/\n+$/, "").split("\n"); let last = -1; lines.forEach((l, i) => { if (l.startsWith("|")) last = i; }); if (last < 0) { console.error("edit: no table in " + file); process.exit(2); } lines.splice(last + 1, 0, a); t = lines.join("\n") + "\n"; }
if (op === "setrule") { let hit = false; t = t.split("\n").map((l) => { if (!l.startsWith("| " + a + " |")) return l; hit = true; const c = l.split("|"); c[2] = " " + b + " "; return c.join("|"); }).join("\n"); if (!hit) { console.error("edit: row not found: " + a); process.exit(2); } }
if (op === "dropinvariants") { const before = t; t = t.replace(/(## invariants\n[\s\S]*?)(?=\n## )/, (s) => s.replace(/^\d+\..*\n/gm, "")); if (t === before) { console.error("edit: no invariants found"); process.exit(2); } }
fs.writeFileSync(p, t);
JS
}
reset() { (cd "$R" && git checkout -q -- . && git clean -qfd -e local/); }
check() { (cd "$R" && env ${ENVX:-} node scripts/check-studio.mjs 2>&1); }

expect_fail() { # expect_fail <label> <check-name-regex> <setup command...>
  local label="$1" want="$2"; shift 2
  total=$((total+1))
  if ! "$@"; then echo "SETUP  $label"; bad=$((bad+1)); reset; return; fi
  local out code
  out="$(check)"; code=$?
  if [ "$code" -eq 1 ] && printf '%s\n' "$out" | grep -Eq "^FAIL  studio ($want):"; then
    echo "ok     caught: $label"
  else
    echo "MISSED $label (exit $code)"; printf '%s\n' "$out" | grep '^FAIL' | head -3 | sed 's/^/         /'
    bad=$((bad+1))
  fi
  ENVX=""; reset
}
expect_pass() { # expect_pass <label> <setup command...>
  local label="$1"; shift
  total=$((total+1))
  if ! "$@"; then echo "SETUP  $label"; bad=$((bad+1)); reset; return; fi
  local out code
  out="$(check)"; code=$?
  if [ "$code" -eq 0 ]; then echo "ok     allowed: $label"
  else echo "BLOCKED $label"; printf '%s\n' "$out" | grep '^FAIL' | head -3 | sed 's/^/         /'; bad=$((bad+1)); fi
  reset
}
gitignore_studio() { edit append .gitignore "$S/notes.md" && edit append "$S/notes.md" "x"; }
broken_git() { gitignore_studio && ENVX="GIT_DIR=/nonexistent"; }
wrapped_drift() {
  edit replace $S/rules.md "1. code is the source of truth. canvas tools and design files are spec surfaces." "1. code is the source of truth. canvas tools and design files are spec surfaces.
   a canvas value never overrides code." &&
  edit replace design/workflows/asbuilt/references/rule-grades.md "1. Code is the source of truth. Canvas tools and design files are spec surfaces." "1. Code is the source of truth. Canvas tools and design files are spec surfaces.
   Either may override code."
}
merge_exit_ease() {
  edit droprow $S/rules.md "exit ease" &&
  edit replace $S/rules.md '`--ease-exit` is the tuned curve (`rules.md`, exit ease).' '`--ease-exit` is `cubic-bezier(0.32, 0, 0.67, 0)`, tuned by hand on 2026-07-06.'
}
arc_practices() {
  edit append $S/practices/arc.md '# practices: arc browser' &&
  edit replace $S/SKILL.md '  - `practices/front-end.md`:' '  - `practices/arc.md`: the arc browser
  - `practices/front-end.md`:'
}
heading_renamed() {
  edit replace $S/practices/figma.md '## experiments' '## Experiments' &&
  edit addrow $S/practices/figma.md '| empty evidence | a rule |  | next time |'
}
heading_suffixed() {
  edit replace $S/practices/figma.md '## experiments' '## experiments — running' &&
  edit addrow $S/practices/figma.md '| empty evidence | a rule |  | next time |'
}
new_top_doc() {
  edit append $S/glossary.md '# glossary' &&
  edit replace $S/SKILL.md '  - `inventory.md`:' '  - `glossary.md`: terms
  - `inventory.md`:'
}
new_practices_file() {
  edit append $S/practices/sketch.md '# practices: sketch' &&
  edit replace $S/SKILL.md '  - `practices/front-end.md`:' '  - `practices/sketch.md`: sketching tools
  - `practices/front-end.md`:'
}

if [ "$(check >/dev/null; echo $?)" != 0 ]; then echo "baseline fails; fix the real tree first"; check; exit 1; fi

# ---- paths
expect_fail "dangling practices path"      paths  edit append $S/playbook.md 'see `practices/sketch.md`.'
expect_fail "private local path"           paths  edit append $S/SKILL.md 'motion lives in `local/motion.md`.'
expect_fail "prose .md name"               paths  edit append $S/rules.md 'motion numbers live in house-motion.md for now.'
expect_fail "link with title"              paths  edit append $S/README.md '[x](practices/sketch.md "t")'
expect_fail "reference-style link"         paths  edit append $S/README.md '[ref]: practices/sketch.md'
expect_fail "file:// link"                 paths  edit append $S/README.md '[x](file:///Users/someone/motion.md)'
expect_fail "link outside studio"          paths  edit append $S/README.md '[up](../../AGENTS.md)'
expect_fail "backticked ../../"            paths  edit append $S/playbook.md 'see `../../AGENTS.md`.'
expect_fail "prose ../../"                 paths  edit append $S/playbook.md 'see ../../README.md for more.'
expect_fail "home path in code"            paths  edit append $S/playbook.md 'see `~/notes/motion.md`.'
expect_fail "home path in prose"           paths  edit append $S/rules.md 'values live in ~/.agents/motion.md now.'
expect_fail "absolute path"                paths  edit append $S/rules.md 'see `/Users/someone/private/motion.md`.'
expect_fail "../ inside a studio path"     paths  edit append $S/rules.md 'see `practices/../../asbuilt/references/rule-grades.md`.'
expect_fail "studio path, no extension"    paths  edit append $S/playbook.md 'see practices/motion for details.'
expect_fail "studio path, other extension" paths  edit append $S/rules.md 'see `practices/motion.toml`.'
expect_fail "studio folder that is missing" paths edit append $S/rules.md 'see `doctrine/motion/`.'
expect_fail "html src into a studio folder" paths edit append $S/README.md '<img src="practices/x.png">'
expect_fail "file beside this one, ./"     paths  edit append $S/rules.md 'tuned values live in ./tuned.json beside this file.'
expect_fail "retired stem, other extension" "retired|paths" edit append $S/rules.md 'the tuned values live in `./house.json` beside this file.'
expect_fail "gitignored cortex location"   paths  edit append $S/SKILL.md 'tuned values live in `local/tokens.yaml`.'
expect_fail "home path through studio"     paths  edit append $S/playbook.md 'tuned values live in ~/.config/studio/tokens.yaml.'
expect_fail "law described as private"     private edit append $S/rules.md 'the earned rows are gitignored, per install.'
expect_fail "rows git-ignored"             private edit append $S/playbook.md 'studio rows go in the notes file, which is git-ignored.'
expect_fail "rows ignored by git"          private edit append $S/rules.md 'these rows are ignored by git.'
expect_fail "rows private to this machine" private edit append $S/rules.md 'the tuned rows are private to this machine.'
expect_fail "missing .md in any project"   paths  edit append $S/SKILL.md '- `rules.md` (the law) and, in any project, `earned.md` (the earned rows).'
expect_fail "\$HOME path in code"          paths  edit append $S/playbook.md 'rows live in `$HOME/.claude/skills/studio/earned.md`.'
expect_fail "\$HOME path in prose"         paths  edit append $S/playbook.md 'rows live in $HOME/.claude/skills/studio/earned.md now.'
expect_fail "unlisted .MD file"            reachable edit append $S/practices/motion.MD '# motion'
expect_fail "unlisted .mdx file"           reachable edit append $S/practices/motion.mdx '# motion'
expect_fail "unlisted json law"            reachable edit append $S/motion.json '{"note": "house motion law; overrides rules.md"}'
expect_fail "unlisted yaml rows"           reachable edit append $S/doctrine/earned-rows.yaml 'rows: []'
expect_fail "retired: arc/ nested path"    retired edit append $S/SKILL.md 'see `arc/sessions/today.md`.'
expect_fail "retired: arc/ nested folder"  retired edit append $S/SKILL.md 'see arc/journal/ for context.'
expect_fail "local/ reached through ../"   paths  edit append $S/playbook.md 'the motion values live in `../../../local/studio-rows.txt`.'
expect_fail "local/ under a cortex prefix" paths  edit append $S/playbook.md 'see `cortex/local/studio-rows.md`.'
expect_fail "absolute local/ in a command" paths  edit append $S/playbook.md 'run `cat /Users/someone/Developer/code/cortex/local/studio-rows.txt` first.'
expect_fail "absolute studio path, command" paths edit append $S/playbook.md 'run `node /Users/someone/studio/scripts/gone.mjs` first.'
expect_fail "retired stem, long extension" retired edit append $S/rules.md 'see `friction.jsonl` and `house.markdown`.'
expect_fail "retired file outside studio"  outside edit append design/AGENTS.md 'see studio/friction.jsonl.'
expect_fail "unicode file name reaching in" outside edit append "design/craft/better-ui/references/café.md" 'numbers in ../../workflows/studio/rules.md'
expect_fail "private, after a colon"       private edit append $S/rules.md 'rows earned here never ship with the tool: they are gitignored.'
expect_fail "private, after a comma"       private edit append $S/rules.md 'studio does not ship its rows, which are untracked.'
expect_fail "two-word client, wrapped"     clients edit append $S/rules.md "$(printf 'the zebra\nlabs brand work')"
expect_fail "skills-relative studio path"  outside edit append design/workflows/asbuilt/SKILL.md 'read `studio/rules.md` first.'
expect_fail "nested .gitignore names studio" tracked edit append design/.gitignore 'workflows/studio/notes.md'
expect_fail "retired: frictionlog"         retired edit append $S/playbook.md 'note it in the frictionlog.'
expect_fail "spaces in a studio path"      paths  edit append $S/rules.md 'see `practices/motion tokens.md`.'
expect_fail "angle-bracket link"           paths  edit append $S/README.md '[x](<practices/motion tokens.md>)'
expect_fail "./ prefixed missing path"     paths  edit append $S/playbook.md 'see `./practices/sketch.md`.'
# ---- refs and values
expect_fail "ref to a missing topic"       refs   edit append $S/playbook.md 'see (`rules.md`, dark mode policy).'
expect_fail "wrapped ref to a dropped row" refs   edit droprow $S/rules.md "ambiguous session opener"
expect_fail "exit ease row dropped"        "refs|values" edit droprow $S/rules.md "exit ease"
expect_fail "paper row a ref depends on"   refs   edit droprow $S/practices/paper.md "freeform frames"
expect_fail "motion values erased"         values edit setrule $S/rules.md "motion numbers" "tuned per project"
expect_fail "exit curve erased"            values edit setrule $S/rules.md "exit ease" "whatever feels right"
expect_fail "exit curve, token name only"  values edit setrule $S/rules.md "exit ease" '`--ease-exit` is tuned per project; no curve is recorded yet'
expect_fail "motion easings erased"        values edit setrule $S/rules.md "motion numbers" "durations: fast 100–120ms, base 180–220ms, slow 280–320ms. enter and exit easings come from the project motion tokens."
expect_fail "command span, renamed script" paths  edit replace $S/doctrine/enforcement.md '`npx tsx scripts/preflight.ts`' '`npx tsx scripts/preflight-gate.ts`'
expect_fail "capitalized studio folder"    paths  edit append $S/rules.md 'see `Practices/sketch.md`.'
expect_fail "backticked topic in a ref"    refs   edit append $S/playbook.md 'see (`rules.md`, `session opener rule`).'
expect_fail "graded heading renamed"       rows   heading_renamed
expect_fail "graded heading with a suffix" rows   heading_suffixed
# ---- structure
expect_fail "practices file not listed"    reachable edit append $S/practices/sketch.md '# practices: sketch'
expect_fail "unlisted journal file"        reachable edit append $S/lessons.md '# lessons'
expect_fail "retired file name returns"    retired edit append $S/house.md '# rows'
expect_fail "retired folder returns"       "retired|reachable" edit append $S/arc/notes.md '# notes'
expect_fail "retired skill named"          retired edit append $S/playbook.md 'then run `nightcap`.'
expect_fail "retired: house.md"            retired edit append $S/rules.md 'the old house.md rows.'
expect_fail "retired: learning journal"    retired edit append $S/playbook.md 'log it in the learning-journal.'
expect_fail "retired: friction log"        retired edit append $S/playbook.md 'add it to the friction log.'
expect_fail "retired: arc notebook"        retired edit append $S/playbook.md 'see the arc notebook.'
expect_fail "retired: arc/ file"           "retired|paths" edit append $S/SKILL.md 'log what you learned in `arc/notebook.md`.'
expect_fail "retired: arc/ folder"         retired edit append $S/SKILL.md 'keep session notes in the arc/ folder.'
expect_fail "retired: workbench skill"     retired edit append $S/playbook.md 'load the `workbench` skill first.'
expect_fail "empty invariants"             rules  edit dropinvariants $S/rules.md
expect_fail "invariant numbering"          rules  edit replace $S/rules.md "3. one token" "4. one token"
expect_fail "row missing evidence"         rows   edit replace $S/practices/figma.md "| 2026-09-11, two clip-fix rounds |" "|  |"
expect_fail "design skill not inventoried" inventory edit replace $S/inventory.md '- `gradients`: supplier. color-space choices and recipes.' ''
expect_fail "inventory lists a non-skill"  inventory edit replace $S/inventory.md '- `gradients`:' '- `gradient-kit`:'
expect_fail "asbuilt invariants drift"     asbuilt edit replace design/workflows/asbuilt/references/rule-grades.md "Attention is scarce" "Attention is salt"
expect_fail "wrapped invariant drift"      asbuilt wrapped_drift
expect_fail "asbuilt rule-grades removed"  asbuilt rm "$R/design/workflows/asbuilt/references/rule-grades.md"
expect_fail "gitignored studio file"       tracked gitignore_studio
expect_fail "gitignored file, broken git"  tracked broken_git
expect_fail "symlink inside studio"        tracked ln -s /tmp/private-motion.md "$R/$S/practices/private.md"
# ---- outside studio
expect_fail "symlink into studio"          outside ln -s ../studio/rules.md "$R/design/workflows/asbuilt/rules-link.md"
expect_fail "../studio/ from a sibling"    outside edit append design/workflows/asbuilt/SKILL.md 'see `../studio/rules.md`.'
expect_fail "untracked file reaching in"   outside edit append design/craft/better-ui/references/motion-source.md 'numbers in ../../../workflows/studio/rules.md'
expect_fail "script reaching in"           outside edit append design/tools/dialkit/scripts/pull.sh 'cat "../../workflows/studio/rules.md"'
expect_fail "~/.claude/skills/studio path" outside edit append design/craft/better-ui/SKILL.md 'read ~/.claude/skills/studio/rules.md'
expect_fail "folder link, no slash"        outside edit append design/craft/better-ui/SKILL.md '[studio](../../workflows/studio)'
expect_fail "Studio's missing file"        outside edit append design/kits/component-libraries/SKILL.md "read Studio's \`motion.md\`."
expect_fail "studio skill's missing file"  outside edit append design/kits/component-libraries/SKILL.md "read the studio skill's \`practices/motion.md\`."
expect_fail "capital-S path into studio"   outside edit append design/craft/better-ui/SKILL.md 'see `../../workflows/Studio/motion.md`.'
expect_fail "file named in the studio skill" outside edit append design/kits/component-libraries/SKILL.md 'Read `motion.md` in the `studio` skill.'
expect_fail "shelf index names friction.md" outside edit append design/AGENTS.md 'deposits go to friction.md.'
expect_fail "repo doc, missing studio path" outside edit append README.md 'see design/workflows/studio/house-rows.md'
# ---- clients (made-up names)
expect_fail "client name"                  clients edit replace $S/practices/paper.md "2026-08-21, four retries" "2026-08-21 acmecorp booth, four retries"
expect_fail "client in CamelCase"          clients edit addrow $S/practices/front-end.md '| x | the AcmecorpSite build | 2026-09-01 | next |'
expect_fail "client joined to a word"      clients edit addrow $S/practices/front-end.md '| x | acmecorpbooth pass | 2026-09-01 | next |'
expect_fail "client domain"                clients edit addrow $S/practices/front-end.md '| x | acmecorp.xyz deploy | 2026-09-01 | next |'
expect_fail "client with an accent"        clients edit addrow $S/practices/front-end.md '| x | Acmécorp review | 2026-09-01 | next |'
expect_fail "two-word client, hyphenated"  clients edit addrow $S/practices/front-end.md '| x | zebra-labs pass | 2026-09-01 | next |'
expect_fail "two-word client, camel"       clients edit addrow $S/practices/front-end.md '| x | ZebraLabs pass | 2026-09-01 | next |'
expect_fail "client in a file name"        clients edit append $S/doctrine/acmecorp-notes.md '# notes'
expect_fail "client in a script"           clients edit append $S/scripts/preflight.ts '// tuned on acmecorp'
expect_fail "short client, whole word"     clients edit addrow $S/practices/front-end.md '| x | kiwi review | 2026-09-01 | next |'
expect_fail "alias in a file name"         clients edit append $S/scripts/project-q-tokens.ts '// tokens'
expect_fail "alias Project-Q"              clients edit addrow $S/practices/paper.md '| x | seen on Project-Q | 2026-09-01 | next |'
expect_fail "alias project Q"              clients edit addrow $S/practices/paper.md '| x | seen on project Q | 2026-09-01 | next |'
expect_fail "alias PROJECT_Q"              clients edit addrow $S/practices/paper.md '| x | seen on PROJECT_Q | 2026-09-01 | next |'
expect_fail "alias projectQ"               clients edit addrow $S/practices/paper.md '| x | seen on projectQ | 2026-09-01 | next |'
expect_fail "alias proj-q"                 clients edit addrow $S/practices/paper.md '| x | seen on proj-q | 2026-09-01 | next |'
expect_fail "alias project-q2"             clients edit addrow $S/practices/paper.md '| x | seen on project-q2 | 2026-09-01 | next |'
expect_fail "alias written out"            clients edit addrow $S/practices/paper.md '| x | seen on Project Q | 2026-09-01 | next |'
expect_fail "project alias"                clients edit addrow $S/practices/paper.md '| x | seen on project-q | 2026-09-01 | next |'

# ---- ordinary edits that must pass
expect_pass "front-end row naming project files" edit addrow $S/practices/front-end.md '| build config | keep `next.config.ts` and `package.json` scripts in sync; lighthouse.json holds the budget | 2026-09-01 | next build |'
expect_pass "Next.js and Node.js in prose"       edit addrow $S/practices/front-end.md '| runtimes | Next.js on Node.js 22 | 2026-09-01 | next upgrade |'
expect_pass "svg arc and sha256 digest"          edit addrow $S/practices/paper.md '| svg arcs | an svg arc path keeps its sha256 digest across exports | 2026-09-01 | next export |'
expect_pass "backticked config words in playbook" edit append $S/playbook.md '- set `css` and `engine` (`base-ui` or `radix`) before the first component.'
expect_pass "package scopes and variable names"  edit addrow $S/practices/figma.md '| variables | `Brand/Navy` binds; `@radix-ui/*` stays out | 2026-09-01 | next build |'
expect_pass "docs naming lighthouse.md"          edit append design/AGENTS.md 'see lighthouse.md and warehouse.md in the tooling notes.'
expect_pass "a new practices file, listed"       new_practices_file
expect_pass "project folders in code spans"      edit append $S/doctrine/codebase-scaffold.md 'components live in `components/ui/` and `app/`.'
expect_pass "tuned motion values"                edit replace $S/rules.md "durations: fast 100–120ms, base 180–220ms, slow 280–320ms." "durations: fast 110ms, base 200ms, slow 300ms."
expect_pass "hyphenated duration ranges"         edit replace $S/rules.md "100–120ms" "100-120ms"
expect_pass "behavior engine swapped"            edit replace $S/rules.md "base ui via shadcn for new react projects" "react aria for new react projects"
expect_pass "ref to a doctrine heading"          edit append $S/playbook.md 'see (`doctrine/component-intake.md`, the litmus test).'
expect_pass "project and tool paths"             edit addrow $S/practices/front-end.md '| builds | clear `.next/`, check `.github/workflows/ci.yml`, `hooks/use-theme.ts`, and `.storybook/main.ts`; chrome caches in `~/.cache/puppeteer`; write captures to `/tmp/out.png` | 2026-09-01 | next build |'
expect_pass "uppercase project docs"             edit append $S/doctrine/enforcement.md 'record profile law in the project'"'"'s `DESIGN.md`, note changes in `CHANGELOG.md`, and keep project rules in `CLAUDE.md`.'
expect_pass "common words"                       edit addrow $S/practices/paper.md '| svg paths | this lays the groundwork for a component workbench (storybook); an svg arc/bezier keeps its shape | 2026-09-01 | next svg pass |'
expect_pass "short name inside other words"      edit addrow $S/practices/front-end.md '| copy | kiwifruit and ki wireframe copy passed | 2026-09-01 | next copy pass |'
expect_pass "config words after use"             edit append $S/playbook.md '- use `css` set to `cva-utilities` for this project.'
expect_pass "new top-level doc, listed"          new_top_doc
expect_pass "see below, see invariant 2"         edit append $S/playbook.md '- keep the grid (see below), and every state (see invariant 2).'
expect_pass "tools named with use and run"       edit append $S/playbook.md '- use `shadcn` and `cva` for primitives, use `claude-in-chrome` to look, and run `lighthouse` before shipping.'
expect_pass "the phrase studio law"              edit append $S/playbook.md '- suppliers never override studio law.'
expect_pass "asbuilt package doc by name"        edit append $S/playbook.md '- the package format is the `asbuilt` skill'"'"'s `references/design-system-package.md`.'
expect_pass "project docs in a row"              edit addrow $S/practices/front-end.md '| docs | keep `docs/architecture.md`, `.github/pull_request_template.md`, `content/posts/hello-world.md`, notes/motion.md, and `readme.md` current | 2026-09-01 | next docs pass |'
expect_pass "exit ease merged into motion"       merge_exit_ease
expect_pass "arc browser practices file"         arc_practices
expect_pass "private words in tool rows"         edit addrow $S/practices/front-end.md '| env files | `.env.local`, which is gitignored, so a fresh worktree has none; a new worktree lacks untracked files | 2026-09-01 | next worktree |'
expect_pass "private copy in a figma row"        edit addrow $S/practices/figma.md '| community files | duplicating a community file makes a private copy | 2026-09-01 | next community file |'
expect_pass "project scripts in a practices row" edit addrow $S/practices/front-end.md '| captures | `scripts/capture.mjs` in the project runs the capture | 2026-09-01 | next capture |'
expect_pass "dot folders in a row"               edit addrow $S/practices/front-end.md '| tool config | `.claude/settings.json` and `.agents/product-marketing.md` live in the project | 2026-09-01 | next setup |'
expect_pass "project docs with their folder"     edit append $S/playbook.md "- keep the project's \`docs/pricing.md\`, \`workspace/PROJECT.md\`, and \`implementation-notes.md\` current."
expect_pass "gitignored env file in a tool row"  edit addrow $S/practices/front-end.md '| env keys | `.env.local` is gitignored by default, so a fresh clone has no keys | 2026-09-01 | next clone |'
expect_pass "negated private policy"             edit append $S/rules.md 'rows never move into a gitignored file; they live here, tracked.'
expect_pass "project script named in doctrine"   edit append $S/doctrine/codebase-scaffold.md "token export runs in the project's \`scripts/export-tokens.ts\`."
expect_pass "house icon asset"                   edit addrow $S/practices/paper.md '| icons | a `house.svg` icon keeps its viewBox when duplicated | 2026-09-01 | next icon pass |'
expect_pass "project I scaffold"                 edit append $S/playbook.md '- this applies to every project I scaffold.'
expect_pass "system local path in a row"         edit replace $S/practices/print-and-assets.md '`--permit-file-read=<profile dir>/`' '`--permit-file-read=/usr/local/share/ghostscript/iccprofiles/`'
expect_pass "next.js page.mdx in a row"          edit addrow $S/practices/front-end.md '| mdx pages | a `page.mdx` route needs the mdx plugin in `next.config.ts` | 2026-09-01 | next mdx page |'
expect_pass "installed non-cortex skills"        edit append $S/playbook.md '- load the `claude-in-chrome` skill to read inspector state, invoke `figma-use` before figma writes, and use the `dataviz` skill for charts.'
expect_pass "the word projects"                  edit append $S/playbook.md '- this held across two real projects.'

# ---- publish gate (stops before any git or network step)
publish_case() { # publish_case <label> <expected message> <prefix> <setup...>
  local label="$1" want="$2" prefix="$3"; shift 3
  total=$((total+1))
  "$@" || { echo "SETUP  $label"; bad=$((bad+1)); reset; return; }
  local out; out="$(cd "$R" && bash scripts/publish.sh "$prefix" nobody/nothing 2>&1)"
  if printf '%s\n' "$out" | grep -Eq "$want"; then echo "ok     gated: $label"; else echo "UNGATED $label"; printf '%s\n' "$out" | tail -2 | sed 's/^/         /'; bad=$((bad+1)); fi
  reset; printf '# test names only\nacmecorp\nzebra labs\nkiwi\n' > "$R/local/client-names.txt"
}
publish_case "odd path spelling"   "studio check failed" "./design//workflows/studio" edit replace $S/practices/paper.md "2026-08-21, four retries" "2026-08-21 acmecorp booth, four retries"
publish_case "parent folder"       "studio check failed" "design/workflows" edit replace $S/practices/paper.md "2026-08-21, four retries" "2026-08-21 acmecorp booth, four retries"
publish_case "client list missing" "client-names.txt is missing" "design/workflows/studio" rm "$R/local/client-names.txt"
publish_case "client list empty"   "missing or empty" "design/workflows/studio" sh -c "printf '# nothing\\n' > '$R/local/client-names.txt'"
publish_case "wrong-case prefix"   "studio check failed|no such folder" "design/workflows/Studio" edit replace $S/practices/paper.md "2026-08-21, four retries" "2026-08-21 acmecorp booth, four retries"

# ---- pre-push hook, against a scratch bare remote
(
  cd "$R" || exit 1
  git init -q --bare "$TMP/remote.git"
  git remote add origin "$TMP/remote.git"
  git push -q --no-verify origin HEAD:refs/heads/main 2>/dev/null
  git branch -q -f main HEAD 2>/dev/null; git checkout -q main 2>/dev/null
)
G() { git -C "$R" -c user.email=test@local -c user.name=test "$@"; }
push_hooked() { git -C "$R" -c core.hooksPath="$R/scripts/hooks" push -q origin "${PUSH_SPEC:-HEAD:refs/heads/main}" >"$TMP/push.out" 2>&1; }
hook_case() { # hook_case <label> <want: blocked|allowed> <setup...>
  local label="$1" want="$2"; shift 2
  total=$((total+1))
  local base; base="$(git -C "$R" rev-parse HEAD)"
  if ! "$@"; then echo "SETUP  $label"; bad=$((bad+1)); G reset -q --hard "$base"; return; fi
  if push_hooked; then got=allowed; else got=blocked; fi
  if [ "$got" = "$want" ]; then echo "ok     hook $want: $label"; else echo "HOOK   $label: $got, wanted $want"; tail -3 "$TMP/push.out" | sed 's/^/         /'; bad=$((bad+1)); fi
  [ "$got" = allowed ] && git -C "$R" push -q --no-verify origin "$base":refs/heads/main --force 2>/dev/null
  G checkout -q main 2>/dev/null; G reset -q --hard "$base"; G clean -qfd -e local/; PUSH_SPEC=""
}
h_clean()     { G commit -q --allow-empty -m "nothing new"; }
h_path()      { printf 'clean\n' > "$R/design/craft/better-ui/references/acmecorp-palette.md" && G add -A && G commit -qm "palette"; }
h_rename()    { G mv SOURCES.md acmecorp-sources.md && G commit -qm "rename"; }
h_author()    { git -C "$R" -c user.email=dev@acmecorp.xyz -c user.name=dev commit -q --allow-empty -m "identity"; }
h_binary()    { printf 'x\000acmecorp\000y' > "$R/design/tools/paper/icon.bin" && G add -A && G commit -qm "binary"; }
h_between()   { edit append $S/house.md '# rows' && G add -A && G commit -qm "bad" && git -C "$R" rm -q $S/house.md && G commit -qm "fixed"; }
h_merge()     {
  G checkout -q -b side && G commit -q --allow-empty -m "side" && G checkout -q main &&
  G merge -q --no-ff --no-commit side >/dev/null 2>&1; printf 'the acmecorp page\n' >> "$R/README.md" && G add -A && G commit -qm "merge" && git -C "$R" branch -q -D side
}
h_oldbranch() { G checkout -q -b old-work && git -C "$R" rm -q scripts/check-studio.mjs && printf 'the acmecorp page\n' >> "$R/README.md" && G commit -qam "old branch" && PUSH_SPEC="old-work:refs/heads/old-work"; }
h_branchname() { G commit -q --allow-empty -m "work" && PUSH_SPEC="HEAD:refs/heads/acmecorp-work"; }
h_tagmsg()     { G tag -a v9 -m "release for acmecorp" && PUSH_SPEC="refs/tags/v9"; }
hook_case "clean push"                     allowed h_clean
hook_case "client name in a new file path" blocked h_path
hook_case "client name through a rename"   blocked h_rename
hook_case "client name in author identity" blocked h_author
hook_case "client name in a binary file"   blocked h_binary
hook_case "studio broken, then fixed"      blocked h_between
hook_case "name added while merging"       blocked h_merge
hook_case "branch that predates the check" blocked h_oldbranch
hook_case "client name in a branch name"   blocked h_branchname
hook_case "client name in a tag message"   blocked h_tagmsg

echo
if [ "$bad" -gt 0 ]; then
  echo "$bad of $total studio check tests failed"
  exit 1
fi
echo "all $total studio check tests passed"
