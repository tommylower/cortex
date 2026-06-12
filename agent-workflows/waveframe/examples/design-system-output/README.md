# example design-system output

this is a small example of the markdown package waveframe can produce.

it is not a finished design system. it shows how the files fit together, what kind of decisions belong in each place, and how unresolved work should stay visible instead of becoming hidden assumptions.

## status

status: `draft`

this package is safe to use as a reference shape. it is not a source of truth for a real product.

## how to read this folder

start with `SKILL.md` for the agent-facing operating guide.

then use the reference file that matches the question:

- `references/tokens.md` for colors, type, spacing, radius, borders, shadows, and motion values.
- `references/architecture.md` for shell, layout primitives, responsive behavior, and file mapping.
- `references/composition.md` for how sections and surfaces are arranged.
- `references/components.md` for repeated interface parts and states.
- `references/page-structure.md` for page or screen patterns.
- `references/motion.md` for animation behavior and reduced-motion rules.
- `references/imagery.md` for image, icon, diagram, and asset treatment.
- `references/voice.md` for labels, tone, casing, and interface copy.
- `references/platform-mapping.md` for how the design system touches code.

## what this example demonstrates

- a design system can be useful before every decision is final.
- open decisions should be named directly.
- implementation mapping belongs beside design guidance, not in a separate memory.
- the package should help a human, teammate, client, or agent continue without guessing.

## example project frame

the fictional project is a compact product workspace called `northstar`.

the example assumes:

- product surface: authenticated dashboard.
- visual direction: calm, structured, editorial enough to feel considered.
- current maturity: foundation and repeated UI rules are drafted, not final.
- implementation target: React with CSS variables and Tailwind-style utility mapping.

replace this frame with the real project context when creating a live package.
