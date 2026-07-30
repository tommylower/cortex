# Surfaces

Border radius, optical alignment, adaptive chips, shadows, and image outlines.

## Concentric Border Radius

When nesting rounded elements, the outer radius must equal the inner radius plus the padding between them:

```
outerRadius = innerRadius + padding
```

This rule is most useful when nested surfaces are close together. If padding is larger than `24px`, treat the layers as separate surfaces and choose each radius independently instead of forcing strict concentric math.

### Example

```css
/* Good: concentric radii */
.card {
  border-radius: 20px; /* 12 + 8 */
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}

/* Bad: same radius on both */
.card {
  border-radius: 12px;
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}
```

### Tailwind Example

```tsx
// Good: outer radius accounts for padding
<div className="rounded-2xl p-2">       {/* 16px radius, 8px padding */}
  <div className="rounded-lg">          {/* 8px radius = 16 - 8 ✓ */}
    ...
  </div>
</div>

// Bad: same radius on both
<div className="rounded-xl p-2">
  <div className="rounded-xl">          {/* same radius, looks off */}
    ...
  </div>
</div>
```

Mismatched border radii on closely nested surfaces is a common source of visual tension. Calculate concentrically when the layers share a visible, even inset; preserve an established component token when the layers are independent or the padding is intentionally asymmetric.

## Optical Alignment

When geometric centering looks off, align optically instead.

### Buttons with Text + Icon

When an icon makes otherwise symmetric padding look unbalanced, use slightly less padding on the icon side. A useful starting point is:
`icon-side padding = text-side padding - 2px`.

```css
/* Good: less padding on icon side */
.button-with-icon {
  padding-inline-start: 16px;
  padding-inline-end: 14px; /* trailing icon side = text side - 2px */
}

/* Bad: equal padding looks like icon is pushed too far right */
.button-with-icon {
  padding-inline: 16px;
}
```

```tsx
// Tailwind
<button className="ps-4 pe-3.5 flex items-center gap-2">
  <span>Continue</span>
  <ArrowRightIcon />
</button>
```

### Play Button Triangles

Play icons are triangular and their geometric center is not their visual center. Shift slightly right:

```css
/* Good: optically centered */
.play-button svg {
  transform: translateX(2px); /* physical correction to the glyph itself */
}

/* Bad: geometrically centered but looks off */
.play-button svg {
  /* no adjustment */
}
```

### Asymmetric Icons (Stars, Arrows, Carets)

Some icons have uneven visual weight. The best fix is adjusting the SVG directly so no extra margin/padding is needed in the component code.

```tsx
// Best: fix in the SVG itself
// Adjust the viewBox or path to visually center the icon

// Fallback: adjust with margin
<span className="translate-x-px">
  <StarIcon />
</span>
```

## Shadows Instead of Borders

For **buttons, cards, and containers** that use a border for depth or elevation, prefer replacing it with a subtle `box-shadow`. Shadows adapt to any background since they use transparency; solid borders don't. This also helps when using images or multiple colors as backgrounds: solid border colors don't work well on backgrounds other than the ones they were designed for.

**Do not apply this to dividers** (`border-b`, `border-t`, side borders) or any border whose purpose is layout separation rather than element depth. Those should stay as borders.

### Shadow as Border (Light Mode)

The shadow is comprised of three layers. The first acts as a 1px border ring, the second adds subtle lift, and the third provides ambient depth:

```css
:root {
  --shadow-border:
    0px 0px 0px 1px oklch(0 0 0 / 0.06),
    0px 1px 2px -1px oklch(0 0 0 / 0.06),
    0px 2px 4px 0px oklch(0 0 0 / 0.04);
  --shadow-border-hover:
    0px 0px 0px 1px oklch(0 0 0 / 0.08),
    0px 1px 2px -1px oklch(0 0 0 / 0.08),
    0px 2px 4px 0px oklch(0 0 0 / 0.06);
}
```

### Shadow as Border (Dark Mode)

In dark mode, simplify to a single white ring, since layered depth shadows aren't visible on dark backgrounds:

```css
/* Dark mode: adapt to whatever setup the project uses
   (prefers-color-scheme, class, data attribute, etc.) */
--shadow-border: 0 0 0 1px oklch(1 0 0 / 0.08);
--shadow-border-hover: 0 0 0 1px oklch(1 0 0 / 0.13);
```

### Usage with Hover Transition

Apply the variable and add `transition-[box-shadow]` for a smooth hover:

```css
.card {
  box-shadow: var(--shadow-border);
  transition-property: box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.card:hover {
  box-shadow: var(--shadow-border-hover);
}
```

### When to Use Shadows vs. Borders

| Use shadows | Use borders |
| --- | --- |
| Cards, containers with depth | Dividers between list items |
| Buttons with bordered styles | Table cell boundaries |
| Elevated elements (dropdowns, modals) | Form input outlines (for accessibility) |
| Elements on varied backgrounds | Hairline separators in dense UI |
| Hover/focus states for lift effect | |

## Adaptive Chips on Variable Surfaces

When a neutral chip or badge sits inside a surface whose background changes,
derive the chip from the surface's foreground color. This keeps the component
predictable while allowing it to adapt without a token for every possible
surface-and-chip combination.

```css
.interactive-surface {
  color: var(--surface-foreground);
}

.chip {
  color: currentColor;
  background-color: color-mix(in oklch, currentColor 12%, transparent);
  border: 1px solid color-mix(in oklch, currentColor 22%, transparent);
}
```

The surface's default, hover, selected, and dark-theme states remain
responsible for providing an accessible foreground color. Verify the resulting
chip contrast in every state; derivation does not guarantee contrast by itself.

Keep success, warning, error, and other semantic badges on explicit semantic
tokens so their meaning stays stable across surfaces.

Do not use `mix-blend-mode: multiply` as the default adaptation mechanism. It
makes the rendered color depend on the backdrop, behaves poorly on many dark
surfaces, and can change contrast when unrelated composition changes. It is
acceptable as a deliberate visual treatment when:

- the backdrop set is small and controlled;
- the blended result has been verified in every supported theme and state;
- the chip is not carrying a semantic color whose meaning must remain stable.

## Image Outlines

Use the project's image-outline token when one exists. Otherwise, a subtle
`1px` low-opacity neutral outline is a useful starting point for consistent
depth.

### Fallback neutral recipe

- **Light mode**: pure black, `oklch(0 0 0 / 0.1)`.
- **Dark mode**: pure white, `oklch(1 0 0 / 0.1)`.
- Avoid an accidental near-black or near-white tint that reads as dirt on the
  image edge. Use a themed outline only when the project intentionally defines
  one.

### Light Mode

```css
img {
  outline: 1px solid oklch(0 0 0 / 0.1);
  outline-offset: -1px; /* draw the ring just inside the image edge */
}
```

### Dark Mode

```css
img {
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}
```

### Tailwind with Dark Mode

```tsx
<img
  className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
  src={src}
  alt={alt}
/>
```

Use `outline-black/10` and `outline-white/10` specifically, not `outline-slate-*`, `outline-zinc-*`, `outline-neutral-*`, or any tinted scale.

**Why outline instead of border?** `outline` never affects layout (no added width or height at any offset), and `outline-offset: -1px` draws the ring just inside the image edge so it hugs the corner radius instead of sitting outside it.
