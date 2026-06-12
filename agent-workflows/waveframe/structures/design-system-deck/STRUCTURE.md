# Design System Deck

## Purpose

Visual representation of a design-system markdown package. Use this for handoff, review, and client education.

This deck is the explanatory handoff surface. It may use notes, labels, source mapping, and implementation callouts when they help the client or future agents understand the system.

## Target surfaces

- Figma first for editable/polished deliverables.
- Paper acceptable for quick agent-native drafts.
- Markdown outline acceptable when no design tool target is available.

## Required inputs

- selected design system
- client or project name
- target Figma/Paper file, page, and frame when building visually, or permission to create a new Figma file
- optional neutral template source

## Neutral template source

- Figma file: `https://www.figma.com/design/X5XmmoMfeQYXk6VJWLG0pI/wip`
- Template canvas: `artifact-templates` (`224:2`)
- Source frame: `client-design-system` (`224:81`)
- Source frame dimensions: `4080 x 9360`
- Slide dimensions: `1920 x 1080`
- Layout: two-column slide grid, `80px` outer inset, `80px` gutter, `80px` row gap
- Placeholder rule: preserve the neutral source frame name, then replace `[client]`, `[Client]`, and `client` only in branded copies with the selected client/project name or slug according to context.

## Layout contract

Default slide sequence:

1. Cover
2. What this is + how to read it
3. Position + philosophy
4. Anti-patterns + named never
5. Color - semantic tokens
6. Color - extended palette
7. Type treatment + scale
8. Spacing + radius scale
9. Layout - grid, shell, rhythm
10. Component library
11. Imagery - photo + vector overlay
12. Logo + identity
13. Animation + motion
14. Voice + copy register
15. Appendix - platform config

Preserve slide order unless the selected design system does not have enough content. If content is missing, keep the slide as a placeholder and flag it.

## Figma file setup

When the target surface is Figma and no target file exists, create a new Figma design file named:

```text
<Client> Design System
```

Inside the file, create or use a page named:

```text
Design System
```

Then scaffold the deck outline by duplicating the neutral `client-design-system` source frame into the target file or by recreating its editable frame structure from this template. Preserve the slide dimensions, grid, source slide order, and editability.

Scaffolding the outline means:

- create the parent deck frame
- create each slide frame with the generated naming contract
- replace client placeholders
- set slide numbers
- add or refresh footer attribution
- regenerate the table of contents from the final slide list
- leave content areas as editable placeholders when the user has not asked to build slide contents yet

Building each slide means:

- read the selected design-system markdown
- fill the slide with real tokens, examples, component samples, notes, and visuals from the selected system
- preserve the template's slide role and layout intent
- flag missing content rather than inventing brand rules silently

## Figma library setup

Before final handoff, the deck must be connected to local Figma color variables.

Create or refresh:

- a local color variable collection named `<client>-colors`
- local paint styles for the same documented tokens
- light and dark modes when documented, even if the site is dark-only or light-only in production
- semantic variables for page background, foreground, inverse surfaces, borders, accents, and state colors

Then bind every solid fill and stroke in the final generated deck to the closest documented variable. Do not leave raw hex values in final deck frames unless the color is intentionally unresolved and called out.

Expected exceptions:

- image fills
- screenshots
- rasterized logos or approved artwork
- imported assets that are not color primitives

Run an audit after binding:

```text
solid fills/strokes bound to variables: all
unbound solid fills/strokes: 0
image fills: allowed
```

If the audit finds unbound solid colors, either bind them, promote them into the design-system token docs, or list them as unresolved before handoff.

## Naming contract

In generated branded copies, rename the parent frame and slide frames with a short client slug:

```text
<client>-design-system
<client>-intro
<client>-overview
<client>-position
<client>-anti-patterns
<client>-color-tokens
<client>-color-palette
<client>-type
<client>-spacing
<client>-layout
<client>-components
<client>-imagery
<client>-logo
<client>-motion
<client>-voice
<client>-platform
```

Use lowercase kebab-case for frame names. Use sentence case for visible slide titles and visible client-name placeholders.

The generated table of contents must match the actual final slide set. If slides are removed, added, or reordered, regenerate the contents list from the final deck sequence.

Any visible placeholder that includes `[client]`, `[Client]`, `client`, or an old client name such as `Outrider` must be replaced with the selected client/project name in sentence case.

Footer attribution should read:

```text
Prepared for <Client> by Wave in Progress ©2026
```

Actual Figma source frames:

