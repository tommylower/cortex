---
name: tiny-app-design-system
description: Use this package when extending the Tiny App example UI. It captures derived tokens, component grammar, architecture, and platform mapping from example code.
---

# Tiny App Design System

Use this package before creating or modifying Tiny App UI.

## Read First

1. [references/tokens.md](references/tokens.md)
2. [references/architecture.md](references/architecture.md)
3. [references/components.md](references/components.md)
4. [references/platform-mapping.md](references/platform-mapping.md)

## Thesis

Tiny App uses quiet app UI: neutral surfaces, compact spacing, direct labels, and one clear action per panel.

## Hard Rules

- Use semantic tokens from `references/tokens.md`.
- New interactive components must name their behavior floor.
- Extend Button axes instead of creating one-off action components.
- Leave unresolved gaps visible.

## Component Intake

- `composition`: arrangement of existing parts
- `headless-floor`: behavior exists in a proven floor
- `novel`: write the full state machine

## Completion Bar

A UI change conforms only when it uses package tokens, maps to a component card, and keeps missing states in the unresolved list.
