# Nothing Design System — Page Moments

## Empty

Centered, quiet, and precise. Use one mono label, one short sentence, and optional dot-matrix illustration.

```css
.nd-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-4xl) var(--space-xl);
  color: var(--text-secondary);
}
```

## Loading

Use bracket text (`[LOADING]`) or a segmented bar. No skeleton screens.

## Error

Use inline status copy with an `[ERROR]` prefix, red border or red value text. Avoid red filled backgrounds.

## Success

Use inline `[SAVED]`, `[CONNECTED]`, or equivalent status text near the triggering control. Avoid toast popups.
