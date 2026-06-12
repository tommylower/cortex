---
name: northstar-design-example
description: example agent-readable design-system package produced by waveframe.
---

# northstar design example

status: `draft`

use this package as an example of how a waveframe output can guide future design and implementation work.

## role

this design system captures the stable parts of a fictional product interface:

- restrained color roles.
- compact dashboard layout.
- simple reusable components.
- direct voice.
- implementation mapping for CSS variables and component paths.

it also keeps unresolved decisions visible so future work knows what not to invent silently.

## core direction

northstar should feel like a focused workspace: quiet, legible, structured, and quick to scan.

the interface should favor practical density over presentation. do not use oversized marketing sections, decorative gradients, or card-heavy page composition unless a specific surface calls for it.

## hard rules

- use semantic color roles from `references/tokens.md` instead of raw values in components.
- keep dashboard surfaces compact and aligned to a clear grid.
- treat cards as repeated items or tools, not as wrappers around entire page sections.
- keep primary actions obvious but not loud.
- document open decisions instead of filling gaps with one-off styling.

## reference index

- `references/tokens.md` - foundation values and semantic roles.
- `references/architecture.md` - shell, layout primitives, and responsive strategy.
- `references/composition.md` - surface hierarchy and section rhythm.
- `references/components.md` - component variants, states, and usage rules.
- `references/page-structure.md` - screen patterns and workflow order.
- `references/motion.md` - interaction motion and reduced-motion behavior.
- `references/imagery.md` - image and icon rules.
- `references/voice.md` - tone, labels, and UI copy.
- `references/platform-mapping.md` - code mapping and implementation targets.
