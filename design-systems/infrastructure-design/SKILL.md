---
name: infrastructure-design
description: Institutional technical marketing-site design system. Use for dark-mode product marketing, compliance/infrastructure positioning, precise hairline composition, diagrammatic motion, and sparse signal-color interaction.
---

# Infrastructure Design System

Status: ready for handoff extraction; keep synced with code.

Use this design system for infrastructure-style technical marketing-site work.



## Source Of Truth

The current implementation is the source of truth:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/*`
- `src/app/*/page.tsx`

Handoff surfaces should visualize this system, not replace it. Keep copies free of private project links and client-specific file names.

## Design Thesis

This system was extracted from an institutional crypto compliance infrastructure site. The UI should feel sharp, technical, and operational: dark ink, paper text, precise hairlines, square geometry, sparse green signal, and diagrammatic motion.

The system avoids soft SaaS decoration. No rounded cards, decorative blobs, casual gradients, or ornamental shadows. Depth is subtle and functional.

## Core Rules

- Dark mode is the default site mode.
- Use two primary surface colors: ink and paper.
- Use brand green as signal, action, focus, and active-state color.
- Use module accents only as small signals, never broad backgrounds.
- Keep corners square.
- Prefer hairline borders over filled card decoration.
- Display type is F37 Grotesc. Dense supporting text is IBM Plex Mono.
- Use real implemented primitives before inventing new ones.
- Respect reduced-motion behavior.

## References

- `references/tokens.md`
- `references/composition.md`
- `references/page-structure.md`
- `references/architecture.md`
- `references/components.md`
- `references/motion.md`
- `references/imagery.md`
- `references/voice.md`
- `references/platform-mapping.md`
