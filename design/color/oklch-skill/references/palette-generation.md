# Palette Generation

## Scale Convention

Design system palettes usually use a numeric scale from 50 for the lightest step to 950 for the darkest step.

| Size | Labels |
| --- | --- |
| 5 | 100, 300, 500, 700, 900 |
| 9 | 50, 100, 200, 300, 500, 700, 800, 900, 950 |
| 11 | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 |

Use 9 steps as the default when matching Tailwind-like palettes.

## Algorithm

Given a base color with lightness `L`, chroma percentage, and hue `H`:

Step 1: set lightness bounds.

```text
delta = 0.4
minL = max(0.05, baseL - delta)
maxL = min(0.95, baseL + delta)
```

Lightness is clamped to `[0.05, 0.95]` to avoid pure black and white, which have zero chroma.

Step 2: distribute lightness evenly from `maxL` for the lightest label to `minL` for the darkest label.

Step 3: clamp chroma per step. Each lightness level has a different maximum chroma for a given hue and color space.

```text
maxChroma = findMaxChroma(step[i].L, hue, colorSpace)
step[i].C = (chromaPercentage / 100) * maxChroma
```

This keeps every step in gamut. High-chroma base colors should lose chroma at the lightest and darkest ends.

## CSS Variable Output

```css
:root {
  --color-50: oklch(0.971 0.012 250);
  --color-100: oklch(0.932 0.028 250);
  --color-200: oklch(0.882 0.048 250);
  --color-300: oklch(0.812 0.078 250);
  --color-500: oklch(0.623 0.188 250);
  --color-700: oklch(0.445 0.138 250);
  --color-800: oklch(0.362 0.108 250);
  --color-900: oklch(0.289 0.078 250);
  --color-950: oklch(0.215 0.048 250);
}
```

## Multi-Hue Palettes

When generating palettes for multiple hues, use the same lightness and chroma percentage for every hue. Same L keeps perceived brightness aligned. Same chroma percentage, not the same absolute chroma, keeps vividness aligned relative to each hue's gamut.

```css
:root {
  /* Same L, same C percentage; different absolute C per hue. */
  --blue-500: oklch(0.623 0.141 250);
  --green-500: oklch(0.623 0.157 145);
  --red-500: oklch(0.623 0.202 25);
}
```

Different hues have different max chroma at the same lightness. The same absolute C value can make some hues look more vivid than others.

## Dark Mode

Reverse the palette mapping so the lightest step becomes the darkest and vice versa.

```css
:root {
  --color-bg: var(--color-50);
  --color-text: var(--color-950);
}

.dark {
  --color-bg: var(--color-950);
  --color-text: var(--color-50);
}
```

OKLCH's perceptual uniformity makes equal L steps usable in both directions.

## Why Not HSL Palettes

Hue drift: `hsl(240, 80%, 20%)` and `hsl(240, 80%, 90%)` are not the same perceptual hue. The light variant can shift toward purple. OKLCH hue is more stable.

Brightness inconsistency: `hsl(60, 100%, 50%)` and `hsl(240, 100%, 50%)` have the same HSL lightness but very different perceived brightness.
