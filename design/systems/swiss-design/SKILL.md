---
name: swiss-design
description: "Opt-in Swiss International Style design system for clean editorial interfaces: grid discipline, grotesque typography, restrained color, generous whitespace, opacity hierarchy, and one accent color. Use only when the user explicitly asks for Swiss design, International Typographic Style, modernist editorial UI, grid-first composition, Helvetica-like typography, or this specific design system."
author: zeke/swiss-design-skill adapted for Cortex
---

# Swiss Design

Opt-in design system rooted in Swiss International Style: rigorous grids, clear typography, restrained color, and whitespace as structure.

Source: https://github.com/zeke/swiss-design-skill

## Use Only When Asked

Use when the user explicitly asks for:

- Swiss design
- International Typographic Style
- modernist editorial UI
- grid-first composition
- Helvetica / Neue Haas / grotesque typography
- a clean poster-like product interface

Do not apply automatically to ordinary SaaS, dashboard, or marketing work.

## Core Rules

- **Grid first:** start from a 12-column desktop grid and collapse to one column on mobile.
- **One accent:** choose one accent color for the whole view and use it sparingly.
- **Hierarchy through opacity:** use one text hue with opacity steps instead of multiple gray hues.
- **Whitespace as structure:** section rhythm should feel deliberate and generous.
- **Narrow body text:** keep paragraphs at `60ch` or less.
- **Mostly rectilinear:** avoid pill-heavy layouts and oversized radii unless the product context requires them.

## Typography

Recommended stack:

```css
font-family: "IBM Plex Sans", "Hanken Grotesk", "Barlow", "Host Grotesk", "DM Sans", system-ui, sans-serif;
```

Cortex adaptation:

- Use normal letter spacing by default.
- Only tighten display headings when the project already permits negative tracking or the typeface needs optical correction.
- Prefer light/regular headings over bold headings.
- Use tabular numbers for numeric rows and comparisons.

## Color

Base palette:

- light page: `stone-50`
- light surface: `stone-100`
- light border: `stone-200`
- dark page: `stone-950`
- dark surface: `stone-900`
- dark border: `stone-800`

Text hierarchy:

```html
<p class="text-stone-900 dark:text-stone-50">Primary</p>
<p class="text-stone-900/70 dark:text-stone-50/70">Secondary</p>
<p class="text-stone-900/40 dark:text-stone-50/40">Tertiary</p>
```

Accent defaults:

- Swiss red: `#C8102E`
- cobalt: `#003B8E`
- golden: `#F0B429`
- forest: `#2D6A4F`

Pick one.

## Layout Pattern

```html
<section class="border-t border-stone-200 px-4 py-16 dark:border-stone-800 md:px-8 md:py-24 lg:py-32">
  <div class="mx-auto max-w-6xl">
    <div class="grid grid-cols-12 gap-4 md:gap-8">
      <div class="col-span-12 md:col-span-4">
        <p class="text-xs uppercase text-stone-900/40 dark:text-stone-50/40">Section</p>
      </div>
      <div class="col-span-12 md:col-span-8">
        <h2 class="text-4xl font-light text-stone-900 dark:text-stone-50">Clear hierarchy</h2>
        <p class="mt-6 max-w-[60ch] text-stone-900/70 dark:text-stone-50/70">Body copy stays narrow.</p>
      </div>
    </div>
  </div>
</section>
```

## Preflight

Before calling the design done:

- Body text is `60ch` or narrower.
- Only one accent color appears.
- Mobile falls back to one column without horizontal scroll.
- Text hierarchy uses opacity, not unrelated hues.
- Headings are not all bold.
- Buttons and links keep 44px touch targets.
- Every light color has an intentional dark-mode counterpart when dark mode exists.
