---
name: view-transitions
description: "Implement native React and browser View Transitions for page transitions, route changes, shared element transitions, list reorder animations, Suspense reveals, and directional navigation. Use when the user mentions ViewTransition, startViewTransition, shared element transition, native page transitions, route animation, transition types, or animating UI states without a third-party motion library."
author: Vercel Labs react-view-transitions adapted for Cortex
---

# View Transitions

Use native View Transitions when continuity between UI states matters and the app can gracefully skip animation in unsupported browsers.

Source: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions

## When to Use

- list-to-detail navigation
- image or card shared-element morphs
- route transitions with a clear spatial model
- Suspense reveals where new content should appear softly
- list reorders where identity matters

Do not use directional slides for unrelated tabs or unordered navigation. A transition must communicate continuity, depth, order, or arrival.

## Availability

- Chromium: supported.
- Safari and Firefox support is improving; verify target browsers before relying on custom effects.
- Unsupported browsers skip the animation path.

For broad product surfaces, keep transitions optional and nonessential.

## React Pattern

```tsx
import { ViewTransition, startTransition } from "react";

export function ResultCard({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={`result-${id}`}>
      {children}
    </ViewTransition>
  );
}

function openDetail(id: string) {
  startTransition(() => {
    router.push(`/items/${id}`);
  });
}
```

## Placement Rule

`<ViewTransition>` should wrap the DOM node that appears, exits, or shares identity. Wrapping it in extra DOM can suppress enter/exit behavior.

## CSS Recipes

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(fade) {
    animation: vt-fade-out 160ms ease both;
  }

  ::view-transition-new(fade) {
    animation: vt-fade-in 220ms ease both;
  }
}

@keyframes vt-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vt-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

## Rules

- Name shared elements uniquely, such as `photo-${id}`.
- Ensure only one mounted element uses a given transition name at a time.
- Do not fade out the whole page when a shared element is morphing; it weakens continuity.
- Respect reduced motion.
- Prefer simple fades for lateral tab changes.
- Use directional motion only for hierarchy, ordered sequences, or forward/back navigation.

## Verification

Before shipping:

1. Test supported and unsupported browsers.
2. Test reduced motion.
3. Confirm browser back/forward behavior is acceptable.
4. Confirm transition names do not collide in modals, lists, or duplicated components.
