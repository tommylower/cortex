---
name: muller-brockmann-grid-systems
description: "Opt-in Muller-Brockmann grid system for editorial, magazine, report, and longform web pages: modular columns, baseline rhythm, grotesque type, restrained color, inspectable grid overlays, subgrid bands, and optical display-type alignment. Use when explicitly asked for Muller-Brockmann, Swiss/International Typographic Style grids, magazine spreads, editorial layout, grid systems, baseline grids, visible grid overlays, or rigorous grid alignment."
---

# Muller-Brockmann Grid Systems

Opt-in design system for rigorous Swiss editorial web layouts. Use it when the user wants a modular grid that actually structures the page, not Swiss-flavored surface styling.

## Use Only When Asked

Use when the user explicitly asks for:

- Muller-Brockmann, Josef Muller-Brockmann, or *Grid Systems in Graphic Design*
- Swiss or International Typographic Style grid systems
- magazine spreads, editorial layouts, reports, or longform pages
- visible grid overlays, baseline grids, modular grids, or strict grid alignment
- proof that a layout aligns to its grid

Do not apply this system automatically to ordinary SaaS, dashboard, or marketing work.

## Core Discipline

- Define columns, gutters, margins, row modules, and baseline rhythm before placing content.
- Start web layouts with 12 columns, 24px gutters, 64-72px side margins, an 8px baseline, and 24px leading unless the project needs a different field.
- Place text, images, captions, rules, and numerals on explicit column lines and baseline multiples.
- Use grotesque sans type, flush-left ragged-right text, a small type scale, and strong hierarchy jumps.
- Use white paper, near-black ink, one accent color, and no decorative gradients.
- Prefer asymmetry, generous margins, large numerals or data, narrow body measures, and clear folios/captions.

## Web Implementation Rules

1. Keep one source of truth in CSS variables: `--mb-cols`, `--mb-gutter`, `--mb-margin`, `--mb-baseline`, `--mb-leading`, and `--mb-max-width`.
2. Put content and grid guides inside the same positioned wrapper. The overlay must inherit the same max width, margins, columns, and gaps as the content.
3. Use `.mb-grid` for the spread and `.mb-band` for each horizontal row. Place child elements with `grid-column` values such as `1 / 6` or `7 / 13`.
4. Use subgrid where supported, with a repeat-column fallback for browsers without subgrid.
5. Lock vertical rhythm. Line heights, padding, margins, rules, and media heights must be multiples of the baseline or leading.
6. Use pixel line heights for large display type so its layout box does not drift off the baseline.
7. Optically align large display text by measuring the first glyph after fonts load and nudging the box so visible ink lands on the column line.
8. Provide an inspectable grid toggle. A button plus the `G` key should reveal column fields, margin lines, and baseline lines.

## Helper Scripts

Run the scaffold generator from a project root:

```bash
python3 cortex/design/systems/muller-brockmann-grid-systems/scripts/grid_tokens.py --scaffold > index.html
```

Useful flags:

```bash
python3 cortex/design/systems/muller-brockmann-grid-systems/scripts/grid_tokens.py \
  --cols 12 --baseline 8 --gutter 24 --margin 72 --maxw 1296 --accent '#e4002b'
```

Verify a built page with Puppeteer:

```bash
CHROME=/path/to/chrome node cortex/design/systems/muller-brockmann-grid-systems/scripts/verify_grid.js ./index.html --widths=1440,1180,900
```

Install `puppeteer` or `puppeteer-core` in the project, or set `PUP=/absolute/path/to/puppeteer`.

## Build Workflow

1. Choose the subject, imagery, and editorial hierarchy.
2. Generate or copy the scaffold, then replace sample content with real spreads.
3. Build each spread from `.mb-band` rows and explicit column-line spans.
4. Keep every vertical measurement on the 8px baseline.
5. Add `data-mb-optical` to mastheads, big numerals, and section headlines that need visible-ink alignment.
6. Toggle the grid at desktop and mobile widths; the overlay must sit exactly on the content.
7. Run `verify_grid.js` across widths above and below the max content width.

## Preflight

- Every visible content element is placed by column line, not by eye.
- The overlay and content share the same wrapper and grid variables.
- Text tops and media heights respect the baseline rhythm.
- Display type is optically aligned by visible ink, not only by its layout box.
- The page uses one accent and avoids warm beige defaults, decorative cards, and gradient-heavy styling.
- Mobile collapses intentionally without horizontal scroll.
