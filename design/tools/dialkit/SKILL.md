---
name: dialkit
description: Add DialKit floating control panel for tuning animations and visual properties. Use when the user explicitly asks for DialKit, live dials, sliders, spring controls, or runtime visual tuning.
author: Josh Puckett (https://github.com/joshpuckett/dialkit)
---

# DialKit

DialKit is a development-only floating control panel for React: sliders, toggles, color pickers, and spring editors wired to live UI values.

Before editing, read the shared dev-overlay rules in `../dev-overlays.md`.

## Install

Install as dev dependencies:

```bash
bun add -d dialkit motion
```

Use the repo's existing package manager if it is not Bun.

## Setup

Create or update `src/components/DevTools.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";
import "dialkit/styles.css";

const DialRoot = dynamic(
  () => import("dialkit").then((mod) => ({ default: mod.DialRoot })),
  { ssr: false },
);

export function DevTools() {
  if (process.env.NODE_ENV !== "development") return null;
  return <DialRoot />;
}
```

Mount `<DevTools />` as a sibling of `{children}` in the app shell.

## Usage

```tsx
import { useDialKit } from "dialkit";

const params = useDialKit("Card", {
  blur: [24, 0, 100],
  opacity: [0.8, 0, 1],
  scale: 1.18,
  color: "#ff5500",
  visible: true,
  spring: {
    type: "spring",
    visualDuration: 0.3,
    bounce: 0.2,
  },
});
```

## Config Types

- `[default, min, max, step?]` -> slider
- `number` -> auto-range slider
- `boolean` -> toggle
- `"#hex"` -> color picker
- `{ type: "spring" }` -> spring curve editor
- `{ type: "action" }` -> button trigger
- `{ nested: ... }` -> collapsible folder

## Notes

- Use during polish/refinement for animation, spring, spacing, shadow, and color tuning.
- After tuning, hardcode the final values as defaults.
- Dial config can stay for future passes as long as it remains dev-only.
- Works alongside Agentation and Interface Kit in `DevTools.tsx`.
