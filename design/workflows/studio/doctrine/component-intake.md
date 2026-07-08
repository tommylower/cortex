# component intake

how an idea or reference becomes a component. entered 2026-07-04 from the
project-a design pass (use #1, in progress). grades per rules.md; nothing
here is law until it survives a second project.

## the three-layer model — DEFAULT

every component is three layers:

1. **behavior floor**: headless machinery (radix, base ui, react-aria).
   keyboard, focus, aria, the open/close state machine. inherited, never
   redrawn, never "improved" on canvas.
2. **grammar**: slot anatomy, closed variant axes, semantic token names,
   the state list. this is what references are for.
3. **skin**: color, radius, type, motion, density values. always ours.

references (shadcn, SDS, base ui docs, mobbin) are consulted for anatomy,
never skin. shadcn itself is mostly one-line wrappers: headless primitive
plus a class string. the import is layer 1, the file structure is layer 2,
the class string is layer 3.

## the litmus test — DEFAULT

when unsure whether something crosses over from a reference: delete it.

- breaks behavior or the api shape -> structure. take it.
- changes look or feel only -> skin. ours.

## three buckets for a new idea — DEFAULT

- **composition**: a new arrangement of parts we have. most ideas land
  here (the ai chat box = scroll area + textarea + button + styled bubbles).
- **behavior exists headless**: shadcn is ~40 curated things; the floor
  underneath (base ui, radix, react-aria) is much bigger. take the floor,
  skin it in our tokens.
- **genuinely novel**: no floor exists (border trails, streaming text,
  custom data-viz). we own all three layers and write the state machine.
  the grammar still applies in full: slots, axes, state graph, tokens,
  motion numbers. not an exception, just more work.

two failure modes, both named from real damage:

- rebuilding bucket-2 behavior by hand. loses keyboard/aria silently.
- building bucket-3 without the grammar. happy frame, hardcoded values,
  can't survive dark mode or port to code.

## the per-component loop — DEFAULT

1. operator intent stated first. no reference opened before it.
2. dissect the real source (ui/*.tsx or the headless docs) for anatomy
   only: slots, axes, states, behavior guarantees.
3. state graph on canvas: every state as a variant or board, fills bound
   to tokens, motion numbers written in the margin (defaults in rules.md).
4. port to code as a diff: cva strings + tokens + motion change; the
   behavior floor is untouched. two contracts: behavior inherited, skin
   owned.

the second-use gate governs promotion: patterns stay styled frames until
they recur. (a shadcn-mirror set is exempt when the code already uses each
primitive many times; second use is pre-proven.)

## the interface rule — DEFAULT

cortex skills are supplier catalogs. this doctrine is house law. conflicts
resolve to the law. motion numbers come from margins/rules.md, never from
a skill's defaults.

## record-keeping — DEFAULT

design decisions are never hand-transcribed anywhere. they live in the
artifact (figma file, codebase) and enter records only when a spec is
derived from the artifact. process rules (how we work, not what we made)
get one line in rules.md at the moment a mistake costs real time. nothing
writes on a timer or a ritual.

## invariant candidates — RESOLVED 2026-07-04

both entered law in rules.md: "never rebuild behavior that already exists"
merged into invariant 4; "the skin is always ours" is invariant 8.
