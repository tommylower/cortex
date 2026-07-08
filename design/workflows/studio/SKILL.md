---
name: studio
description: Load before ANY design work (canvas or code, any project). The single front door to the design practice: the house law (rules.md grades, invariants, motion defaults), the playbook (playbook.md, what to do per situation), the inventory (inventory.md, every tool/skill/mcp and its verdict), and doctrine/ (intake, scaffold, package format), one self-contained package that travels to every project. Enforces the earned design practice: operator intent first, references for anatomy never skin, state graphs not happy frames, motion numbers in margins, second-use gate, pain-only deposits. Triggers: design work, component build, figma/paper session, ui polish, scaffold a project, starting a design session, studio law.
---

# studio

the law lives HERE, inside this skill folder — one package, every project
(law self-contained 2026-07-05, renamed studio law -> studio and made the
front door 2026-07-06, tommy's calls). nothing to chase, nothing installed
per project.

## read first, every time

paths relative to this skill's base directory:

1. `rules.md` — grades, invariants, defaults (including motion numbers)
2. `playbook.md` — the path through a session: fresh project, existing
   project, component work, shipping, stuck
3. `doctrine/component-intake.md` — how ideas and references become
   components
4. `doctrine/codebase-scaffold.md` — only when touching codebase structure
   or starting a project
5. `doctrine/design-system-package.md` — only when emitting or inheriting
   a design-system package
6. `inventory.md` — when reaching for a tool or supplier, check its
   verdict here first

deposits (one-line experiments earned through pain) land in `rules.md`
here in this folder. the learning journal (friction log + study queue)
lives at `~/Developer/code/arc/` (see playbook.md, "when stuck or
annoyed").

## the loop to enforce

1. **operator intent first.** do not open any reference before the
   operator states what the thing should do and feel like.
2. **references are anatomy-only.** shadcn / SDS / base ui / mobbin supply
   slots, variant axes, state lists, behavior floors. litmus-test anything
   crossing over: delete it — breaks behavior or api = structure, take it;
   changes look/feel only = skin, ours.
3. **deliverables are state graphs, not happy frames.** every state
   (default / hover / focus / active / disabled / loading / empty / error)
   with transitions, motion numbers written in the margins. defaults from
   rules.md.
4. **second-use gate.** nothing is componentized until it recurs.
5. **suppliers never decide.** cortex skills are catalogs; the law wins
   every conflict. motion numbers never come from a skill's defaults.
6. **no parallel records.** design decisions live in the artifact only —
   never transcribe them into docs by hand; specs are derived from
   artifacts. if a mistake costs real time, write a one-line experiment in
   rules.md at that moment. no close ritual. most sessions deposit nothing.
