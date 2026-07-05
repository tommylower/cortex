# Animation Framework

Use this reference when you need the full motion decision process, not just the short rules in `SKILL.md`.

## 1. Should this animate at all?

Ask how often the user will see the animation.

| Frequency | Decision |
| --- | --- |
| `100+` times per day | Remove animation entirely |
| Tens of times per day | Remove or drastically reduce |
| Occasional UI | Standard animation is fine |
| Rare or first-run moments | Delight can make sense |

Never animate keyboard-triggered interactions. They must feel instant.

## 2. What is the purpose?

Every animation should justify itself with one of these:

- Spatial consistency
- State indication
- Explanation
- Feedback
- Preventing a jarring change

If the best justification is "it looks cool," keep pushing until the answer is more concrete or delete the animation.

## 3. What easing should it use?

Choose easing by behavior:

- Entering or exiting UI: `ease-out`
- Movement or morphing on screen: `ease-in-out`
- Hover and color transitions: `ease`
- Constant motion: `linear`

Avoid `ease-in` for standard UI motion. It delays the first visible response and makes the interface feel slow.

Recommended curves:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

Use [easing.dev](https://easing.dev/) or [easings.co](https://easings.co/) when you need stronger custom curves.

## 4. How fast should it be?

| Element | Duration |
| --- | --- |
| Button press feedback | `100-160ms` |
| Tooltip or small popover | `125-200ms` |
| Dropdown or select | `150-250ms` |
| Modal or drawer | `200-500ms` |
| Marketing or explanatory motion | Can be longer |

Standard UI should usually stay under `300ms`.

Perceived performance matters:

- A faster spinner feels like a faster app.
- A `180ms` dropdown feels more responsive than a `400ms` one.
- Tooltips that skip animation after the first hover make a toolbar feel faster overall.

## Springs

Use springs when the interaction benefits from physical continuity:

- Drag interactions with momentum
- Decorative mouse tracking
- Gesture-driven motion that can be interrupted
- Elements that should feel alive rather than clocked

Example:

```jsx
import { useSpring } from 'framer-motion';

const springRotation = useSpring(mouseX * 0.1, {
  stiffness: 100,
  damping: 10,
});
```

Recommended configurations:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Keep bounce subtle. Most UI wants little or no bounce.

## Stagger

Use stagger when multiple decorative elements appear together and you want a cascade instead of a dump.

```css
.item {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeIn 300ms ease-out forwards;
}

.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
.item:nth-child(4) { animation-delay: 150ms; }
```

Keep delays short, usually `30-80ms`. Never block interaction on a decorative stagger.

## Debugging Motion

Review animations in three ways:

1. Slow motion. Increase duration to `2-5x` or use the browser animation inspector.
2. Frame-by-frame. Step through transitions and look for timing mismatches.
3. Real devices. Gesture quality is hard to judge correctly on desktop alone.

In slow motion, check:

- whether colors crossfade cleanly
- whether easing starts and stops correctly
- whether transform origin is correct
- whether related properties stay in sync
