---
name: gradients
description: "Patterns and principles for building high-quality CSS gradients: choosing the right color space (sRGB vs oklab vs oklch), linear / radial / conic gradient syntax, layering, performance, hue-shift avoidance, and common recipes (mesh-like backgrounds, button glows, text gradients, masked overlays). Use when building hero backgrounds, button styles, glow effects, gradient text, mesh backgrounds, or fixing muddy/banded gradients. Triggers: gradient, background, oklch, oklab, color interpolation, mesh gradient, glow, hero background."
author: Jakub Krehel — based on https://jakub.kr/work/gradients
---

# CSS Gradients

Patterns and principles for building gradients in web design. Covers all gradient types, color space selection, layering, performance, and common recipes.

Based on [jakub.kr/work/gradients](https://jakub.kr/work/gradients).

## Color Space — Pick the Right One

Default CSS uses sRGB. You almost always want something better.

| Color Space | Interpolation | Gamut | When to use |
|-------------|--------------|-------|-------------|
| `sRGB` | Linear (straight-line) | sRGB | Legacy, simple two-color fades |
| `oklab` | Linear (straight-line) | Display P-3 | Smooth transitions without hue shifts — good default |
| `oklch` | Circular (hue is angular) | Display P-3 | Vibrant, rainbow-like transitions — watch for unexpected intermediate hues |

**Tailwind v4** defaults to `oklab` for gradients. Override per-element when needed:
```html
<div class="bg-linear-to-r/oklch from-red-500 to-blue-500" />
```

**CSS syntax** — add `in <color-space>` after the gradient function:
```css
background: linear-gradient(in oklch, blue, red);
background: linear-gradient(in oklab 135deg, #3b82f6, #8b5cf6);
```

**Rule of thumb**: Use `oklab` as your default. Switch to `oklch` when you want the gradient to pass through more hues (rainbow effects, color wheel). Avoid raw `sRGB` unless matching a specific legacy design.

## Linear Gradients

Most common type. Colors blend along a straight line.

```css
/* Direction via keywords */
background: linear-gradient(to bottom right, blue, red);

/* Direction via angle (clockwise from top) */
background: linear-gradient(135deg, #3b82f6, #8b5cf6);

/* Explicit color stops */
background: linear-gradient(to bottom, blue 25%, red 75%);

/* Sharp edge — stops at same position */
background: linear-gradient(to bottom, blue 50%, red 50%);
```

### Repeating
```css
background: repeating-linear-gradient(45deg, blue 0 10px, red 10px 20px);
```

### Diamond (non-native, layered)
```css
background:
  linear-gradient(to bottom right, #fff 0%, #999 50%) bottom right / 50% 50% no-repeat,
  linear-gradient(to bottom left, #fff 0%, #999 50%) bottom left / 50% 50% no-repeat,
  linear-gradient(to top left, #fff 0%, #999 50%) top left / 50% 50% no-repeat,
  linear-gradient(to top right, #fff 0%, #999 50%) top right / 50% 50% no-repeat;
```

## Radial Gradients

Radiate outward from a center point. Use for glows, spotlights, depth.

```css
/* Basic */
background: radial-gradient(circle, blue, red);

/* Position + size */
background: radial-gradient(circle closest-side at 70% 30%, blue, red);

/* Ellipse stretches with container */
background: radial-gradient(ellipse farthest-corner at center, #3b82f6, transparent);
```

**Size keywords**: `closest-side`, `closest-corner`, `farthest-side`, `farthest-corner` (default).

### Glow effect recipe
```css
background: radial-gradient(circle at 50% 50%, oklch(0.7 0.15 250 / 0.4), transparent 70%);
```

## Conic Gradients

Rotate around a center point like a color wheel. Good for charts, rings, animated borders.

```css
/* Basic */
background: conic-gradient(blue, red);

/* Starting angle + position */
background: conic-gradient(from 90deg at 50% 50%, blue, red);

/* Hard-edge pie chart */
background: conic-gradient(
  purple 0deg 120deg,
  red 120deg 240deg,
  blue 240deg 360deg
);

/* Repeating pattern */
background: repeating-conic-gradient(from 0deg, #000 0deg 20deg, #fff 20deg 40deg);
```

## Color Hints (Transition Midpoints)

Control *where* the blend midpoint falls between two stops. This is not a color stop — it shifts the interpolation curve.

```css
/* Midpoint at 30% — red transitions faster, blue dominates */
background: linear-gradient(to right, red, 30%, blue);

/* Multiple hints */
background: linear-gradient(to right, red, 30%, blue, 70%, green);
```

Use hints to create eased, non-linear-feeling gradients without adding extra color stops.

## Gradient Layering + Blend Modes

Stack gradients with commas. Add `background-blend-mode` for complex effects.

```css
.layered {
  background:
    linear-gradient(
      in oklch 135deg,
      oklch(0.75 0.18 280),
      oklch(0.8 0.15 80),
      oklch(0.75 0.18 320)
    ),
    conic-gradient(
      in oklch from 180deg,
      oklch(0.7 0.12 200 / 0.3),
      oklch(0.7 0.12 340 / 0.3),
      oklch(0.7 0.12 200 / 0.3)
    );
  background-blend-mode: overlay, color-dodge;
}
```

Useful blend modes for gradients: `overlay`, `color-dodge`, `multiply`, `soft-light`, `screen`.

## Performance

Gradients are GPU-accelerated. What matters is *what* you animate.

| Cheap to animate | Expensive to animate |
|-----------------|---------------------|
| `background-position` | Changing color stops |
| `background-size` | Adding/removing layers |
| `opacity` | Switching gradient type |

**Pattern**: Animate pseudo-element overlays or CSS custom properties rather than rewriting gradient definitions.

```css
/* Animate position instead of colors */
.animated-gradient {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
  background-size: 200% 100%;
  animation: shift 3s ease infinite;
}

@keyframes shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

## Common Recipes

### Subtle section background
```css
background: linear-gradient(in oklab to bottom, oklch(0.97 0.01 250), oklch(0.99 0.005 280));
```

### Glowing orb behind content
```css
.glow {
  position: relative;
}
.glow::before {
  content: '';
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle, oklch(0.6 0.2 270 / 0.3), transparent 70%);
  z-index: -1;
  filter: blur(60px);
}
```

### Animated border ring
```css
.ring {
  background: conic-gradient(from var(--angle), #3b82f6, #8b5cf6, #ec4899, #3b82f6);
  animation: spin 4s linear infinite;
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes spin {
  to { --angle: 360deg; }
}
```

### Text gradient
```css
.gradient-text {
  background: linear-gradient(in oklch 90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Noise texture overlay
```css
.noisy-gradient {
  background:
    url('/noise.svg'),
    linear-gradient(in oklab 135deg, #1e1b4b, #312e81);
  background-blend-mode: overlay;
}
```

## Mistakes to Avoid

- Using `sRGB` by default when `oklab` produces smoother results
- Muddy mid-tones from blending complementary colors in sRGB — switch to `oklab` or `oklch`
- Animating color stop values directly — animate `background-position` or `background-size` instead
- Forgetting `transparent` is `rgba(0,0,0,0)` in sRGB — in oklch use `oklch(0 0 0 / 0)` to avoid dark bands
- Overusing gradients — one or two well-placed gradients is usually enough
- No fallback for `@property` — older browsers won't animate CSS custom properties
