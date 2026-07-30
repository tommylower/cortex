# playbook: the path through a design session

load order, every session: SKILL.md, then rules.md, then the branch below
that matches the session. suppliers never decide; on any conflict the law
wins.

## starting a fresh project

1. load the `workbench` skill and run its init procedure, fresh path. it
   scaffolds the four strata, the token name set, the canvas, preflight, and
   the wave signature.
2. set engine and css strategy once in `workbench.config.ts`, using the
   current defaults and provenance in rules.md. preserve an existing profile
   and make deliberate overrides explicit.
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
  rules.md, never a supplier default.
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
