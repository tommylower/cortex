# Responsive Design

Build layouts that recompose across every screen size. Fluid by default, breakpoints by exception.

## The escalation model

Solve responsive problems with the simplest tool first. Escalate only when needed.

```
Does this need to change layout?
  No  --> clamp() for sizing. Done.
  Yes --> Does it depend on CONTAINER size?
    Yes --> Container query
    No  --> Does it depend on VIEWPORT?
      Yes --> Media query (page-level only)
      No  --> Does it depend on CONTENT/STATE?
        Yes --> :has() or intrinsic sizing (auto-fit, flex-wrap)
```

| Layer | Tool | Purpose |
|-------|------|---------|
| Continuous | `clamp()`, fluid tokens | Smooth scaling of typography, spacing |
| Component | Container queries | Adapting to available space (cards, nav items, widgets) |
| Structural | Media queries | Page-level shifts (grid columns, sidebars, nav transforms) |

## Fluid scale in tailwind.config

Map fluid `clamp()` values into Tailwind's theme so you use utilities, not raw CSS:

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontSize: {
        'fluid-sm':  'clamp(0.875rem, 0.5vw + 0.75rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1vw + 0.75rem, 1.25rem)',
        'fluid-lg':  'clamp(1.25rem, 2vw + 0.75rem, 2rem)',
        'fluid-xl':  'clamp(1.5rem, 3vw + 0.75rem, 3rem)',
        'fluid-2xl': 'clamp(2rem, 5vw + 1rem, 4rem)',
        'fluid-hero': 'clamp(2.5rem, 6vw + 1rem, 5rem)',
      },
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-s':  'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-m':  'clamp(1rem, 2vw + 0.5rem, 2rem)',
        'fluid-l':  'clamp(1.5rem, 4vw + 0.5rem, 4rem)',
        'fluid-xl': 'clamp(2rem, 6vw + 1rem, 8rem)',
        'fluid-2xl': 'clamp(3rem, 10vw + 1rem, 12rem)',
      },
    },
  },
}
```

Then in components: `<h1 className="text-fluid-hero">` and `<section className="py-fluid-xl px-fluid-m">`.

**Accessibility rule:** always combine `rem + vw` in the preferred value. Pure `vw` doesn't scale when users zoom to 200%.

## Intrinsic sizing

Columns appear and disappear without breakpoints:

```jsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-fluid-m">
```

`auto-fit` collapses empty tracks (items stretch to fill). `auto-fill` keeps empty tracks (items stay fixed width). Most responsive grids want `auto-fit`.

**Sidebar layout without breakpoints** (Every Layout pattern):

```css
.layout { display: flex; flex-wrap: wrap; gap: var(--space-l); }
.sidebar { flex-basis: 20rem; flex-grow: 1; min-width: 0; }
.main { flex-basis: 0; flex-grow: 999; min-width: min(60%, 30rem); }
```

### CSS subgrid

Aligns nested elements across sibling cards (titles, bodies, CTAs at the same height):

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: auto 1fr auto;
}
.card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid;
}
```

Must declare `grid-row: span N` where N matches parent track count. ~97% browser support.

## Container queries

Components respond to their container's size, not the viewport. Use for reusable components that appear in different contexts.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (width > 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

Use `inline-size` (width queries) for 95% of cases. Avoid `size` unless you need height queries.

**Tailwind container queries** (built-in, no plugin):

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3">...</div>
</div>
```

Tailwind `@` breakpoints are smaller than viewport breakpoints (`@md` = 448px vs `md` = 768px). Use named containers for nested contexts: `@container/sidebar` with `@sm/sidebar:hidden`.

**Fluid sizing inside containers:**

```css
.card__title { font-size: clamp(1rem, 1.5cqi + 0.5rem, 1.75rem); }
```

### Container query gotchas

- **A container cannot query itself.** Only children respond. You may need a wrapper element.
- **Container query units (`cqi`) can't be used on the container element itself** - only on children.
- **Flex items that are also containers may collapse** without `min-width: 0` or `flex: 1`.
- **Don't make grid items containers directly** - wrap them in a div.
- Custom properties don't work in container query conditions (`@container (min-width: var(--bp))` is invalid).

~95% browser support. Production-ready.

## Viewport media queries and modern units

Tailwind's defaults (`sm`, `md`, `lg`, `xl`, `2xl`) are fine. The principle: at each breakpoint, *recompose* - don't just shrink. Stack on mobile, side-by-side on desktop. Off-canvas nav becomes inline. Elements rearrange, not scale.

```jsx
<div className="flex flex-col lg:flex-row lg:items-center gap-fluid-m">
  <div className="lg:w-1/2">...</div>
  <div className="lg:w-1/2">...</div>
