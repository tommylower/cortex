# Accessibility And Contrast

Contrast is measured between a foreground color, such as text, icon, or UI element, and the background it sits on. Always identify the actual rendered background, usually the nearest parent with a background color.

## APCA Thresholds

APCA is more perceptually accurate than WCAG 2 and pairs naturally with OKLCH because both are grounded in perceived lightness. Use APCA by default for design work, while still checking WCAG 2 when legal conformance requires it.

`Lc` measures perceived contrast between foreground and background. These are conservative approximations:

| Content Type | Pass | Pass+ |
| --- | --- | --- |
| Normal text | Lc 60 | Lc 75 |
| Large text | Lc 45 | Lc 60 |
| UI components | Lc 30 | - |

APCA's `Lc` value is signed. Positive means light text on a dark background, negative means dark text on a light background. Use absolute value for threshold comparison.

## WCAG 2 Thresholds

WCAG 2 is still required for formal WCAG 2.x conformance claims. It uses a luminance ratio that can be too strict or too lenient depending on the pair.

| Content Type | AA | AAA |
| --- | --- | --- |
| Normal text under 18px, or under 14px bold | 4.5:1 | 7:1 |
| Large text at least 18px, or at least 14px bold | 3:1 | 4.5:1 |
| UI components and graphical objects | 3:1 | - |

## Fixing Contrast With OKLCH

In OKLCH, contrast is controlled by lightness. Adjust the L distance between the foreground and background, while keeping C and H stable.

```css
/* Failing: text is too close in lightness to the background. */
color: oklch(0.65 0.2 250);
background: oklch(0.75 0.05 250);

/* Fixed: text is darker, while C and H remain unchanged. */
color: oklch(0.35 0.2 250);
background: oklch(0.75 0.05 250);
```

Chroma has negligible effect on contrast. Adjust L before changing color identity.

## Lightness Gap Guide

- Light background with L > 0.85: foreground L should be below 0.45.
- Dark background with L < 0.25: foreground L should be above 0.75.

These are approximations. Verify with contrast calculation before shipping accessibility-sensitive UI.

## Light Vs Dark Color Detection

```text
if L > 0.6, use dark text on this background
if L <= 0.6, use light text on this background
```

## Hue Drift Detection

To detect hue drift in an existing HSL palette:

1. Convert each step to OKLCH.
2. Compare the H values across steps.
3. If the hue spread is greater than 10 degrees, the palette has visible drift.

```css
/* HSL blue ramp: hue shifts toward purple. */
hsl(240, 80%, 20%)  ->  oklch H ~= 269
hsl(240, 80%, 50%)  ->  oklch H ~= 267
hsl(240, 80%, 90%)  ->  oklch H ~= 285
```
