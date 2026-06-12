# platform mapping

this file connects the design package to implementation.

## target stack

example assumptions:

- React.
- CSS variables for semantic tokens.
- Tailwind-style utilities or class recipes for layout and components.
- component files under `src/components/`.

replace these with actual project paths in a live package.

## token mapping

example CSS variable shape:

```css
:root {
  --color-background: #f7f7f2;
  --color-surface: #ffffff;
  --color-border-subtle: #deded4;
  --color-text: #1d1e1a;
  --color-text-muted: #66695d;
  --color-accent: #2357d6;
}
```

tailwind v4-style mapping, if the project uses it:

```css
@theme inline {
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-border-subtle: var(--color-border-subtle);
  --color-text: var(--color-text);
  --color-text-muted: var(--color-text-muted);
  --color-accent: var(--color-accent);
}
```

## component targets

expected implementation targets:

```text
src/components/app-shell.tsx
src/components/page-header.tsx
src/components/toolbar.tsx
src/components/ui/button.tsx
src/components/ui/panel.tsx
src/components/ui/status-chip.tsx
```

## divergence rules

- if code and docs disagree, inspect the code before changing the docs.
- if a token is missing, add it to the design-system docs before using it broadly.
- if a component needs a new variant, document the use case and state behavior.

open decisions:

- final CSS architecture.
- actual component library, if any.
- where accessibility tests or examples should live.
