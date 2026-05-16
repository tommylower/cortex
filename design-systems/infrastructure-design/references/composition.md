# Composition

## Layout Feel

This system uses a restrained institutional layout system:

- full-width dark bands
- centered max-width content, usually `1440px`
- generous section spacing
- square cards and precise grids
- mono labels as navigational anchors
- sparse green signal rather than decorative color

Avoid marketing-page softness. The page should feel like a compliance operations interface expanded into a brand site.

## Section Pattern

Most sections follow this rhythm:

```text
section.bg-ink.text-fg
  max-width shell
    SectionLabel
    display heading
    optional mono body
    content grid/table/card system
```

The section shell usually uses:

- `paddingInline: var(--section-x)`
- `paddingTop` or `paddingBlock: var(--section-y)`
- `maxWidth: 1440`

## Heading Stack

The repeated heading stack is a documented pattern rather than a component:

- `SectionLabel` first
- F37 display heading, balanced text
- optional IBM Plex Mono body copy
- max width around `760px` to `820px`
- gap around `24px` to `32px`

## Card Rhythm

Cards are square-cornered, bordered, and mostly transparent over ink.

Use:

- hairline border
- subtle dark shadow
- mono eyebrow
- display title
- mono body
- optional icon/micro-visual

Cards may invert to paper/ink on hover only when the whole card is an interactive visual unit. Do not make every card invert by default.

## Responsive Behavior

Mobile layouts collapse to a single column. Tablet often uses two columns. Desktop uses three, four, or twelve-column grids depending on the section.

Common patterns:

- card grids: `grid-cols-1`, then `sm:grid-cols-2`, then `lg:grid-cols-3/4`
- platform module rows: stacked on mobile, grid rows on desktop
- pricing matrix: desktop table with mobile accordion/section variant
- section spacing remains generous but clamps down on small screens

## Density

The site should feel dense enough for institutional buyers but never cramped. Dense copy belongs in mono text blocks, tables, rows, and metadata. Top-level claims stay short and large.
