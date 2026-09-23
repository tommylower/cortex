# playbook

the path through a session. read `rules.md` first; on any conflict, the
rules win.

## a fresh project

1. scaffold from `doctrine/codebase-scaffold.md`: the four strata, the full
   token NAME set, the shell carrying the wave signature
   (`data-wave-signature="built by a wave in progress. waves don't die."`
   on the root `<body>`), and the prebuild gate wired per
   `doctrine/enforcement.md` (the script is `scripts/preflight.ts`).
2. declare the engine and css strategy in the project's `design.config.ts`
   (`rules.md`, per-project choices). the engine starts from the
   behavior-engine default. the css strategy has no house default, so pick
   one on purpose and say why.
3. no pre-built component set. the first component enters through
   `doctrine/component-intake.md` when a screen pulls for it.

## an existing project

1. to derive its design system from what is built, use the `asbuilt`
   skill. it owns the design-system package format.
2. before changing anything, run `studio-audit` for the ui verdict, and
   check the code against the strata and invariants: raw values outside
   the token file, components shipped from the happy frame alone, borrowed
   skin, and motion values copied from a supplier instead of the
   project's own motion tokens. the combined gap list is
   the work queue. fix it through intake, worst first.
3. wire enforcement without disturbing product code: add
   `scripts/preflight.ts` per `doctrine/enforcement.md`, grandfather the
   existing skin in `.preflightignore`, then plant a raw hex in a new file
   and confirm preflight fails on it.

## component work

- the loop: brief, intake (`doctrine/component-intake.md`), build, review
  across the state graph at 375, 768, 1024, and 1440, operator approval,
  then placement in a page.
- when the brief pulls for an existing component or registry, load the
  `component-libraries` skill after the operator has stated intent. it
  supplies behavior and anatomy, never skin.
- canvas tools are interchangeable spec surfaces, and code is the source
  of truth (invariant 1). code to canvas goes through the figma mcp or paper's
  code-to-design. canvas to code goes through intake: anatomy only, and the
  skin stays ours (invariant 8).
- for motion and polish, use `emil-design-eng` (motion review and codebase
  motion audits), `interface-craft`, and `interface-kit` as suppliers.
  motion numbers still come from `rules.md`.
- for focused accessibility, layout, writing, typography, or ui polish,
  load the matching `better-*` skill; `oklch-skill` owns color.
- before reaching for anything else, check its verdict in `inventory.md`.

## canvas sessions

- read the matching `practices/` file before the first paper or figma
  call.
- with no stated task, scout and report only.
  (`rules.md`, ambiguous session opener)
- in brand or print work with no codebase, the canvas file is the
  artifact: tokens, state graphs, and "the skin is always ours" still
  apply there.

## shipping

- when a surface feels done, run `studio-audit`. it combines the domain
  reviews, preflight, responsive checks, the live pass, and the craft
  critiques into one evidence-backed report with a ship, fix-first, or
  review-again verdict.
- if a Rams surface is configured and the session changed ui, offer one
  Rams review after `studio-audit` and before commit. if the operator
  accepts, load the `rams` skill; its surface and privacy rules govern.
  `rules.md` still decides which findings hold.
