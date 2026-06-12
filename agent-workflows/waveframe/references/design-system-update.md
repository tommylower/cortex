# Design System Update

use this mode when recent work changed the direction and the project record needs to catch up.

## goal

capture what changed, what stuck, and what should carry forward without turning every experiment into permanent doctrine.

## use when

- a page, deck, board, or prototype introduced a useful decision
- code now reflects a pattern that docs do not mention
- a visual direction shifted during implementation
- a client or collaborator approved a choice that was previously open
- a case study or handoff needs the story behind the work

## inputs

read only what is relevant:

- changed files
- recent screenshots or visual outputs
- `.waveframe/decisions.md`
- previous project docs
- comments, notes, or approval messages
- the built page, deck, board, or artifact

## output choices

write the smallest useful update:

- `.waveframe/decisions.md` for process memory
- `README.md` for human project context
- `AGENTS.md` for collaborator or agent operating rules
- `design-direction/` for lightweight project guidance
- `design-system/` only when the decision is stable enough to become reusable
- case-study notes when the work needs to be explained publicly

## workflow

1. list the changed decisions.
2. separate experiments from decisions that actually stuck.
3. identify the destination for each stable decision.
4. preserve source context when it helps future work understand why the decision exists.
5. ask before changing client-facing, public-facing, or canonical docs.
6. update only the sections that need to change.
7. list unresolved questions instead of pretending the direction is final.

## done criteria

- stable decisions are recorded where future work will find them.
- experiments remain in local notes unless promoted.
- old docs no longer contradict the current work.
- the update explains why the decision matters, not only what changed.
