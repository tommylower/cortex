# CSS Interaction Tips

Quick-reference for common CSS interaction and animation scenarios. Use when working on hover effects, transitions, button states, tooltips, popovers, tap targets, or any UI interaction polish.

## Practical Tips

| Scenario | Solution |
|---|---|
| Make buttons feel responsive | Add `transform: scale(0.97)` on `:active` |
| Element appears from nowhere | Start from `scale(0.95)`, not `scale(0)` |
| Shaky/jittery animations | Add `will-change: transform` |
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
