# Nothing Design System — Imagery

## Photographic treatment

- Use product-like, high-contrast, technical imagery.
- Prefer direct framing, neutral perspective, and hard-edged silhouettes.
- Dark mode imagery should sit on black or near-black without blurred glow.
- Light mode imagery should feel like a printed manual or product sheet.

## Vector and dot-matrix overlays

Use dot grids, registration marks, thin leader lines, segmented bars, and circular instrument marks. Keep overlays functional-looking, not decorative.

```css
.nd-dot-grid {
  background-image: radial-gradient(circle, var(--border-visible) 1px, transparent 1px);
  background-size: 16px 16px;
}
```

## Iconography

Use monoline icons at 1.5px stroke. Icons inherit text color and should be secondary to type.
