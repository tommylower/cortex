---
name: project-design-system
description: Use this package when extending or auditing {{project_name}} UI. It captures the derived tokens, component grammar, architecture, and platform mapping from the shipped code.
---

# {{project_name}} Design System

Use this package before creating or modifying UI for `{{project_name}}`.

## Read First

1. [references/tokens.md](references/tokens.md)
2. [references/architecture.md](references/architecture.md)
3. [references/components.md](references/components.md)
4. [references/platform-mapping.md](references/platform-mapping.md)

## Thesis

{{design_thesis}}

## Hard Rules

- Code is the source of truth.
- New components enter through the component intake rule in `references/components.md`.
- Use existing semantic tokens before proposing new ones.
- Reuse a behavior floor when one exists.
- Do not copy skin from external references.
- Record unresolved decisions instead of hiding them.

## Anti-Patterns Seen In The Code

- {{anti_pattern}}

## Component Intake

Before adding a new component, classify it:

- `composition`: an arrangement of existing parts
- `headless-floor`: behavior exists in a proven floor; skin it with project tokens
- `novel`: no floor exists; write the full state machine

## Completion Bar

A UI change conforms only when:

- it uses semantic tokens or records a proposed token
- it names the component bucket
- every state is represented
- motion numbers come from this package or the code
- build/lint/test commands listed in `AGENTS.md` pass, or failures are documented
