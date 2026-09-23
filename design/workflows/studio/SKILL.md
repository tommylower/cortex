---
name: studio
description: The house practice for design and front-end product work. Load before any design, UI, component, canvas (Paper, Figma), or project-scaffolding work, in any project. Holds the rules (invariants and defaults, including motion numbers), the per-situation playbook, tool practices for Paper, Figma, print, and front-end builds, the verdict on every design skill and tool, and the doctrine for component intake, scaffolding, and enforcement.
---

# studio

the house practice for design and front-end product work: the rules, the
path through a session, what each tool is trusted for, and the tool
mechanics that were paid for. one package for every project. every file it
points to is in this folder; other skills are named, never linked by path.

## what to read

paths are relative to this skill's folder.

- **every session:** `rules.md` (the law), then `playbook.md` (the path
  for this kind of session).
- **before the first call to a tool:** its practices file.
  - `practices/paper.md`: the paper canvas
  - `practices/figma.md`: figma, figjam, and the figma mcp
  - `practices/print-and-assets.md`: image processing, pdf and print output
  - `practices/front-end.md`: building, serving, and verifying front-end code
- **when the session needs it:**
  - `doctrine/component-intake.md`: turning an idea or reference into a component
  - `doctrine/codebase-scaffold.md`: starting a codebase or changing its structure
  - `doctrine/enforcement.md`: wiring the prebuild gate (`scripts/preflight.ts`), declaring a project's `design.config.ts`, or judging a boundary violation
  - `inventory.md`: before reaching for any other skill, mcp, or tool
- **emitting or inheriting a design-system package:** use the `asbuilt`
  skill. it owns the package format.

## the loop

1. **operator intent first.** open no reference before the operator says
   what the thing should do and feel like.
2. **references give anatomy, never skin.** shadcn, base ui, and mobbin
   supply slots, variant axes, state lists, and behavior floors. when
   unsure, delete it: if that breaks behavior or the api, it is structure,
   so take it; if it only changes look or feel, it is skin, and skin is
   ours.
3. **deliverables are state graphs, not happy frames.** every state
   (default, hover, focus, active, disabled, loading, empty, error) with
   its transitions, and motion numbers from `rules.md` written in the
   margins.
4. **second-use gate.** nothing becomes a component until it recurs.
5. **suppliers never decide.** other skills are catalogs, and `rules.md`
   wins every conflict.
6. **decisions live in the artifact.** never transcribe design decisions
   into docs. when a mistake costs real time, add a row where
   `rules.md` says to.
