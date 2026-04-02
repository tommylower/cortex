# Responsive Design with Pretext

Build layouts that recompose across every screen size. Use Pretext for text measurement without DOM reflow. Use Tailwind for everything else.

## Pretext

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

`prepare()` is expensive once. `layout()` is cheap forever — call it on every resize, every width change. No reflow.

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

Use a named font — not `system-ui` (macOS resolves differently in canvas vs DOM). The `font` string in `prepare()` must match your CSS `font` shorthand exactly. Same for `lineHeight` matching CSS `line-height`. Default target is `white-space: normal`, `overflow-wrap: break-word`. Pass `{ whiteSpace: 'pre-wrap' }` for textarea-like text.

## Tailwind Responsive Foundations

### Fluid scale in tailwind.config

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

### Non-negotiable defaults

**Images**: `<img className="max-w-full h-auto" />` or set globally in your CSS layer.

**Content width**: `<div className="w-[min(90%,1200px)] mx-auto">` — content never runs edge-to-edge on wide screens.

**Intrinsic grids** — columns appear and disappear without breakpoints:
```jsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-fluid-m">
```

### Touch, hover, motion

**Touch targets** — in `globals.css` inside `@layer base`:
```css
@media (pointer: coarse) {
  button, a, [role="button"] { min-height: 44px; min-width: 44px; }
}
```

**Hover gating** — Tailwind's `hover:` variants handle most cases. For transforms that look broken without hover-off:
```css
@media (hover: hover) and (pointer: fine) {
  .hover-lift:hover { transform: translateY(-4px); }
}
```

**Reduced motion** — use Tailwind's built-in variants:
```jsx
<div className="motion-safe:animate-fade-in motion-reduce:animate-none">
```

### Breakpoints

Tailwind's defaults (`sm`, `md`, `lg`, `xl`, `2xl`) are fine. The principle: at each breakpoint, *recompose* — don't just shrink. Stack on mobile, side-by-side on desktop. Off-canvas nav becomes inline. Elements rearrange, not scale.

```jsx
<div className="flex flex-col lg:flex-row lg:items-center gap-fluid-m">
  <div className="lg:w-1/2">...</div>
  <div className="lg:w-1/2">...</div>
</div>
```

Mobile-first is a build order. Start at 320px, scale up.

## Pretext + Tailwind Together

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

The `layout` prop animates between layout states — elements morph instead of snapping when the grid recomposes at a breakpoint.
