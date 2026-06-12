# Product UI System Board

## Purpose

Working design-system board for software products, portals, dashboards, and internal tools.

Use this when the design work is still being built from first principles and the output needs to help agents continue the product UI system, not merely present a finished brand. This board captures stable interface decisions as they emerge: tokens, density, shell, component grammar, states, and workflow screens.

This is different from a brand overview deck:

- Brand overview is public-facing, sparse, and visual-first.
- Product UI system board is implementation-facing, stateful, and component-first.
- Brand overview can show one representative component.
- Product UI system board documents the repeatable component system and the screen grammar that code should follow.

## Target surfaces

- Paper for quick collaborative exploration and agent-native drafts.
- Figma for editable design-system handoff and component library work.
- Markdown for source-of-truth design-system docs.
- Code only after the user explicitly asks to implement or scaffold product UI.

## Required inputs

- client or product name
- selected design system or draft design-system notes
- current color/type exploration, if available
- target Paper/Figma file, page, and frame when building visually
- product surface type: portal, dashboard, app, internal tool, workflow console, or mixed
- current status: `exploration`, `draft`, `partial`, or `ready`
- optional code repo path, only when mapping to implementation

## Layout contract

Default board sequence:

1. Foundation tokens
2. Semantic roles
3. Typography and metadata language
4. App shell and navigation
5. Surface and panel system
6. Buttons and actions
7. Inputs and forms
8. Status and state indicators
9. Tables, lists, and records
10. Workflow screen patterns
11. Empty, loading, error, blocked, and success states
12. Motion and interaction behavior
13. Accessibility and responsive behavior
14. Platform mapping
15. Open decisions and next exploration

Preserve this order unless the user asks for a smaller board. If the source only contains colors, build only the first two sections and leave the later sections as explicit next-step slots in the application plan, not invented final content.

## Naming contract

In generated branded copies, rename the parent frame and section frames with a short product slug:

```text
<product>-product-ui-system
<product>-foundation-tokens
<product>-semantic-roles
<product>-type-and-metadata
<product>-app-shell
<product>-surfaces
<product>-actions
<product>-forms
<product>-status
<product>-records
<product>-workflow-screens
<product>-system-states
<product>-motion
<product>-responsive-a11y
<product>-platform
<product>-open-decisions
```

Use lowercase kebab-case for layer and frame names. Visible headings should be sentence case.

## Slots

Each section may include:

- short role statement
- token swatches or type specimens
- component anatomy
- state matrix
- usage rules
- anti-patterns
- implementation notes
- open questions

Keep visible notes short. Put dense source mapping and rationale in design-system markdown or private `.waveframe/` notes.

## Design application rules

- Structure controls section order and required slots.
- Design-system markdown controls content truth.
- Current visual exploration supplies evidence, not final law.
- Target surface controls implementation constraints.
- Product UI boards may include visible annotations, unlike brand overview decks.
- Do not invent final components from colors alone.
- Do not turn marketing hero treatments into product shell rules without explicit approval.
- Document semantic color roles before component styling: background, surface, raised surface, border, text, muted text, accent, focus, selected, success, warning, danger, blocked, pending, verified.
- Treat status and workflow states as first-class UI tokens, not decoration.
- For app products, record information density, default row height, panel padding, border weight, radius, shadow/elevation policy, and state emphasis rules.
- For actions, distinguish primary, secondary, quiet, destructive, submit, icon-only, and disabled behavior.
- For inputs, include label position, help text, validation, required/optional treatment, focus ring, error state, and disabled/read-only state.
- For records, include table/list density, row hover, selected row, empty row, sort/filter affordances, and bulk action placement.
- For workflow screens, capture the reusable screen grammar: entry state, in-progress state, review state, blocked state, approved state, final state.
- Use real text, frames, shapes, swatches, and components in design tools. Do not flatten final handoff into screenshots.
- When documenting component states, align repeated states to a shared grid/column even when controls have different intrinsic widths.

## Markdown mapping

When this board feeds a project-local or Cortex design system, write decisions into:

```text
design-system/
├── SKILL.md
└── references/
    ├── tokens.md              # colors, type, spacing, radius, borders, shadows
    ├── architecture.md        # app shell, nav, layout primitives, responsive strategy
    ├── composition.md         # density, panel rhythm, hierarchy, surface relationships
    ├── components.md          # buttons, forms, chips, tables, cards, nav, state anatomy
    ├── page-structure.md      # product screens and workflow sequence, not marketing sections
    ├── motion.md              # transitions, hover, focus, loading behavior
    ├── voice.md               # labels, casing, metadata copy, empty/error copy
    └── platform-mapping.md    # framework, CSS variables, token files, component paths
```

Use `page-structure.md` for screen and workflow structure in product UI systems. Do not treat it as a marketing sitemap unless the target surface is a marketing site.

## Color exploration workflow

When the user is still exploring colors:

1. Capture raw swatches and names as visual evidence.
2. Map only stable colors to semantic roles.
3. Mark unresolved roles directly: missing focus, selected, warning, success, danger, blocked, disabled, and inverse states.
4. Test candidate colors against interface jobs: text, border, panel, active state, destructive, subtle accent, and high-priority alert.
5. Do not create full component rules until the semantic roles are credible.
6. Record what changed since the last exploration pass.

## Audit workflow

After a color exploration pass, audit both lanes separately.

Brand and marketing lane:

- brand overview deck has actual palette tokens
- marketing deck does not accidentally inherit product-only states
- color usage supports hero, social, logo, and public CTA needs
- unfinished brand slots are blank or clearly marked outside final visible output

Product UI lane:

- semantic roles exist for app surfaces and workflow states
- token names are implementation-safe
- state colors are not overloaded as decoration
- buttons, chips, status dots, inputs, records, and shell rules have enough guidance for the next build step
- open decisions are listed before implementation starts

## Adaptation rules

- If the visual source contains only palette and small component samples, produce a foundation-plus-component-start board.
- If the visual source contains real screens, add workflow screen patterns and shell guidance.
- If the source contains code, map components to actual paths and token files.
- If a required product state is absent, flag it as unresolved instead of inventing it.
- If the selected design system conflicts with the board, report the conflict and ask which should win before writing.

## Done criteria

- Board separates brand/marketing usage from product UI usage.
- Color decisions are mapped to semantic product roles, not just swatches.
- Product UI sections distinguish foundation, components, shell, states, and workflows.
- Missing product states and unresolved design decisions are listed.
- Design-system markdown mapping is clear enough for an agent to continue exploration or implementation.
- No project-d-specific names, colors, copy, or product claims are baked into this reusable template.
