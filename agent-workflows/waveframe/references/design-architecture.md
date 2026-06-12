# Design Architecture

Use this mode to synthesize 1-4 visual, structural, or component references into approved design-system guidance.

## Goal

Translate visual or structural evidence into reusable implementation guidance before code is scaffolded. This is the sibling to design-system synthesis:

- `design-system-synthesis` captures brand foundation: colors, type, buttons, radius, shadows, composition, imagery.
- `design-architecture` captures structural implementation: shell rules, layout primitives, grid behavior, section structure, component construction patterns, SVG/CSS geometry, responsive strategy, and anti-patterns.

Do not write code by default. Produce the synthesis brief first, ask approval, then write the approved guidance into the correct `design-system/references/` file for the scope.

This command is a synthesis workflow, not a fixed destination.

## Phase gate

Before synthesizing, identify the phase and confirm the destination. Do not continue if the phase is ambiguous.

Use one of these phases:

| Phase | What is being decided | Usual destination |
| --- | --- | --- |
| `shell-system` | App frame, chrome, rails, nav row, body well, persistent layout surfaces | `references/architecture.md` |
| `section-structure` | Reusable section primitives before copy is mapped, e.g. hero structure, card row, proof band, FAQ shell | `references/architecture.md` or `references/composition.md` |
| `component-pattern` | Buttons, cards, labels, nav items, inputs, states, component anatomy | `references/components.md` |
| `page-content-map` | Approved sitemap or wireframe content order, content slots, CTA hierarchy, page copy structure | `references/page-structure.md` |
| `motion-system` | Motion recipes, timing, transitions, interaction animation | `references/motion.md` |
| `imagery-system` | Photo, illustration, icon, diagram, overlay, crop/framing treatment | `references/imagery.md` |

Phase rule:

```text
Current phase:
Source:
Destination:
Not doing:
```

If the user says they are not mapping content yet, do not create or promote `page-structure.md`. Keep private content-map drafts private until the user explicitly approves promotion.

Use the scope to choose the destination:

| Scope | Destination |
| --- | --- |
| Shell, frame, app chrome, grid system, layout primitives, SVG/CSS geometry, implementation constraints | `references/architecture.md` |
| Approved sitemap, page flow, section order, content hierarchy, CTA hierarchy, section slots | `references/page-structure.md` |
| General layout rhythm, density, visual composition rules, recurring surface relationships | `references/composition.md` |
| Buttons, cards, nav items, labels, inputs, reusable UI parts, states | `references/components.md` |
| Motion patterns, transitions, timing, interaction animation | `references/motion.md` |
| Image, illustration, icon, texture, diagram, overlay, crop/framing treatment | `references/imagery.md` |
| Voice, labels, casing, interface copy patterns | `references/voice.md` |

If a reference file does not exist, propose creating it. Do not invent older WIP files such as `primitives.md`, `variants.md`, or `page-moments.md` unless the user explicitly asks for that migration.

## Inputs

Use:

- 1-4 screenshots or reference URLs
- existing Paper/Figma frames
- current project design-system docs
- user notes about what to borrow or avoid

Ask what design system or project this should attach to if unclear. Ask what scope is being synthesized when the destination is ambiguous.

## Output location

Write the approved synthesis to one or both:

```text
cortex/local/<client-name>-design/references/<destination>.md
<client-repo>/design-system/references/<destination>.md
```

## Brief structure by destination

For `architecture.md`, produce:

```text
# Architecture

## Visual language summary
## Layout system
## Reusable primitives
## Token implications
## Responsive strategy
## SVG/CSS geometry rules
## Interaction surfaces
## Anti-patterns
## Proposed component/file structure
## Implementation prompt
```

For `page-structure.md`, produce:

```text
# Page Structure

## Source of truth
## Page goals
## Section order
## Section purposes
## Content slots
## CTA hierarchy
## Reusable section candidates
## Responsive collapse notes
## Open questions
## Implementation prompt
```

For `components.md`, produce:

```text
# Components

## Component scope
## Anatomy
## Variants
## States
## Token usage
## Responsive behavior
## Accessibility notes
## Anti-patterns
## Implementation prompt
```

For other destinations, match the local file's existing structure when present. If the file is a stub, propose the smallest useful structure before writing.

## Extraction rules

Treat references as evidence for reusable rules, not screenshots to copy.

Look for:

- grid structure
- panel relationships
- borders and fine-line systems
- hero composition
- nav/header/footer structure
- typographic hierarchy
- recurring labels, badges, rails, cards, and callouts
- geometry: charts, diagrams, radar, brackets, corners, frames
- responsive implications
- what should be SVG/CSS versus image assets

## Destination rules

- Do not overwrite unrelated guidance in an existing reference file.
- Append or replace only the section covered by the approved scope.
- If the synthesis spans multiple destinations, propose the split before writing.
- Log the approval and destination in `.waveframe/decisions.md` when working in a client repo.
- If the user says a source is approved, preserve its structure and synthesize from it; do not redesign it.

## Implementation guardrails

The synthesis brief should usually say:

- scaffold reusable primitives first
- use CSS grid and CSS variables
- avoid page-wide absolute positioning
- keep absolute positioning inside contained primitives only
- avoid magic pixel offsets
- define responsive behavior before building the page
- build one representative page only after primitives are approved

## Proposal before write

Before writing, summarize:

- visual references reviewed
- chosen scope
- proposed destination file
- chosen visual or structural summary
- proposed primitives, sections, or components
- token implications
- responsive strategy
- implementation risks

Ask approval before writing.
