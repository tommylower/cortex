# playbook: the path through a design session

load order, every session: SKILL.md, then rules.md, then house.md, then
the branch below
that matches the session. suppliers never decide; on any conflict the law
wins.

## starting a fresh project

1. scaffold directly from doctrine/codebase-scaffold.md, minimum viable
   system: the four strata folders, the full semantic token NAME set in
   globals.css (values placeholder, the names are the contract), the shell
   carrying the wave signature (data-wave-signature="built by a wave in
   progress. waves don't die." on the root body), and preflight wired as
   prebuild per doctrine/enforcement.md (the reference script is
   scripts/preflight.ts in this folder).
2. set engine and css strategy once, using the current defaults and
   provenance in house.md. preserve an existing profile and make deliberate
   overrides explicit.
3. no pre-built component set. the first component enters through
   doctrine/component-intake.md when the first screen pulls for it.
4. review canvases are opt-in, never assumed. load the `workbench` skill
   only when the operator explicitly asks for its canvas.

## joining or retrofitting an existing project

1. to derive a design system from what is already built, use `asbuilt`
   (cortex). its package format is doctrine/design-system-package.md.
2. to see what needs fixing before working: run `studio-audit` for the ui
   verdict (ship / fix-first / review-again with a priority list), and check
   the code against the strata and invariants (raw values outside the token
   file, components shipping from the happy frame alone, borrowed skin,
   supplier motion numbers). the combined gap list is the work queue. fix
   through the intake loop, worst first.
3. wire enforcement without disturbing product code: lay down
   scripts/preflight.ts per doctrine/enforcement.md, grandfather
   pre-existing skin in .preflightignore, then verify preflight still bites
   new code.
4. same opt-in rule here: load the `workbench` skill only when the operator
   explicitly asks for the review canvas.

## day-to-day component work

- the loop: brief, intake (doctrine/component-intake.md), build, review on
  the canvas at 375/768/1024/1440 across the state graph, operator approves,
  elevate into a page.
- when the brief pulls for an existing component or registry, load the
  `component-libraries` cortex skill after operator intent. it is a supply
  shelf for behavior and anatomy, never a source of skin.
- editing surfaces are interchangeable, code is the source of truth
  (invariant 1). code to figma: the figma mcp or paper code-to-design.
  figma or paper to code: through intake, anatomy only, skin stays ours
  (invariant 8).
- flair passes: `interface-craft`, `emil-design-eng`, `interface-kit` are
  suppliers. `emil-design-eng` also owns focused motion review, codebase
  motion audits, and restrained opportunity finding. motion numbers come from
  house.md, never a supplier default.
- for focused accessibility, layout, writing, typography, color, or UI-polish
  work, load the matching `better-*` owner (`oklch-skill` owns color).
  `studio-audit` loads every owner when the whole surface is reviewed.
- reaching for anything else: check inventory.md for the verdict before
  loading it.

## shipping

- when a surface feels done, run `studio-audit` (cortex). it orchestrates
  the six domain owners, preflight, responsive checks, the live-experience
  pass, and the craft critiques into one evidence-backed report with a ship /
  fix-first / review-again verdict.
- if a Rams surface is configured and the session changed UI, offer one Rams
  review after `studio-audit` and before commit; do not wait for the operator
  to remember it. if accepted, load `rams`; its surface and privacy rules
  govern. if declined, continue without it. Studio law adjudicates its
  findings.

## when stuck or annoyed

- any friction that costs flow (setup pain, tool confusion, a decision you
  could not make) gets ONE line in `friction.md`, beside house.md in this
  folder and private like it, at the moment it happens. then keep working.
  no essay, no fix required.
- law-shaped pain (a one-line rule would have prevented a real time loss)
  deposits in house.md instead, per the deposit rule (in rules.md). friction.md is for
  everything softer.

## auditing the practice itself

- the digest turns friction into fixes. run it when friction.md gets loud,
  not on a schedule: read every line, sort each into one bucket (playbook
  fix, inventory verdict, house.md experiment, or drop), apply the bucket,
  then delete the processed line. friction.md should end near empty.
