---
name: dialkit
description: Add DialKit floating control panel for tuning animations and visual properties. Use when the user explicitly asks for DialKit, live dials, sliders, spring controls, or runtime visual tuning.
author: Josh Puckett (https://github.com/joshpuckett/dialkit)
---

# DialKit

DialKit is a development-only floating control panel for React: sliders,
toggles, color pickers, spring and easing editors, and a timeline, wired to
live UI values. Verified against **dialkit 2.0.2** (2026-09-22).

If `../dev-overlays.md` exists, read the shared dev-overlay rules there first.

## Install

Install as dev dependencies, with the repo's own package manager:

```bash
npm install -D dialkit motion     # or: bun add -d dialkit motion
```

`motion` is a peer dependency (`>=11.0.0`). Non-React peers (`solid-js`,
`svelte`, `vue`, `motion-v`) are declared but only matter for those subpath
entries; npm will not ask for them in a React project.

## Setup (Next.js App Router)

Two files, so neither the panel's JavaScript nor its stylesheet reaches a
production bundle. A static `import "dialkit/styles.css"` is **not** removed by
a `NODE_ENV` guard, so it has to live behind the dynamic import.

`components/dev-tools-panel.tsx` — the dynamic half:

```tsx
"use client";

import "dialkit/styles.css";
import { DialRoot } from "dialkit";

export default function DevToolsPanel() {
  return <DialRoot position="bottom-right" theme="light" />;
}
```

`components/dev-tools.tsx` — the guard:

```tsx
"use client";

import dynamic from "next/dynamic";

const DevToolsPanel = dynamic(() => import("@/components/dev-tools-panel"), {
  ssr: false,
});

export function DevTools() {
  if (process.env.NODE_ENV !== "development") return null;
  return <DevToolsPanel />;
}
```

Mount `<DevTools />` as a sibling of `{children}` in the app shell. The chunk is
still emitted by `next build`; no prerendered page references it, so a visitor
never downloads it.

### `DialRoot` props

`position` (`top-right` | `top-left` | `bottom-right` | `bottom-left`),
`defaultOpen`, `mode` (`popover` | `inline`), `theme` (`light` | `dark` |
`system`), `productionEnabled` (default false), `onOpenChange`.

## Usage

```tsx
import { useDialKit } from "dialkit";

const params = useDialKit("Card", {
  blur: [24, 0, 100],
  opacity: [0.8, 0, 1],
  scale: 1.18,
  color: "#ff5500",
  visible: true,
  spring: { type: "spring", visualDuration: 0.3, bounce: 0.2 },
});
```

`useDialKit(name, config, options?)` returns the resolved values.
`useDialKitController(name, config, options?)` returns a controller when you
need to write values back. `useDialTimeline` + `<DialTimeline />` (export
`dialkit/timeline`) drive a scrubbable timeline; `DialStore` (`dialkit/store`)
is the imperative store. Other frameworks: `createDialKit` from
`dialkit/solid`, `dialkit/svelte`, or `useDialKit` from `dialkit/vue`. A
framework-free build lives at `dialkit/vanilla`.

## Config types

- `[default, min, max, step?]` → slider
- `number` → auto-range slider
- `boolean` → toggle
- `"#hex"` → color picker
- `"text"` → text input
- `{ type: "select", ... }` → dropdown
- `{ type: "spring", ... }` → spring editor
- `{ type: "easing", ... }` → easing editor
- `{ type: "action" }` → button trigger
- `{ type: "image", ... }` → image picker
- `{ nested: ... }` → collapsible folder

Also available as standalone components: `Slider`, `Toggle`, `Folder`,
`ButtonGroup`, `SpringControl`, `TransitionControl`, `TextControl`,
`SelectControl`, `ColorControl`, `ImageControl`, `DialPad`, `PresetManager`,
`ShortcutsMenu`.

## Scoping dials to one component (token-driven codebases)

In a codebase where components style themselves through token variables
(`px-(--space-inset)`, `rounded-card`, `bg-paper-light`), dialling the tokens at
`:root` repaints the whole site — one slider, everything moves. That is almost
never what the operator wants.

Scope instead by rebinding the variables on the component's own root:

1. Stamp each component root with `data-dial="<id>"` (inert: no import, no hook,
   no bundle weight). A generator script can do this and emit a registry of
   which token variables each component actually consumes — that set is its
   knobs.
2. Give the panel a `select` of components plus the selected one's knobs.
3. Write one `<style>` element: `[data-dial="path-card"] { --space-inset: 2rem }`.
   CSS custom properties inherit, so the rebinding reaches that subtree only.

This keeps `useDialKit` out of product files entirely, so there is no hook code
to strip afterwards. Two limits worth stating up front: a descendant that reads
the same variable moves with its parent, and the trick cannot separate two uses
of one role inside a single component (a `sand` border and a `sand` rule move
together) — that needs a real prop.

For colors, prefer a **role swap** (`--color-sand: var(--color-slate-light)`)
over a free color picker: it keeps the palette closed and sidesteps hex literals
in files a tokens-only gate scans.

## Notes

- Use during polish: animation, spring, spacing, shadow, and color tuning.
- After tuning, hardcode the final values as defaults.
- Dial config can stay for future passes as long as it remains dev-only.
- A tokens-only prebuild gate will reject a raw hex in a dial config. Keep color
  dials out of gated files, or grandfather the file.
- Works alongside Agentation and Interface Kit in `DevTools.tsx`.
