# report-design

`report-design` is an extracted marketing-site design system for a report style brand surface: cream paper, ink frame, square geometry, hairline structure, and red used only as signal or action.

Use it as an example of a runtime-backed system. It documents the actual implementation patterns an agent would need to preserve or recreate the site, not just visual preference.

## what it contains

- `SKILL.md` — operating brief, core rules, shell pattern, and reference map
- `references/tokens.md` — semantic color, type, spacing, border, and shadow rules
- `references/architecture.md` — page shell, frame, gutters, section chrome, and route structure
- `references/composition.md` — section rhythm and layout patterns
- `references/components.md` — reusable UI behavior and component rules
- `references/motion.md` — loader, reveal, marquee, and interaction motion
- `references/imagery.md` — brand marks, illustration treatment, and image usage
- `references/voice.md` — tone, vocabulary, and copy constraints
- `references/platform-mapping.md` — CSS variables, Tailwind mapping, runtime files, and metadata

## how to use it

Use this when the requested direction needs an editorial report surface: framed pages, visible structure, precise rules, restrained motion, and one strong signal color.

With waveframe, this is closest to an extracted finished-code package. It shows the kind of detail a handoff should preserve: shell anatomy, token mapping, component behavior, motion rules, and the project decisions behind them.

## important note

Some references name runtime files from the original implementation. Treat those as mapping examples. In a new project, translate the same rule into the target repo's file structure instead of assuming those files already exist.