| Slide | Generated frame name | Source frame | Node | Title | Subtitle |
| --- | --- | --- | --- | --- | --- |
| 01 | `<client>-intro` | `Slide 01 — Outrider design system` | `224:82` | `<Client> design system` | `Title slide. Cover treatment for the design system deck — placeholder for the hero / wordmark.` |
| 02 | `<client>-overview` | `Slide 02 — What this is + table of contents` | `224:87` | `What this is + how to read it` | Structured intro with dynamic contents column |
| 03 | `<client>-position` | `Slide 03 — Position + philosophy` | `224:100` | `Position + philosophy` | `The thesis behind every decision in this system.` |
| 04 | `<client>-anti-patterns` | `Slide 04 — Anti-patterns · named never` | `224:105` | `Anti-patterns · named never` | `What this system explicitly refuses to do.` |
| 05 | `<client>-color-tokens` | `Slide 05 — Color · semantic tokens` | `224:110` | `Color · semantic tokens` | `Five role-based color tokens and what each is for.` |
| 06 | `<client>-color-palette` | `Slide 06 — Color · extended palette` | `224:115` | `Color · extended palette` | `Full ramps with usage guidance per token.` |
| 07 | `<client>-type` | `Slide 07 — Type treatment + scale` | `224:120` | `Type treatment + scale` | `Three families and a complete size scale.` |
| 08 | `<client>-spacing` | `Slide 08 — Spacing + radius scale` | `224:125` | `Spacing + radius scale` | `Eight-step spacing rhythm and a capped radius scale.` |
| 09 | `<client>-layout` | `Slide 09 — Layout · grid, shell, rhythm` | `224:130` | `Layout · grid, shell, rhythm` | `Container, shell bars, and section breathing.` |
| 10 | `<client>-components` | `Slide 10 — Component library` | `224:135` | `Component library` | `Cards, buttons, inputs, tables, chips, and navigation.` |
| 11 | `<client>-imagery` | `Slide 11 — Imagery · photo + vector overlay` | `224:140` | `Imagery · photo + vector overlay` | `Photo treatment, overlay vocabulary, and iconography.` |
| 12 | `<client>-logo` | `Slide 12 — Logo + identity (TBD)` | `224:145` | `Logo + identity (TBD)` | `Construction directions and how they share roles.` |
| 13 | `<client>-motion` | `Slide 13 — Animation + motion` | `224:150` | `Animation + motion` | `One ease, three durations, named recipes.` |
| 14 | `<client>-voice` | `Slide 14 — Voice + copy register` | `224:155` | `Voice + copy register` | `Tone, copy patterns, and what to never say.` |
| 15 | `<client>-platform` | `Slide 15 — Appendix · Tailwind config` | `224:160` | `Appendix · Tailwind config` | `Token export wired to tailwind.config.ts.` |

## Slots

Each slide may include:

- slide title
- short explanatory line
- primary content area
- side notes or references
- slide number
- footer/source note

## Design application rules

- Structure controls slide order, placement, and content slots.
- Design-system markdown controls content truth.
- Selected design system controls visual styling.
- In Figma deliverables, selected design system colors should flow through local variables and paint styles, not one-off raw hex fills.
- Use a very subtle off-white green background for the parent deck frame or surrounding canvas treatment.
- Slide frames default to the selected brand system's light-mode surface color.
- If the design system defines light-mode color roles, use its intended page/surface/background token for slide frames and a softer off-white green only outside or behind the slides.
- Use the selected brand's heading/display font for slide titles and large display moments.
- Use the selected brand's subheading font for subtitles and section labels. If no separate subheading font exists, use a smaller size or lighter weight of the display font.
- Use the selected brand's body font for paragraph text, notes, tables, and dense labels. If the system only has a display family, derive body/subheading styles conservatively from that family.
- Replace `[client]`, `[Client]`, and `client` placeholders with the selected client/project name.
- Replace old source-client references such as `Outrider` with the selected client/project name.
- Use sentence case for visible client names and placeholder replacements.
- Slide titles and large deck headings do not take trailing periods. Preserve punctuation only in source-backed product copy, body text, captions, or code excerpts.
- Balance subtitles and other multiline notes. Avoid one long line followed by a much shorter orphan line; keep top explanatory copy in a narrower measure, usually around 760-820px on a 1920px slide, and use intentional two-to-three-line breaks when the sentence would otherwise run wide.
- Regenerate the contents column on slide 02 from the final generated slide sequence.
- Replace footer/source-note text with `Prepared for <Client> by Wave in Progress ©2026`.
- Keep all Figma/Paper output editable: real text, frames, rectangles, swatches, and vector elements.
- Do not paste screenshots as final content unless the slide explicitly calls for a screenshot example.
- Use only source-backed visuals: implemented UI components, repo assets, approved logo files, approved social images, or explicit user-provided references.
- Do not invent decorative diagrams, battery bars, charts, icons, social posts, merch mockups, logo variants, or component states to fill empty slide space.
- Brand green may document UI states and small signal marks, but not an unapproved green identity mark or logo variant.
- Loading-screen graphics belong only on Motion/Animation when they are implemented in code. Do not reuse them as imagery, social, merch, or generic brand graphics.
- When showing rows of component states, align equivalent columns to a shared x-position even when individual controls have different widths. For example, all hover-state buttons start on the same vertical line so the row reads evenly.
- Do not add small decorative blocks, empty chips, or unlabeled boxes above card titles unless they are actual component parts from the codebase.

## Layout QA

Before handoff, audit every slide for geometry and visual flow:

- No text nodes should overlap other text nodes.
- No visible content should sit outside the slide frame.
- Slide content should respect the deck margin system unless a full-bleed visual is intentional.
- Repeated cards, component rows, marker squares, icon marks, and loading or motion specimens should be centered within their containers.
- Small colored marker squares should align to the optical center of their heading text, not float above or below the title line.
- Avoid isolated content with large empty side gutters when the slide is not intentionally sparse.
- If a specimen needs more room, resize or recompose the surrounding layout instead of shrinking text into unreadable filler.

## Adaptation rules

- If the palette has more colors than the base layout expects, expand the grid predictably.
- If logo guidance is missing, mark the logo slide as TBD.
- If platform mapping is missing, keep the appendix as a placeholder.
- Do not invent implementation details that are not in the design system or code.
- If a slide slot has no source-backed content, leave it blank with a small missing-content note for manual completion.