</div>
```

Mobile-first is a build order. Start at 320px, scale up.

### Modern viewport units

`100vh` is calculated against the largest viewport (browser UI collapsed). On load with address bar visible, content overflows.

| Unit | Browser UI state | Use for |
|------|------------------|---------|
| `svh` | Fully expanded (smallest) | **Default** - hero sections, modals, anything that must fit on load |
| `lvh` | Fully retracted (largest) | Backgrounds, decorative elements |
| `dvh` | Dynamic - updates on scroll | Sparingly - chat interfaces, overlays tracking exact visible space |

Always provide a fallback:

```css
.hero {
  height: 100vh;   /* fallback */
  height: 100svh;  /* modern browsers */
}
```

Avoid `dvh` for primary layout - it causes layout recalculation on scroll as the toolbar animates. Use `svh` for ~90% of cases.

### Safe areas (notched devices)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

```css
.fixed-header {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
.bottom-nav {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

Landscape orientation: the notch moves to the side. `safe-area-inset-left/right` become significant.

## Non-negotiable defaults

**Images**: `<img className="max-w-full h-auto" width="800" height="600" />` - always include `width` and `height` attributes to prevent layout shift. Add `loading="lazy"` on below-fold images.

**Content width**: `<div className="w-[min(90%,1200px)] mx-auto">` - content never runs edge-to-edge on wide screens.

**Input font size**: `font-size: max(16px, 1rem)` on inputs - iOS Safari auto-zooms when focusing inputs below 16px. Don't suppress with `maximum-scale=1` (breaks accessibility zoom).

## Touch, hover, motion

**Touch targets** - in `globals.css` inside `@layer base`:
```css
@media (pointer: coarse) {
  button, a, [role="button"] { min-height: 44px; min-width: 44px; }
}
```

**Hover gating** - Tailwind's `hover:` variants handle most cases. For transforms that look broken without hover-off:
```css
@media (hover: hover) and (pointer: fine) {
  .hover-lift:hover { transform: translateY(-4px); }
}
```

**Reduced motion** - use Tailwind's built-in variants:
```jsx
<div className="motion-safe:animate-fade-in motion-reduce:animate-none">
```

## Modern CSS patterns

### :has() for content-conditional layouts

Style elements based on descendants or state without JavaScript:

```css
.card:has(.card__image) { grid-template-columns: 200px 1fr; }
.layout:has(.sidebar) { grid-template-columns: 1fr 300px; }
.form-row:has(input:invalid) { border-color: red; }
```

`:has()` responds to content/state. Container queries respond to available space. They complement each other. ~95% support.

### Logical properties

Layout in terms of content flow (inline/block) instead of physical direction (left/right). Adapts automatically to RTL.

```css
.article { max-inline-size: 65ch; padding-inline: var(--space-m); margin-inline: auto; }
.pull-quote { border-inline-start: 4px solid var(--accent); padding-inline-start: 1rem; }
```

Fully supported. Biggest payoff on multilingual projects; LTR-only it's future-proofing.

## AI pitfalls checklist

Scan AI-generated responsive code for these before shipping:

- [ ] `height: 100vh` - replace with `svh` + `vh` fallback
- [ ] `max-width` media queries - indicates desktop-first, use `min-width`
- [ ] Flex children without `min-width: 0` (when content could be dynamic)
- [ ] `overflow: hidden` on parent of sticky/fixed element - use `overflow: clip` instead
- [ ] `position: fixed` inside `transform`/`filter`/`will-change` ancestor (silently breaks)
- [ ] Input `font-size` below 16px - iOS auto-zoom trigger
- [ ] Missing `env(safe-area-inset-*)` on fixed header/bottom nav (needs `viewport-fit=cover`)
- [ ] Z-index values above 10 - probable stacking context confusion, use `isolation: isolate`
- [ ] Fixed bottom elements with no virtual keyboard accommodation
- [ ] `display: none` for mobile/desktop variants - duplicate DOM, use one adaptive component
- [ ] Images without `width`/`height` attributes - causes layout shift
- [ ] Sticky in flex/grid without `align-self: start` - child stretches full height, can't stick
- [ ] No `max-width` on content containers - unreadable lines on ultrawide
- [ ] `flex-wrap` missing on containers that should wrap
- [ ] `object-fit` missing on images in fixed-size containers
- [ ] Fixed pixel widths without `max-width` companion

## Testing

### The drag-resize habit

In Chrome DevTools device mode (`Cmd+Shift+M`), set to Responsive, then slowly drag the right handle from 280px to 2560px. Don't jump between preset breakpoints - drag continuously. This catches content overflow, text collision, and layout collapse at unexpected widths.

### Priority viewports (2026 market share)

| Priority | Width | Represents |
|----------|-------|-----------|
| 1 | 390px | iPhone 12-15 |
| 2 | 360px | Most common Android |
| 3 | 1920px | Dominant desktop |
| 4 | 768px | iPad / tablet |
| 5 | 320px | Smallest phone (stress test) |

### 10-point check (at each viewport)

1. No horizontal scroll
2. Text overflow - long words, URLs, usernames breaking containers
3. Images not overflowing, `max-width: 100%` applied
4. Touch targets 44px minimum on mobile
5. Navigation reachable and usable
6. Typography readable (16px min body), no clipping
7. Flex/grid wrapping where expected
8. Positioned elements not overlapping or off-screen
9. Z-index stacking correct (modals, dropdowns, tooltips)
10. Sticky elements sticking, not overlapping each other

### Edge cases that bite

- 280px (Galaxy Fold inner screen) - overflow here signals deeper problems
- 768x1024 portrait - tablets often treated as desktop incorrectly
- Browser zoom 200% - WCAG AA requirement, text must reflow
- Landscape phone - different safe area insets, often forgotten
- Keyboard open on mobile - fixed bottom elements displaced

## Pretext

Use Pretext for text measurement without DOM reflow. Use Tailwind for everything else.

### Install

```bash
bun add @chenglou/pretext
```

### Core API

```js
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Your text here', '16px Inter')  // one-time: measure with canvas
const { height, lineCount } = layout(prepared, width, 24) // hot path: pure math, no DOM
```

`prepare()` is expensive once. `layout()` is cheap forever - call it on every resize, every width change. No reflow.

### Rich API (manual lines, shrink-wrap, text around obstacles)

```js
import { prepareWithSegments, layoutWithLines, walkLineRanges, layoutNextLine } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, '18px "Helvetica Neue"')

// all lines at a fixed width
const { lines } = layoutWithLines(prepared, 320, 26)

// shrink-wrap: find tightest width that fits
let maxW = 0
walkLineRanges(prepared, 320, line => { if (line.width > maxW) maxW = line.width })

// flow text around a floated image
let cursor = { segmentIndex: 0, graphemeIndex: 0 }, y = 0
while (true) {
  const w = y < image.bottom ? columnWidth - image.width : columnWidth
  const line = layoutNextLine(prepared, cursor, w)
  if (!line) break
  cursor = line.end
  y += lineHeight
}
```

### When to reach for Pretext

Anytime layout depends on text height: virtualized lists (exact row heights), masonry (card heights before placement), shrink-wrapping (chat bubbles, tooltips), text flowing around obstacles, preventing layout shift on load, and resize performance (no reflow storms).

### Caveats

Use a named font - not `system-ui` (macOS resolves differently in canvas vs DOM). The `font` string in `prepare()` must match your CSS `font` shorthand exactly. Same for `lineHeight` matching CSS `line-height`. Default target is `white-space: normal`, `overflow-wrap: break-word`. Pass `{ whiteSpace: 'pre-wrap' }` for textarea-like text.

## Pretext + Tailwind together

CSS handles the fluid foundations. Pretext handles layout decisions that need text measurement.

```tsx
import { prepare, layout } from '@chenglou/pretext'
import { useRef, useState, useEffect } from 'react'

function useTextHeight(text: string, font: string, lineHeight: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const preparedRef = useRef(prepare(text, font))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const { height } = layout(preparedRef.current, el.clientWidth, lineHeight)
      setHeight(height)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, lineHeight])

  return { ref, height }
}
```

## Framer Motion integration

Framer Motion handles the *feel* of layout transitions. Pretext handles the *math*. Use the `layout` prop for smooth breakpoint recomposition:

```tsx
import { motion } from 'framer-motion'

<motion.div layout className="flex flex-col lg:flex-row gap-fluid-m">
  <motion.div layout className="lg:w-1/2">...</motion.div>
  <motion.div layout className="lg:w-1/2">...</motion.div>
</motion.div>
```

The `layout` prop animates between layout states - elements morph instead of snapping when the grid recomposes at a breakpoint.
