# playbook: the path through a design session

load order, every session: SKILL.md, then rules.md, then the branch below
that matches the session. suppliers never decide; on any conflict the law
wins.

## starting a fresh project

1. load the `workbench` skill and run its init procedure, fresh path. it
   scaffolds the four strata, the token name set, the canvas, preflight, and
   the wave signature.
2. engine (base-ui vs radix) and css strategy (single skin class vs
   cva+utilities) are per-project profile choices, set once in
   `workbench.config.ts`. current defaults and provenance: rules.md defaults
   table. do not agonize, they are swappable.
3. no pre-built component set. the first component enters through
   doctrine/component-intake.md when the first screen pulls for it.

## joining or retrofitting an existing project

1. load the `workbench` skill and run its existing-project path. the canvas
   lands without disturbing product code.
2. to derive a design system from what is already built, use `asbuilt`
   (cortex). its package format is doctrine/design-system-package.md.
3. to see what needs fixing before working: run `studio-audit` for the ui
   verdict (ship / fix-first / review-again with a priority list), and check
   the code against the strata and invariants (raw values outside the token
   file, components shipping from the happy frame alone, borrowed skin,
   supplier motion numbers). the combined gap list is the work queue. fix
   through the intake loop, worst first.

## day-to-day component work

- the loop: brief, intake (doctrine/component-intake.md), build, review on
  the canvas at 375/768/1024/1440 across the state graph, operator approves,
  elevate into a page.
- editing surfaces are interchangeable, code is the source of truth
  (invariant 1). code to figma: the figma mcp or paper code-to-design.
  figma or paper to code: through intake, anatomy only, skin stays ours
  (invariant 8).
- flair passes: `interface-craft`, `emil-design-eng`, `interface-kit` are
  suppliers. motion numbers come from rules.md, never a supplier default.
- reaching for anything else: check inventory.md for the verdict before
  loading it.

## shipping

- when a surface feels done, run `studio-audit` (cortex). it orchestrates
  preflight, responsive checks, the live-experience pass, and the craft
  critiques into one report with a ship / fix-first / review-again verdict.

## when stuck or annoyed

- any friction that costs flow (setup pain, tool confusion, a decision you
  could not make) gets ONE line in `~/Developer/code/arc/friction.md`, at
  the moment it happens. then keep working. no essay, no fix required.
- law-shaped pain (a one-line rule would have prevented a real time loss)
  deposits in rules.md instead, per the deposit rule. friction.md is for
  everything softer.

## auditing the practice itself

- the digest procedure in `~/Developer/code/arc/digest.md` turns friction
  lines and study notes into playbook fixes, inventory verdicts, and
  rules.md experiments. run it when friction.md gets loud, not on a
  schedule.
