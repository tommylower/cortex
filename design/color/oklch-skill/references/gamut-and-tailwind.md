# Gamut Awareness And Tailwind v4

## sRGB Vs Display P3

Every sRGB color exists within Display P3, but not every P3 color exists within sRGB. Display P3 covers more colors and can support stronger chroma on capable displays.

## Max Chroma Varies By Lightness And Hue

The gamut boundary is irregular. At L=0.5 in sRGB, approximate examples are:

- Highest chroma: purple near H 285 at C around 0.29.
- Red-orange near H 0-30 at C around 0.20.
- Lowest chroma: cyan near H 195 at C around 0.09.

The peak hue shifts with lightness. Cyan tends to have one of the lowest max-chroma boundaries.

## Gamut Checking

If a color's chroma exceeds the maximum for its L/H/space, it clips. Reduce chroma while keeping L and H constant.

```css
/* Out of sRGB gamut. */
color: oklch(0.7 0.35 150);

/* Clamped to max chroma. */
color: oklch(0.7 0.22 150);
```

## CSS Fallback Patterns

```css
/* sRGB-safe fallback for OKLCH-capable browsers. */
.accent {
  color: oklch(0.7 0.2 150);
}

/* P3 enhancement for wider-gamut displays. */
@media (color-gamut: p3) {
  .accent {
    color: oklch(0.7 0.3 150);
  }
}
```

For browsers without OKLCH support:

```css
.accent {
  color: #4ade80;
}

@supports (color: oklch(0 0 0)) {
  .accent {
    color: oklch(0.7 0.2 150);
  }

  @media (color-gamut: p3) {
    .accent {
      color: oklch(0.7 0.3 150);
    }
  }
}
```

## Tailwind v4

Tailwind CSS v4 defines its default palette in OKLCH. Custom themes should follow the same convention.

### Custom Color Scale With `@theme`

```css
@theme {
  --color-brand-50: oklch(0.971 0.012 250);
  --color-brand-100: oklch(0.932 0.028 250);
  --color-brand-200: oklch(0.882 0.048 250);
  --color-brand-300: oklch(0.812 0.078 250);
  --color-brand-400: oklch(0.722 0.148 250);
  --color-brand-500: oklch(0.623 0.188 250);
  --color-brand-600: oklch(0.535 0.168 250);
  --color-brand-700: oklch(0.445 0.138 250);
  --color-brand-800: oklch(0.362 0.108 250);
  --color-brand-900: oklch(0.289 0.078 250);
  --color-brand-950: oklch(0.215 0.048 250);
}
```

This creates utilities such as `bg-brand-500` and `text-brand-200`.

### Opacity Modifiers

Tailwind opacity modifiers work with OKLCH.

```html
<div class="bg-brand-500/50"></div>
<!-- Compiles to: oklch(0.623 0.188 250 / 0.5) -->
```

### Migrating Existing Themes

1. Convert all hex values in `@theme` to OKLCH.
2. Replace `theme()` references that assumed hex output.
3. Test dark mode because OKLCH values may look different from hand-picked legacy values.
4. Check hardcoded hex in component code and convert those too.
