---
name: oklch-skill
description: "OKLCH color space for web projects. Convert hex/rgb/hsl to oklch, generate palettes, check contrast, handle gamut boundaries, and theme with Tailwind v4. Use when working with oklch, color conversion, palette generation, contrast ratio, gamut, display p3, design tokens, hue drift, chroma, or dark mode colors."
author: Jakub Krehel (https://github.com/jakubkrehel/oklch-skill) adapted for Cortex
---

# OKLCH Colors

OKLCH is a perceptually uniform color space for web color work. Use it when CSS colors, palettes, design tokens, contrast fixes, or Tailwind v4 themes need predictable perceived lightness, stable hue, and better gamut handling.

This cortex skill is adapted from [jakubkrehel/oklch-skill](https://github.com/jakubkrehel/oklch-skill).

## Quick Reference

| Category | When to use | Reference |
| --- | --- | --- |
| Conversion | Hex/rgb/hsl to oklch | [references/color-conversion.md](references/color-conversion.md) |
| Palettes | Generate scales, multi-hue palettes, dark mode | [references/palette-generation.md](references/palette-generation.md) |
| Contrast | APCA/WCAG checks and contrast fixes | [references/accessibility-contrast.md](references/accessibility-contrast.md) |
| Gamut and Tailwind | P3 fallbacks, `@theme` scales, gamut clamping | [references/gamut-and-tailwind.md](references/gamut-and-tailwind.md) |

## Why OKLCH

- Perceptual uniformity: equal L steps produce more even perceived brightness than HSL lightness.
- Stable hue: OKLCH hue stays more consistent across a color ramp than HSL hue.
- Independent chroma: chroma is an absolute measure of colorfulness rather than a lightness-dependent saturation percentage.
- Finite gamut: not every OKLCH value maps to sRGB, so high-chroma values need gamut checks.

## Syntax

```css
oklch(L C H)
oklch(L C H / alpha)
```

| Channel | Range | Description |
| --- | --- | --- |
| L | 0-1 | Lightness. 0 is black, 1 is white. |
| C | 0-~0.4 | Chroma, or perceived colorfulness. Max depends on L and H. |
| H | 0-360 | Hue angle in degrees. |
| alpha | 0-1 | Optional transparency using slash syntax. |

```css
color: oklch(0.637 0.237 25.331);
background: oklch(0.8 0.05 200 / 0.5);
```

Formatting: use 3 decimal places for L and C, up to 3 decimal places for H, drop trailing zeroes, and format `-0` as `0`.

## Thresholds

| Rule | Value |
| --- | --- |
| Light/dark boundary | L > 0.6 is a light background, so use dark text |
| Lightness gap on light background | Foreground L < 0.45 when background L > 0.85 |
| Lightness gap on dark background | Foreground L > 0.75 when background L < 0.25 |
| Hue drift threshold | More than 10 degrees across palette steps is visible |
| APCA normal text | `abs(Lc) >= 60` to pass, `>= 75` for pass+ |
| WCAG 2 normal text | 4.5:1 AA, 7:1 AAA |
| Contrast fix | Adjust L only; chroma has negligible contrast effect |

## Output Format

When reviewing or changing colors, present every color change in a markdown table with `Before` and `After` columns.

| Before | After |
| --- | --- |
| `color: #3b82f6` | `color: oklch(0.623 0.188 259.815)` |
| Same absolute C across hues | Same C percentage of each hue's max chroma |
| No sRGB fallback for P3 color | `@media (color-gamut: p3)` wrapper |

## Common Mistakes

| Issue | Fix |
| --- | --- |
| Hex/rgb/hsl color in new code | Convert to `oklch()` |
| HSL palette ramp with hue drift | Rebuild with constant OKLCH hue |
| Failing contrast | Adjust the OKLCH L channel, keep C and H |
| High chroma without gamut check | Clamp to max chroma for the L/H in sRGB |
| Same absolute C across different hues | Use the same C percentage of each hue's max chroma |
| P3 color without sRGB fallback | Add a `@media (color-gamut: p3)` enhancement |
| Dark mode with hand-picked colors | Derive from the light palette by reversing L mapping |
| Hex in Tailwind v4 `@theme` | Convert to OKLCH values |
| Alpha with comma syntax | Use slash syntax: `oklch(L C H / alpha)` |
