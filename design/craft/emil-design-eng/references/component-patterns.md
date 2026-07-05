# Component Patterns

Use this reference when you are implementing or reviewing interaction details.

## Press Feedback

Pressable UI should acknowledge input immediately.

```css
.button {
  transition: transform 160ms ease-out;
}

.button:active {
  transform: scale(0.97);
}
```

Keep active-state scale subtle, usually `0.95-0.98`.

## Never Animate From `scale(0)`

Starting at `scale(0)` looks like the element appears from nowhere. Start near `scale(0.95)` and pair it with opacity.

```css
.entering {
  transform: scale(0.95);
  opacity: 0;
}
```

## Origin-Aware Popovers

Popovers should scale from the trigger, not from center. Modals are the exception because they are centered in the viewport.

```css
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
```

## Tooltip Behavior

Delay the first tooltip so incidental hover does not trigger it. Once one tooltip is open, adjacent tooltips should open instantly and without animation.

```css
.tooltip {
  transition: transform 125ms ease-out, opacity 125ms ease-out;
  transform-origin: var(--transform-origin);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

## Transitions Over Keyframes

Use CSS transitions for dynamic UI that might be triggered repeatedly. Transitions retarget smoothly; keyframes restart from zero.

```css
.toast {
  transition: transform 400ms ease;
}
```

## Blur as a Bridge

If a crossfade still feels wrong after easing and timing changes, add a small blur during the transition.

```css
.button-content {
  transition: filter 200ms ease, opacity 200ms ease;
}

.button-content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
}
```

Keep blur restrained. Heavy blur is expensive, especially in Safari.

## `@starting-style`

Use `@starting-style` for enter transitions when support is acceptable.

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

## Transform Rules

- Percentage values in `translate()` are relative to the element's own size.
- `scale()` also scales children. That is often desirable.
- `transform-origin` is an invisible anchor point and should match the interaction.
- 3D transforms can add real depth when used intentionally.

Example:

```css
.wrapper {
  transform-style: preserve-3d;
}
```

## `clip-path`

`clip-path` is a strong option for precise reveals and overlays.

```css
.overlay {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms ease-out;
}

.button:active .overlay {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear;
}
```

Useful patterns:

- tab color transitions
- hold-to-delete confirmation
- image reveals on scroll
- comparison sliders

## Drag and Gesture Behavior

Use physical rules instead of arbitrary hard stops:

- Dismiss on meaningful velocity, not just distance
- Add damping past natural boundaries
- Capture pointer events during drag
- Ignore extra touches after drag starts
- Use friction instead of invisible walls

Velocity example:

```js
const timeTaken = new Date().getTime() - dragStartTime.current.getTime();
const velocity = Math.abs(swipeAmount) / timeTaken;

if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
  dismiss();
}
```
