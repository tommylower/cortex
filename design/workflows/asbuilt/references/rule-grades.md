# Rule Grades

Every design-system rule has a strength. Promote only with evidence.

## Strengths

- **experiment**: tried on one surface or project; free to remove.
- **default**: current preference; used unless the target gives a reason not to.
- **invariant**: earned law; stable across real projects.

Boundary rules such as names, contracts, and vocabulary survive migrations better than implementation preferences such as a specific library or CSS strategy.

## Current Invariants

1. Code is the source of truth. Canvas tools and design files are spec surfaces.
2. A component is a state machine. No component ships from the happy frame alone.
3. One token vocabulary everywhere. Semantic names are shared; values may differ by brand.
4. Never rebuild behavior that already exists. Keyboard, focus, and aria come from a proven engine.
5. The system trails the work. Build nothing the current screen does not pull.
6. Rules are earned. Borrowed rules enter as experiments.
7. Attention is scarce. One loud visual event per screen.
8. The skin is always ours. Anatomy may be borrowed; look and feel never is.

## Current Defaults

- Behavior engine: choose per project, commonly Radix, Base UI, React Aria, or existing local primitives.
- CSS strategy: follow the project. Do not force Tailwind, CSS variables, `@theme`, or CVA where the codebase has another standard.
- Motion numbers: derive from the target code and package tokens. If inventing proposals, label them proposals.
- Canvas tool: Figma, Paper, or code may be the spec surface. Code wins once implemented.

## Deposits

Add a new rule only when a mistake costs real time and one line would have prevented it. Process rules belong here; design decisions belong in the derived package.
