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

## Notes
- Dev tool only, never ships to production
- Wire up during polish/refinement phase for tuning animations, springs, spacing, shadows
- Remove or env-gate before deploy
