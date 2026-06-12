# Nothing Design System — Animation

## Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--motion-fast` | `150ms` | Hover, focus, press feedback |
| `--motion-base` | `220ms` | Toggle, segmented control, local state changes |
| `--motion-slow` | `360ms` | Page-level fades and modal entrance |
| `--ease-out` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Default easing |
| `--ease-linear` | `linear` | Progress, loaders, mechanical indicators |

## Interaction rules

- Hover brightens border or text one level. No scale, no shadow, no glow.
- Press feedback is a 1px inward nudge or immediate color inversion.
- Transitions should feel mechanical and precise, never springy.
- Prefer opacity and color changes over movement.
- Disable non-essential motion when `prefers-reduced-motion: reduce`.

## Named animations

### Segmented loader

Trigger: loading states that need visible progress without skeleton screens.

```css
@keyframes nd-segment-pulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}

.nd-segment-loader [data-active="true"] {
  animation: nd-segment-pulse var(--motion-base) var(--ease-linear) infinite;
}
```

### Panel fade

Trigger: modal, sheet, and inline disclosure entrance.

```css
.nd-panel-enter {
  opacity: 0;
  transition: opacity var(--motion-slow) var(--ease-out);
}

.nd-panel-enter[data-open="true"] {
  opacity: 1;
}
```
