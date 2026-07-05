# Performance and Accessibility

Use this reference when the question is less about visual taste and more about whether the implementation will hold up.

## Performance Rules

### Animate `transform` and `opacity` first

These are the safest default properties for smooth UI motion because they avoid layout-heavy work.

### Be careful with inherited CSS variables

Updating a CSS variable on a large parent can trigger style recalculation across the subtree. If only one element is moving, update its `transform` directly instead.

```js
element.style.transform = `translateY(${distance}px)`;
```

### Know the Motion/Framer Motion tradeoff

Shorthand props like `x`, `y`, and `scale` are convenient, but when the main thread is busy they can stutter more than a direct `transform` string.

```jsx
<motion.div animate={{ transform: "translateX(100px)" }} />
```

### CSS beats JS when the browser is busy

Predetermined CSS animations often stay smoother during page loads because they are not driven by per-frame JavaScript. Use JS when the animation must react to live state or gestures.

### WAAPI is a useful middle ground

The Web Animations API gives you programmatic control without pulling in a full animation library.

```js
element.animate(
  [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
  {
    duration: 1000,
    fill: 'forwards',
    easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
  }
);
```

## Reduced Motion

Reduced motion does not mean zero feedback. Keep opacity and color transitions that help comprehension, but remove transform-heavy movement that can cause discomfort.

```css
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: fade 0.2s ease;
  }
}
```

```jsx
const shouldReduceMotion = useReducedMotion();
const closedX = shouldReduceMotion ? 0 : '-100%';
```

## Hover on Touch Devices

Touch devices can trigger hover in misleading ways. Gate hover-only polish behind:

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.05);
  }
}
```

## Sonner Principles

These principles generalize beyond toast libraries:

1. Developer experience matters. Adoption rises when setup is obvious and light.
2. Defaults matter more than options. Most people will never customize.
3. Naming creates identity. Memorability can beat generic descriptiveness.
4. Edge cases should disappear into the product instead of leaking into the API.
5. Dynamic UI wants transitions more often than keyframes.
6. Documentation is part of the product.

## Cohesion

Animation values should match the personality of the component and the broader product. A playful component can tolerate more bounce. A serious dashboard should feel crisp and controlled.

## Asymmetry

Make exit or release motion faster than the action that required deliberate input.

```css
.overlay {
  transition: clip-path 200ms ease-out;
}

.button:active .overlay {
  transition: clip-path 2s linear;
}
```

## Fresh-Eyes Review

Review your work the next day when possible. Animation flaws that disappear during implementation often become obvious with distance.
