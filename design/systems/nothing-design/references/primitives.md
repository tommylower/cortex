# Nothing Design System — Primitives

## Hero instrument

Anatomy: mono label, one display-scale value or headline, compact supporting copy, optional dot-matrix field.

Implementation recipe:

```css
.nd-hero-instrument {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-4xl) var(--space-xl);
  background: var(--black);
  color: var(--text-primary);
}
```

Responsive behavior: keep the hierarchy vertical on mobile; move supporting data into a side column at `lg` and above.

## Data rail

Anatomy: vertical or horizontal rail of stat rows with label, value, unit, and optional trend indicator.

Implementation recipe:

```css
.nd-data-rail {
  display: flex;
  flex-direction: column;
  border-block-start: 1px solid var(--border);
}
```

Responsive behavior: vertical on mobile, horizontal only when each item keeps a 44px touch target and readable value.

## Technical section

Anatomy: label, heading, body, one component-in-context sample, hairline divider.

Implementation recipe:

```css
.nd-technical-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding-block: var(--space-3xl);
  border-block-start: 1px solid var(--border);
}
```
