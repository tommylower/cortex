# Content Map

Use this mode to turn an approved sitemap, Google Doc export, Markdown outline, Figma/Paper wireframe, screenshot, or existing code sketch into a buildable content structure.

## Goal

Create a low-fidelity bridge between approved content strategy and visual implementation.

```text
approved sitemap or wireframe -> content map -> ASCII wireframe -> section brief -> build
```

This is not design-system synthesis. Do not infer final colors, fonts, brand tokens, components, or code from the sitemap alone.

## Privacy rule

Draft privately first.

Write working files under:

```text
.waveframe/content-maps/
.waveframe/wireframes/
.waveframe/section-briefs/
```

Promote to client-facing docs only after explicit user approval.

Approval language can be direct:

```text
approved
promote this
promote this to project docs
this is the page structure
```

Without approval, do not write into `design-system/`, `README.md`, or `AGENTS.md`.

## Inputs

Use any of:

- approved sitemap Markdown
- Google Doc export converted to Markdown
- existing ASCII wireframe
- Figma/Paper wireframe or screenshot
- current page code, only when the user says it represents approved structure
- user notes about page goals, audience, required CTAs, or section order

Ask only for missing essentials:

- source path or URL
- page or flow to map first
- whether the source is approved, draft, or exploratory
- target repo, if not already clear

## Outputs

For each mapped page, create private drafts:

```text
.waveframe/content-maps/<page>.md
.waveframe/wireframes/<page>.md
.waveframe/section-briefs/<page>.md
```

### Content map

Use this shape:

```text
# <Page> Content Map

Status: draft | approved
Source:
Goal:
Primary audience:
Primary action:
Secondary actions:

## Section Order

1. <Section name>
   Purpose:
   Content slots:
   CTA:
   Notes:

## Open Questions
```

### ASCII wireframe

Keep this low fidelity. Show hierarchy, section order, and rough layout only.

Rules:

- Use text boxes, rows, columns, and labels.
- Do not encode exact colors, fonts, or visual polish.
- Mark reusable section candidates.
- Mark mobile stacking notes when obvious.
- Prefer `wiretext` when available; otherwise plain ASCII is acceptable.

Example:

```text
┌──────────────────────────────────────────────┐
│ Nav                                          │
├──────────────────────────────────────────────┤
│ Hero headline                               │
│ Supporting proof                            │
│ Primary CTA / Secondary CTA                 │
├──────────────────────────────────────────────┤
│ Problem / stakes                            │
├──────────────────────────────────────────────┤
│ Feature grid                                │
└──────────────────────────────────────────────┘
```

### Section brief

Use this shape:

```text
# <Page> Section Brief

Status: draft | approved

## Build Rules

- Follow this section order unless the user approves a change.
- Apply the selected design system for visual treatment.
- Apply `references/architecture.md` for implementation primitives when present.
- Use Cortex UI, responsive, interaction, motion, and preflight skills as fallback craft rules.

## Sections

### <Section name>

Purpose:
Layout intent:
Content slots:
Reusable components:
Responsive notes:
Implementation notes:
```

## Promotion

When the user approves, promote stable structure into client-facing docs.

Default targets:

```text
design-system/references/page-structure.md
design-system/references/composition.md
```

Update `AGENTS.md` only when agents need a rule to follow during builds. Update `README.md` only when humans need a project-level map.

After promotion, log the decision in:

```text
.waveframe/decisions.md
```

Include:

- source material
- approved page or flow
- promoted files
- date
- unresolved questions

## Existing approved wireframes

If the user already has an approved visual wireframe, do not redesign it.

Extract:

- page goal
- section order
- content hierarchy
- reusable section candidates
- responsive implications
- any explicit constraints the wireframe communicates

Then simplify it into the content map, ASCII wireframe, and section brief. Flag visual details that belong in design-system or architecture docs instead of copying them into the content map.

## Build handoff

After approval and promotion, the implementation prompt should say:

```text
Build from the approved page structure first. Use the design system for visual treatment, architecture.md for reusable primitives, and responsive-craft/preflight before calling the page done.
```
