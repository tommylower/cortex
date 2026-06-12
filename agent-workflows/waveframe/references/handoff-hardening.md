# Handoff Hardening

Use this mode after a site or app is visually finished but before extracting the formal `design-system/` handoff package.

## Goal

Turn a finished-but-messy implementation into a safer source of truth:

```text
finished UI -> repeated-pattern audit -> approved code normalization -> design-system extraction -> client handoff
```

This is the backstop for projects that were built quickly before the design system was written. The site remains the visual source of truth, but the implementation should be made repeatable enough that the extracted docs describe real reusable patterns instead of one-off accidents.

## Non-Negotiable Safety Rule

Nothing can visually or behaviorally break. Every proposed refactor must preserve the current site unless the user explicitly approves a visual change.

Prefer small internal refactors over broad rewrites.

## When to Use

Use when:

- the site is visually finished or near-finished
- no complete `design-system/` package exists yet
- components were built manually or section by section
- repeated tokens, shadows, card treatments, section spacing, button states, or motion patterns appear in code
- the user wants cleaner reusable implementation before Figma/deck/client handoff

Do not use for early brand exploration. Use `design-system-synthesis` then.

## Audit Targets

Inspect:

- global CSS variables, Tailwind theme tokens, CSS custom properties
- repeated inline styles
- repeated card shells, borders, shadows, radii, and surface treatments
- section wrappers, max widths, padding, grid gaps, responsive rules
- button/link variants and hover/focus/active states
- labels, badges, chips, metadata rows
- repeated visual primitives: icons, masks, cursor rules, SVG treatments, diagrams
- repeated motion timings, easing, scroll triggers, hover replay logic
- repeated empty/loading/error states
- docs that disagree with current code

Use Cortex design skills as private audit lenses when relevant: UI principles, responsive craft, CSS interaction tips, motion, loading states, preflight, and project-owned design-system skills. Do not make the proposal depend on the source-skill name. State the code evidence and the project-specific normalization.

## What Counts as a Good Refactor

Good:

- extracting a repeated card shell into a component
- moving repeated section spacing into a shared wrapper or token
- consolidating identical shadows/borders into CSS variables or utility classes
- unifying button variants that already behave the same
- replacing repeated inline style objects with named constants or primitives
- documenting intentional exceptions

Bad:

- redesigning components during cleanup
- changing copy, layout order, spacing rhythm, or breakpoints without approval
- abstracting patterns used only once
- creating generic primitives that hide important brand-specific decisions
- introducing a component library migration during handoff cleanup

## Proposal Format

Before editing, report a table:

| Area | Evidence | Proposed normalization | Risk | Verification |
| --- | --- | --- | --- | --- |
| Card shadows | `WhyCard`, `PlanCard`, `TrustNote` repeat `0 2px 8px...` | promote to token/class | low | screenshot compare + build |

For each proposal, include:

- exact files involved
- whether the visual output should be identical
- why it improves future design-system extraction
- verification command or screenshot check

Wait for approval before changing code.

## Implementation Workflow

1. Inventory repeated visual patterns.
2. Separate safe normalizations from real design changes.
3. Present proposals and risk levels.
4. Apply only approved normalizations.
5. Run build/lint/typecheck as available.
6. Use browser or screenshots for risky visual surfaces when possible.
7. Record what changed in `.waveframe/extraction.md` or `.waveframe/hardening.md`.
8. Run `design-system-extract` from the normalized code.

When a normalization comes from a reusable craft rule, record the source influence privately:

```text
- Source influence: cortex/design/motion/css-interaction-tips
  Code evidence: duplicated hover transitions in CardGrid and PricingCard.
  Normalization: shared `.interactive-card` transition token and focus state.
  Client-facing rule: documented as project interaction behavior, not source attribution.
```

## Done Criteria

- repeated implementation patterns are either normalized or explicitly documented as intentional one-offs
- site behavior and visual output remain stable
- design-system extraction can point to real reusable tokens/components
- source influences are logged privately when useful and translated into project-local rules for handoff
- stale docs and unresolved drift are listed before handoff
- client-facing `design-system/` is generated only after approved normalization or after the user chooses to skip cleanup
