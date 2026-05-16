# Motion

## Motion Thesis

Motion should feel operational: scanning, tracing, charging, flowing, revealing evidence. It should not feel decorative.

## Global Rules

- Use short, precise transitions.
- Prefer opacity, transform, color, and CSS custom-property animation.
- Respect `prefers-reduced-motion`.
- Do not animate layout in a way that changes content order or causes unexpected shifts.

## Core Interaction Motion

Buttons:

- fill wipe: `260ms cubic-bezier(0.23, 1, 0.32, 1)`
- hover lift: `translateY(-2px)`
- active: `translateY(-1px) scale(0.98)`

Navigation:

- dropdown enter: `180ms cubic-bezier(0.23, 1, 0.32, 1)`
- exits unmount immediately

Labels:

- `label-pulse` runs softly around the square signal mark

## Visual Systems

Radar:

- sweep rotation
- target drift
- critical target pulse
- status blink

Intelligence graph:

- edge pulses flow across chained segments
- node/hub pulses are subtle

Pillar scan icons:

- diagonal shimmer
- soft scan pulse
- module cycling on landing
- static green mode on platform

Why/Industries cards:

- desktop card visuals play once
- mobile can loop the active card
- hover replay is intentionally limited to visual cards

Loading screen:

- `LoadingScreen` is the full-screen brand loader and should be treated as a highlighted motion pattern.
- pixel battery cells charge across the module
- final green glow confirms the charged state
- upward exit clears the page without shifting underlying layout
- shown once per browser session through `sessionStorage`
- previewable with `?loader-preview`
- reduced-motion mode keeps the state change but shortens the transition

## Reduced Motion

Every major animation group has a reduced-motion override. New animations must include one.
