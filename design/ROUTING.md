# Design Routing

Use this before choosing a design skill. The goal is predictable routing: pick the shelf by the user's job, then load the named skill.

## First Choice

| User Need | Skill |
| --- | --- |
| General layout, spacing, typography, section rhythm | `ui-principles` |
| Responsive build or mobile fix | `responsive-craft` |
| Loading, pending, empty, skeleton, progress state | `loading-states` |
| Reference-site pattern inspiration | `reference-patterns` |
| Color conversion, palette, contrast, Tailwind OKLCH | `oklch-skill` |
| Gradient construction or glow effect | `gradients` |
| React animation with Framer Motion | `framer-motion` |
| Native route/shared-element transitions | `view-transitions` |
| Name an unknown motion effect | `animation-vocabulary` |
| Sound feedback | `interface-sound` |
| UI polish, taste, interaction feel | `emil-design-eng` |
| Storyboard animation, DialKit-oriented tuning, critique | `interface-craft` |
| Small CSS interaction fix | `css-interaction-tips` |
| Static final UI/a11y/AI-slop pass | `preflight` |
| Live full-site UX audit | `wip-senior-audit` |
| Browser annotation review with Agentation | `agentation-self-driving` |
| Paper / paper.design canvas work | `paper` |
| External Rams review command | `rams` |
| Opt-in Swiss, Nothing, or Muller-Brockmann system | `design/systems/*` |
| Extract/conform a design-system package from code | `asbuilt` |
| Bring in shadcn-compatible animated components | `fluid-functionalism` |
| Figma, Wiretext, Shader Lab, overlays, text measurement | `design/tools/*` |

## Shelf Meanings

- `foundations/`: baseline principles and layout workflows used by many designs.
- `color/`: color math, palettes, gradients, and token color decisions.
- `motion/`: animation primitives, transition APIs, vocabulary, and sound.
- `craft/`: taste, polish, critique heuristics, and interaction quality.
- `review/`: explicit audit and annotation workflows.
- `systems/`: opt-in visual systems; never auto-apply.
- `workflows/`: end-to-end design-system operations.
- `kits/`: component-kit or registry-backed UI systems.
- `tools/`: installable helpers, MCPs, overlays, and packages.

## Rules

- Do not use `systems/` unless the user asks for that named style.
- Do not use `tools/` when the user only needs judgment; use `craft/` or `review/`.
- Use `review/` when the requested output is findings, annotations, scorecards, or a design-audit report.
- Use `craft/` when the requested output is better code, better interaction feel, or a critique heuristic.
