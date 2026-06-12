---
name: loading-states
description: "Design and implement loading states, skeletons, spinners, progress indicators, and dot-matrix micro-loaders. Use when the user asks for a loader, loading state, skeleton, pending state, progress UI, shadcn loader, Dot Matrix, smooth loader animation, reduced-motion loading behavior, or empty/pending state polish."
author: zzzzshawn/matrix adapted for Cortex
---

# Loading States

Loading states should reduce uncertainty. Pick the least distracting treatment that tells the user the system is working.

Source: https://dotmatrix.zzzzshawn.cloud/

## Choose the Right Pattern

| Wait type | Pattern |
| --- | --- |
| Under 500ms | optimistic UI or no loader |
| 500ms to 2s | small spinner, dot loader, or inline status text |
| 2s+ | skeleton, progress region, or staged status |
| Known progress | progress bar with percent or steps |
| Background refresh | quiet inline state; avoid blocking |
| Empty data | empty state with one next action |

## Dot Matrix

Use Dot Matrix when the product wants a compact, crafted loader. It is React, TypeScript, Tailwind, and shadcn-oriented.

Install one loader through the shadcn registry:

```bash
npx shadcn@latest add @dotmatrix/dotm-square-3
```

Use it for small pending states, buttons, command palettes, creative tools, or branded surfaces. Avoid using multiple animated loaders on the same screen.

## Smooth Loader Rules

- Drive continuous opacity with `requestAnimationFrame`, not a coarse interval.
- Use smooth ramps (`smoothstep` style falloffs) instead of hard opacity thresholds.
- For path loaders, use a floating head position and a soft tail.
- Freeze or simplify animation for `prefers-reduced-motion`.
- Pause looping animation when off-screen.
- Keep loading motion calm in dense SaaS/admin interfaces.

## Accessibility Rules

- Use `aria-busy` on regions that are updating.
- Use `role="status"` or visible status text for important pending states.
- Do not rely on animation alone to communicate progress.
- Skeletons should match the final layout closely enough to prevent layout shift.
- Button-level loaders must preserve the button size and accessible name.

## Button Pending Pattern

```tsx
<button disabled={isPending} aria-busy={isPending}>
  {isPending ? <Spinner aria-hidden="true" /> : null}
  <span>{isPending ? "Saving..." : "Save Changes"}</span>
</button>
```

Keep the label specific. Prefer `Saving...` over generic `Loading...` when the action is known.

## Preflight

Before shipping:

- The layout does not jump when loading begins or ends.
- Reduced motion has a stable fallback.
- The pending state cannot be mistaken for disabled without progress.
- The user has a path forward if loading fails or returns empty.
