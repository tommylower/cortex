# Brand Overview Deck

## Purpose

Fast visual overview of a brand direction. Use this for early client-facing or internal review of the core brand territory.

This deck is public-facing and visual-first. Treat it like a small social carousel or portfolio board, not a handoff explainer deck.

Final Figma output is always six slides only. Do not add an intro, cover, table of contents, footer, source note, or explanatory slide.

## Target surfaces

- Figma first for editable/polished deliverables.
- Paper acceptable for quick agent-native drafts.
- Markdown outline acceptable when no design tool target is available.

## Required inputs

- client or project name
- selected design system or draft design-system notes
- target Figma/Paper file, page, and frame when building visually

## Neutral template source

- Figma file: selected by the user for the current project.
- Template canvas: `artifact-templates` (`224:2`)
- Source frame: `client-brand-overview` (`224:3`)
- Source frame dimensions: `4080 x 3560`
- Slide dimensions: `1920 x 1080`
- Layout: two columns by three rows, `80px` outer inset, `80px` gutter, `80px` row gap
- Placeholder rule: preserve the neutral source frame name, then replace `client` only in branded copies with the selected client/project slug.

## Layout contract

Default board contains exactly six presentation-ratio tiles:

1. Color
2. Component
3. Logo
4. Hero
5. Social
6. Merch

The template may be presented as one overview board or as individual slides. Preserve slide order.

Do not create or keep an intro/cover slide. If a neutral template includes one, remove it from the generated brand overview.

Default build behavior:

- Build the color slide from actual palette tokens.
- Build the social slide from the approved social/OG image when one exists.
- Leave component, logo, hero, and merch visually blank unless the user explicitly asks to build those slides or a strong approved/source-backed visual is available.
- Do not add placeholder text inside blank slides unless the user explicitly asks for editable planning notes.
- When planning notes are requested, keep them to one centered line per unfinished slide and treat them as temporary direction for manual completion, not final client/social output.

## Naming contract

In generated branded copies, rename the parent frame and slide frames with a short client slug:

```text
<client>-brand-overview
<client>-color
<client>-component
<client>-logo
<client>-hero
<client>-social
<client>-merch
```

Use lowercase kebab-case for frame names. Frame names are for layers only; generated brand-overview slides should not contain visible text labels.

Actual Figma source frames:

| Slide | Generated frame name | Source frame | Node |
| --- | --- | --- | --- |
| 01 | `<client>-color` | `Slide 01` | `224:4` |
| 02 | `<client>-component` | `Slide 02` | `224:66` |
| 03 | `<client>-logo` | `Slide 03` | `224:69` |
| 04 | `<client>-hero` | `Slide 04` | `224:72` |
| 05 | `<client>-social` | `Slide 05` | `224:75` |
| 06 | `<client>-merch` | `Slide 06` | `224:78` |

## Slots

Each tile/slide may include only primary visual content.

Do not include visible text anywhere in final generated brand-overview slides. This means no titles, subtitles, slide numbers, footers, captions, implementation annotations, diagnostic correction notes, or source notes. Text embedded inside an approved image asset is acceptable.

Temporary planning placeholders are allowed only when the user asks for them. Use one short line that describes the intended visual asset, then remove or replace it before final export.

## Design application rules

- Structure controls placement and tile sequence.
- Selected design system controls colors, type, spacing, radius, borders, shadows, and image treatment.
- Replace placeholders such as `client`, `[client]`, and `[Client]` with the selected client/project name or slug according to context.
- Keep all design-tool output editable.
- Preserve the overview frame geometry unless the user asks to redesign the template.
- Do not generate visible text nodes inside the brand-overview parent frame.
- Use only source-backed visuals: implemented UI components, repo assets, approved logo files, approved social images, or explicit user-provided references.
- Do not invent brand graphics, green logo variants, social posts, merch mockups, battery bars, charts, icons, or decorative diagrams to fill a slot.
- Brand green may document UI states and small signal marks, but not an unapproved green identity mark or logo variant.
- Loading-screen graphics belong only in a motion/loading slide or note when they are implemented in code. Do not reuse them as social, imagery, merch, or brand application graphics.
- Prefer one strong visual artifact per slide. Examples: full color fields, one representative component, production logo lockups, full hero treatment inside a stylized browser/shell, the production OG/social image, or a blank manual slot.
- If the source only provides an OG/social image, use it as the social slide's primary full-slide visual. Do not add descriptors, extra diagrams, or invented post templates.
- If the source only provides a hero image or live hero implementation, show the hero as the main visual card or inside a simple browser/shell container.
- Color slides may be more stylized, but must still use actual color tokens and avoid invented marks.

## Adaptation rules

- If a required asset is missing, keep a labeled placeholder and flag it.
- For final Figma output, missing-content placeholders must be non-textual blank visual slots. Report missing content in the chat summary or private notes, not in visible deck text.
- For in-progress Figma output, user-requested planning placeholders may remain in unfinished slides until the manual content pass.
- If more than six sections are requested, do not add them to this brand overview. Use a different deck or ask before changing this structure.
- Do not add client-specific sections to this template unless they become reusable across future projects.

## Done criteria

- Parent frame contains exactly six slide frames.
- No intro/cover frame exists.
- No visible text nodes exist anywhere inside the brand-overview parent frame.
- Color slide is built from actual palette tokens.
- Social slide uses the approved social/OG image as the full-slide visual when available.
- Unbuilt slides are blank visual frames, not text placeholders.
