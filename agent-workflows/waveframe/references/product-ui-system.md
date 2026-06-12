# Product UI System

Use this mode when a software product, portal, dashboard, or internal tool is being designed from first principles and needs a repeatable UI system before implementation.

## Goal

Turn exploration work into a base software UI design-system scaffold without changing the product code until the user explicitly asks.

This mode sits between loose visual exploration and implementation:

```text
color/type exploration -> product UI system scaffold -> component/shell exploration -> implementation mapping -> code
```

It is not post-delivery extraction. It is the working contract that lets Claude, Codex, and future agents continue the system consistently.

## Use When

- the user is finishing color exploration for a product UI
- the user wants Claude to keep building a product UI system from a Paper/Figma file
- the target is a portal, dashboard, internal tool, workflow console, authenticated app, or SaaS product surface
- the next step is scaffolding tokens, semantic roles, states, and product UI lanes before coding
- the user wants to avoid painting colors directly into code before the design system is stable

Do not use this mode for a marketing-only brand overview. Use `brand-overview-deck` or `design-system-synthesis` instead.

## Inputs

Read only what is relevant:

- Paper/Figma color board or visual exploration
- product repo path, only to understand stack and current mapping
- existing `globals.css`, Tailwind config, theme files, or token files
- existing README/AGENTS/design docs
- current product surface type: portal, dashboard, workflow console, internal app, or mixed
- explicit user rules about what not to change

If a product repo is provided, inspect it only for structure and current implementation targets. Do not edit it unless the user explicitly asks.

## Color Completion Criteria

A color exploration is ready for first-pass product UI scaffold when it has:

- raw color values for the core neutral scale
- raw color values for the primary/accent scale
- state colors for at least success, warning, error, and info, or explicit open decisions for missing states
- notes that separate raw values from component usage
- enough contrast guidance to know which colors can be used for text, fills, borders, dots, and indicators
- a target implementation format such as CSS variables, Tailwind v4 `@theme`, design tokens, or another platform mapping

It is not ready for product UI implementation until it also has:

- semantic aliases for background, surface, border, text, muted text, accent, focus, selected, disabled, success, warning, danger/error, info, blocked, pending, verified, and inverse
- explicit rules for state color usage
- at least small probes for buttons, chips, status dots, inputs, records, and alerts
- open questions listed before code starts

## Workflow

### 1. Audit the visual source

Capture:

- source file and frame
- current status: `exploration`, `draft`, `partial`, or `ready`
- raw ramps and stop counts
- named intent from the board
- missing semantic roles
- conflict with existing code tokens, if any

Do not rename colors or change values during audit unless the user asks.

### 2. Split brand and product lanes

Brand/marketing lane:

- palette usage for public pages, hero, logo, social, and CTA moments
- brand overview deck readiness
- unresolved visual brand slots

Product UI lane:

- app surface roles
- state roles
- density and border language
- component readiness
- workflow state coverage
- code mapping implications

If a color belongs only to product state, do not let it become marketing decoration. If a marketing hero treatment exists, do not turn it into app shell rules without approval.

### 3. Map semantic roles

Use this starting role set:

```text
background
surface
surface-raised
row
row-hover
border-subtle
border-strong
text
text-muted
text-inverse
accent
accent-muted
focus
selected
disabled
success
warning
danger
info
blocked
pending
verified
inverse-background
inverse-foreground
```

Map only stable roles. Mark the rest unresolved.

### 4. Run contrast and usage checks

Check the likely pairs:

- text on background
- muted text on background
- text on surface
- inverse text on inverse background
- accent text on background
- text on accent fill
- state text on state tint
- ink/text on state tint
- border on background
- focus ring on background and surface

Write conclusions as usage rules, not just pass/fail numbers.

Example:

```text
Primary 500 is safe as a fill/dot/tick, not small text on the app background.
Use ink text on Primary 500 if a filled primary accent surface is approved.
```

### 5. Scaffold the product UI system board

Use:

```text
agent-workflows/waveframe/structures/product-ui-system-board/STRUCTURE.md
```

If colors are the only stable source, build or plan only:

- Foundation tokens
- Semantic roles
- Open decisions

Leave app shell, components, records, and workflow screens as next exploration slots.

### 6. Prepare markdown mapping

When approved, write or update:

```text
design-system/
├── SKILL.md
└── references/
    ├── tokens.md
    ├── architecture.md
    ├── composition.md
    ├── components.md
    ├── page-structure.md
    ├── motion.md
    ├── voice.md
    └── platform-mapping.md
```

For product UI, `page-structure.md` means screen and workflow structure. It does not mean marketing page sections.

### 7. Prepare code mapping, not code changes

For Tailwind v4 products, the likely first implementation target is:

```text
src/app/globals.css
```

Preferred order:

1. raw scale variables
2. semantic alias variables
3. Tailwind `@theme inline` mappings
4. primitive class recipes only after aliases are stable
5. React components only after primitive recipes are stable

Do not apply this order to the repo until the user explicitly asks.

## Outputs

Before writing anything, propose:

- source material read
- current color readiness status
- brand lane status
- product UI lane status
- proposed scaffold files or board sections
- unresolved semantic roles
- explicit non-actions, especially code changes not being made

Private process outputs may include:

```text
.waveframe/product-ui-color-audit.md
.waveframe/product-ui-scaffold-plan.md
.waveframe/decisions.md
```

Client/project-facing outputs, only after approval:

```text
design-system/SKILL.md
design-system/references/tokens.md
design-system/references/platform-mapping.md
```

Add the remaining reference files only when there is real source-backed guidance for them.

## Claude Handoff

When handing off to Claude, include:

- exact source frame or file
- target repo path, if code mapping matters
- what is stable
- what is unresolved
- what Claude may write
- what Claude must not touch
- next exploration section to build
- Cortex files to read

Minimal handoff shape:

```text
Read:
1. cortex/agent-workflows/waveframe/SKILL.md
2. cortex/agent-workflows/waveframe/references/product-ui-system.md
3. cortex/agent-workflows/waveframe/structures/product-ui-system-board/STRUCTURE.md

Task:
Audit the selected color system as product UI foundation. Do not change product code.

Produce:
- color readiness audit
- semantic role map
- unresolved roles
- next product UI board sections
- proposed design-system markdown mapping
```

## Done Criteria

- color work is classified as `exploration`, `draft`, `partial`, or `ready`
- brand and product lanes are separated
- stable raw scales are captured
- semantic roles are mapped or marked unresolved
- contrast/use rules are documented for text, surfaces, accents, and states
- next product UI board sections are clear
- code mapping target is identified without changing code
- Claude can continue the system from the handoff without guessing
