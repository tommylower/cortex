---
name: css-interaction-tips
description: "Quick-reference recipes for common CSS interaction and animation problems: button press feedback, smooth element entrances, hover flicker fixes, popover transform-origin, sequential tooltip timing, mobile tap targets, hover-on-touch issues, and subtle blur masking. Use when polishing UI interactions, fixing janky animations, making buttons feel responsive, addressing hover bugs on mobile, or any micro-interaction tuning. Triggers: hover, transition, button feel, tap target, tooltip, popover, animation jitter, interaction polish, micro-interaction, will-change, first-frame stutter, gpu layer, compositing."
---

# CSS Interaction Tips

Quick-reference for common CSS interaction and animation scenarios. Use when working on hover effects, transitions, button states, tooltips, popovers, tap targets, or any UI interaction polish.

## Practical Tips

| Scenario | Solution |
|---|---|
| Make buttons feel responsive | Add `transform: scale(0.97)` on `:active` |
| Element appears from nowhere | Start from `scale(0.95)`, not `scale(0)` |
| Shaky/jittery animations | `will-change` on the named property, only if it actually animates (see will-change section) |
| Hover causes flicker | Animate child element, not parent |
| Popover scales from wrong point | Set `transform-origin` to trigger location |
| Sequential tooltips feel slow | Skip delay/animation after first tooltip |
| Small buttons hard to tap | Use 44px minimum hit area (pseudo-element) |
| Something still feels off | Add subtle blur (under 20px) to mask it |
| Hover triggers on mobile | Use `@media (hover: hover) and (pointer: fine)` |

## Code Snippets

### Responsive button press
```css
button:active {
  transform: scale(0.97);
  transition: transform 0.1s ease;
}
```

### Smooth element entrance (not jarring)
```css
.element {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.element.visible {
  transform: scale(1);
  opacity: 1;
}
```

### Fix jittery animation
```css
.animated {
  will-change: transform;
}
```

## will-change (when it helps, when it is a no-op)

Source: https://jakub.kr/components/will-change-in-css

The mental model: browsers render in three stages — Layout (CPU), Paint
(CPU + memory), Compose (GPU). Composite-friendly properties (`transform`,
`opacity`, `filter`, `clip-path`, `mask`) can skip Layout and Paint
entirely. `will-change` is a hint that lets the browser promote the element
to its own GPU layer during idle time, so the promotion cost isn't paid on
the animation's first frame — that first-frame stutter is the specific
thing it fixes. Safari shows the most noticeable improvement.

Rules:

1. Only on elements that actually animate, and name the exact properties
   (`will-change: transform, opacity`) — same discipline as never using
   `transition-property: all`.
2. Never universal (`* { will-change: transform }` is a bug): every
   promoted layer costs real memory.
3. It does nothing for Layout/Paint properties (`top`, `background`,
   `color`, `width`) — "the browser just reserves memory for nothing".
   If an animation is janky because it animates a paint property, fix the
   property choice first; will-change cannot rescue it.
4. Best applied just-in-time when possible: on the trigger's hover/focus
   for a panel about to open, removed when the animation family is done.
   A permanent will-change on an always-mounted element is a permanent
   memory hold — sometimes fine (one small cursor), sometimes not (every
   card on a page).
5. It is not a magic switch. Browsers already promote well on their own;
   reach for it only after seeing a first-frame stutter or Safari jank on
   a composite-friendly animation.

```css
/* just-in-time promotion: hint while the open is imminent */
.menu-trigger:hover + .menu,
.menu-trigger:focus-visible + .menu {
  will-change: transform, opacity;
}
```

### Large tap target via pseudo-element
```css
button {
  position: relative;
}
button::after {
  content: '';
  position: absolute;
  inset: -10px; /* expands hit area by 10px on all sides */
}
```

### Hover-only on desktop
```css
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    /* hover styles here */
  }
}
```

### Popover from correct origin
```css
.popover {
  transform-origin: top left; /* match to trigger position */
  transform: scale(0.95);
  transition: transform 0.15s ease;
}
.popover.open {
  transform: scale(1);
}
```
