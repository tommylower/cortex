# Tokens

## Color

Default mode is dark.

| Role | Token / value | Use |
| --- | --- | --- |
| Ink | `#0d2260`, `--color-ink`, dark `--bg` | Primary background, inverse text in light contexts |
| Paper | `#f4f0e8`, `--color-paper`, dark `--fg` | Primary text, light surfaces, inverted cards |
| Brand green | `#3fd97f`, `--color-brand-green` | Action, focus, active signal, scan highlights |
| Brand blue | `#3b82f6`, `--color-brand-blue` | Secondary signal and technical highlight |
| Screen | `#ef4444` | SR3 module accent |
| Research | `#f97316` | SR3 module accent |
| Reasoning | `#eab308` | SR3 module accent |
| Report | `#22c55e` | SR3 module accent |

Category accents:

- regulatory: `#3b82f6`
- industry: `#a855f7`
- stories: `#f59e0b`
- company: `#ec4899`

Module and category accents are signal marks: tags, dots, chips, icon states, small thumbnails. Do not use them as full-page or full-card backgrounds.

## Typography

Fonts are loaded in `src/app/layout.tsx`.

- Display/body family: F37 Grotesc local variable font via `--font-f37-grotesc`
- Mono/supporting family: IBM Plex Mono via `--font-ibm-plex-mono`

Use F37 Grotesc for headings, large product language, card titles, and high-level navigation. Use IBM Plex Mono for body paragraphs, labels, metadata, button text, tables, badges, and dense explanatory copy.

Primary scale lives in `src/app/globals.css`:

- `text-display-xl`
- `text-display`
- `text-h1`
- `text-h2`
- `text-h3`
- `text-body-lg`
- `text-body`
- `text-body-sm`
- `text-mono`
- `text-mono-label`
- `text-mono-micro`

Most headings use light weights around 300. Card titles sometimes use 400 for emphasis.

## Spacing

Section spacing is centralized:

- `--section-x: clamp(20px, 5vw, 80px)`
- `--section-y: clamp(60px, 11vw, 144px)`

Common card padding:

- standard: `clamp(20px, 5vw, 32px)` inline, `clamp(20px, 4vw, 28px)` block
- compact: `clamp(20px, 5vw, 28px)` inline, `clamp(20px, 4vw, 24px)` block

Common section intro gap:

- label to heading stack: `24px` or `32px`
- section inner group: `clamp(40px, 5vw, 64px)`

## Radius

Default radius is zero.

```css
--radius-none: 0;
```

Round forms are reserved for SVG geometry or intentional diagram marks, not cards or buttons.

## Borders And Shadows

Hairlines define the system.

- default border width: `0.5px`
- standard card border: `rgba(244, 240, 232, 0.12)`
- stronger card border: `rgba(244, 240, 232, 0.18)`
- focus outline: `1px solid var(--color-brand-green)`
- card shadow: `0 2px 8px rgba(3, 8, 23, 0.4)`
- lift shadow token: `0 12px 32px rgb(var(--fg) / 0.14)`

Use shadows sparingly. The design should read as precise and layered, not soft or floating.
