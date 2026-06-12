# Output Structure Templates

Use this mode to apply one of your private reusable output templates to a selected design system and target surface.

## Goal

Separate reusable output structure from visual styling.

```text
output template + selected design system + target surface = branded output
```

Examples:

- design-system deck template + client design system + Figma = branded editable design-system deck
- brand overview deck template + draft/client design system + Figma = branded overview deck
- product UI system board template + draft/client design system + Paper/Figma/code = reusable product interface contract
- landing-page variant template + client design system + code = landing-page implementation scaffold
- dashboard template + client design system + code = dashboard implementation scaffold

The structure library is private Cortex machinery: reusable backend scaffolds for decks, landing pages, dashboards, component libraries, and other repeatable deliverables. Do not copy structure templates into client repos unless the user explicitly asks.

## Definitions

- **Output template**: placement, slots, sequence, required sections, adaptation rules.
- **Design system**: colors, type, spacing, radius, shadows, buttons, imagery, voice, motion.
- **Target surface**: Figma, Paper, code, markdown, or another output medium.

Rule:

```text
Output template defines placement and content slots.
Design system defines visual treatment.
Design-system markdown defines content truth.
Target surface defines implementation constraints.
```

## Private library location

Reusable output templates live under:

```text
cortex/agent-workflows/waveframe/structures/
```

Current templates:

- `brand-overview-deck` — six-section brand overview board/deck.
- `design-system-deck` — visual deck representation of design-system markdown.
- `product-ui-system-board` — software UI exploration and handoff board for tokens, app shell, components, states, and workflow screens.
- `social-asset-handoff` — artwork, social, and article/CMS image template frames for client handoff.

Each output template should use:

```text
<template-name>/
├── STRUCTURE.md
└── template.json        # optional, only when useful
```

`STRUCTURE.md` is the source of truth. `template.json` is an optional machine-readable slot map. Figma/Paper files are external visual scaffolds and should be referenced from `STRUCTURE.md`.

## Placeholder rules

- Treat `[client]`, `[Client]`, and `client` in neutral template frame names or visible placeholder copy as replacement tokens.
- Replace those tokens with the selected client/project name when producing a branded output.
- Name every generated frame and section in lowercase kebab-case with the client slug first, with no spaces around hyphens: `client-social-templates`, `client-twitter-header`, `client-article-feature`.
- Do not rename the private neutral template source unless the user explicitly asks.
- Record the source template file URL and node IDs inside the structure template so future refreshes can inspect the original.

## Intake

Ask only for missing context:

- Which output template should be used?
- Which design system should be applied?
- What is the target surface: Figma, Paper, code, or markdown?
- Where is the target file/page/frame/project?
- Should this produce a new output, duplicate a neutral template, scaffold only, build full content, or refresh an existing output?

## Behavior

1. Read the chosen output template's `STRUCTURE.md`.
2. Read the selected design-system `SKILL.md` and only the relevant references.
3. Inspect the target surface if available.
4. Produce a short application plan.
5. Ask approval before writing or modifying files/frames.
6. Preserve editability in design tools: real text, shapes, frames, swatches, and components. Do not flatten into screenshots.
7. Report missing design-system content instead of inventing silently.
8. Treat code, approved design-system docs, and provided assets as the only content sources. Do not create decorative diagrams, logo variants, social layouts, merch, icons, charts, or component states unless they exist in those sources or the user explicitly asks for concept exploration.
9. Visible deck headings use sentence case with no trailing period. Preserve punctuation only inside source-backed product copy, code excerpts, captions, or body text.
10. Balance multiline text blocks. Do not leave a long first line with a short orphan line below it; adjust text-box width or insert intentional line breaks so wrapped lines feel visually even. Top explanatory copy on 1920px slides should usually sit in a narrower measure, around 760-820px, with intentional two-to-three-line breaks for dense notes.
11. Match the output type. Public-facing overview decks should be visual-first and sparse; explanatory design-system decks may include notes, source mapping, and implementation callouts.

## Figma library contract

When the target surface is Figma and the output is a reusable client deliverable, create or update the local Figma library before filling or refreshing the deck.

Build the Figma library from the selected design-system tokens, not from ad hoc colors found on frames:

- create local paint styles for the documented color tokens
- create local color variables for the same tokens
- create one variable collection named after the client or project, such as `<client>-colors`
- include light and dark modes when the design system defines both, even if the live site currently ships only one mode
- bind semantic variables to the correct mode values, such as background, foreground, inverse background, inverse foreground, border, accent, and state colors
- bind deck fills and strokes to variables instead of leaving raw hex values on final handoff frames
- preserve image fills as images; do not convert artwork, logos, screenshots, or OG images into color variables

After binding, run a Figma audit:

- all solid fills and strokes in the final handoff deck should be variable-bound
- image fills may remain unbound
- any remaining raw solid colors must be either bound to a token, promoted as a missing token, or reported as unresolved

This turns the visual handoff into a useful editable library, not just a picture of the system.

For Figma outputs:

- If the user gives a target Figma file, add the output there.
- If the user asks for a new file, create a Figma design file with the output name specified by the selected template.
- Scaffold mode creates the editable slide/frame outline and placeholders.
- Build mode fills the scaffold from the selected design system.
- Use the Figma template geometry and node IDs documented in the selected `STRUCTURE.md`.
- Library mode creates or refreshes local paint styles and variables without changing deck layout.
- Refresh mode may update deck styling from the library, but should not redesign the template structure unless the user explicitly asks.

## Adaptation rules

- Preserve template structure unless content overflow requires a documented adaptation.
- If a template expects four items but the design system provides six, adapt the grid predictably and report the change.
- If a required asset is missing, use a clearly named placeholder and flag it.
- If a template expects a visual but the source has no real asset or component, leave the slot blank or mark it as missing. Do not fill the gap with invented brand graphics.
- When documenting component states, align repeated states to a shared grid/column even when controls have different intrinsic widths.
- If target constraints conflict with the structure, ask before changing the structure.

## Adding a new template

When the user creates a reusable dashboard, deck, landing page, component-library, or other output structure, save it as:

```text
agent-workflows/waveframe/structures/<template-name>/STRUCTURE.md
```

Capture:

- purpose
- target surfaces
- required inputs
- layout contract
- slots
- design application rules
- adaptation rules
- external template sources, when any
- placeholder tokens
- done criteria

Keep the template generic. It should not contain client-specific colors, fonts, copy, or assets.
