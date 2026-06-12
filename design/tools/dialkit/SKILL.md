---
name: dialkit
description: Add DialKit floating control panel for tuning animations and visual properties
author: Josh Puckett (https://github.com/joshpuckett/dialkit)
---

# DialKit

A floating control panel for React: sliders, toggles, color pickers, spring editors wired directly to UI values. Dev-only tool for tuning animations, spacing, and visual properties in real time.

## Installation
```bash
npm install dialkit motion
```

## Setup

Add `<DialRoot />` to the root layout as a sibling (not wrapping children). Wrap in env check so it only renders in development:
```tsx
import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'

export default function Layout({ children }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && <DialRoot />}
    </>
  )
}
```

## Usage
```tsx
import { useDialKit } from 'dialkit'

const params = useDialKit('Card', {
  blur: [24, 0, 100],
  opacity: [0.8, 0, 1],
  scale: 1.18,
  color: '#ff5500',
  visible: true,
  spring: {
    type: 'spring',
    visualDuration: 0.3,
    bounce: 0.2,
  },
})
```

## Config types
- `[default, min, max, step?]` → slider
- `number` → auto-range slider
- `boolean` → toggle
- `"#hex"` → color picker
- `{ type: "spring" }` → spring curve editor
- `{ type: "action" }` → button trigger
- `{ nested: ... }` → collapsible folder

## Production Rules (strict)

- install as devDependency only: `bun add -d dialkit motion`
- NEVER import outside a `NODE_ENV === "development"` gate
- NEVER add to layout.tsx directly. mount inside `src/components/DevTools.tsx` using `next/dynamic` with `{ ssr: false }`
- if build fails on vercel, check dialkit/motion imports first
- only install when the user explicitly asks (e.g. "add dialkit"). never auto-scaffold

## Notes
- dev tool only, never ships to production
- use during polish/refinement phase for tuning animations, springs, spacing, shadows
- after tuning, hardcode the final values as defaults. the dial config can stay for future passes
- works alongside Agentation and Interface Kit as siblings in DevTools.tsx
