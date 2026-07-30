# Motion and Zoom

`prefers-reduced-motion`, zoom and reflow, and unit choices that respect user settings.

## prefers-reduced-motion

Make motion opt-in: wrap animations in `@media (prefers-reduced-motion: no-preference)` so users who asked for reduced motion get the static version by default, instead of you chasing every animation with an override.

```css
/* Good: motion is opt-in */
.card {
  /* static styles */
}
@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 200ms ease-out;
  }
}
```

```tsx
// Tailwind: motion-safe / motion-reduce variants
<div className="motion-safe:transition-transform motion-safe:hover:-translate-y-1" />
```

For an existing codebase where opt-in isn't feasible, the global kill switch is the fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

`0.01ms` rather than `none` so `animationend`/`transitionend` events still fire and JS that waits on them doesn't hang.

### What to disable vs reduce

Reduced motion means reduced, not eliminated: it targets vestibular triggers, not feedback.

| Disable entirely | Replace | Keep |
| --- | --- | --- |
| Parallax scrolling | Slide/scale/zoom transitions → opacity crossfade | Loading spinners and progress |
| Autoplaying video, GIFs, looping decoration | Smooth scrolling → instant jump | Instant state changes (hover color, focus ring) |
| Spinning, large-scale movement across the screen | Auto-rotating carousels → start paused | Brief functional feedback (button press) |

Interactive animations must be interruptible. Under reduced motion, decorative
autoplay stops and carousels start paused.

## Autoplay and timed UI

Motion the user didn't ask for, and UI that acts on its own schedule:

- **No autoplaying media without visible controls** (WCAG 2.2.2): anything that moves, blinks or updates automatically for more than 5 seconds needs a visible pause/stop control. Muted looping hero videos included.
- **Prefer explicit dismissal over timers.** Auto-dismissing toasts are acceptable only for low-stakes confirmations; anything containing an action, an error, or information the user may need to act on stays until dismissed. If a toast times out, give users enough time to read it and pause the timer while it is hovered or focused.
- **Never put critical information only in a timed element.** A vanished toast with the only link to an undo action is data loss on a schedule.

## Zoom and reflow

- **200% text resize** (WCAG 1.4.4): text must scale to 200% without loss of content or functionality, except captions and images of text. Never block browser zoom with `user-scalable=no` or `maximum-scale=1`.
- **Reflow at 320px** (WCAG 1.4.10): at 400% zoom on a 1280px viewport (equivalent to a 320px viewport) the page must work with vertical scrolling only: no two-dimensional scrolling except for genuinely 2D content (tables, maps, code blocks), which scroll inside their own container.

Fixed heights are what break under zoom: use `min-height` on anything containing text and let containers grow.

### rem vs px

Respect how the codebase is set up: if the project sizes in `px` (or an established Tailwind scale), stay consistent with it; don't introduce mixed units into someone else's system. Where you do have the choice (new code, or a codebase already on `rem`), `rem` respects the user's base font size and `px` ignores it:

| Use `rem` | Use `px` |
| --- | --- |
| `font-size` | Borders and hairlines |
| `max-width` of text containers | Focus outline width and offset |
| Media-query breakpoints (`@media (min-width: 48rem)`) | `box-shadow` details |
| Spacing that should scale with text | Fixed-size decorations |

Breakpoints are where the choice matters most: at a larger base font size, an `em`/`rem` query switches to the mobile layout when the text needs it; a `px` query doesn't.

## Primary sources

- [WCAG 2.2: Understanding Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WCAG 2.2: Understanding Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [WCAG 2.2: Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
