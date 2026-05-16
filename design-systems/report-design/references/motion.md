# Motion

Status: **ready for the current runtime**.

Motion clarifies state and hierarchy. It should feel mechanical, decisive, and inspectable. Avoid soft floating decoration unless it is tied to a product mark.

## Global Principles

- Respect `prefers-reduced-motion`.
- Keep hover transforms small.
- Use red motion as state reveal, not ambient decoration.
- Do not animate layout dimensions in a way that shifts neighboring content.
- Prefer opacity, transform, and color transitions.

## Hover Standard

**Use these defaults for every hover and `data-[active]` transition** unless the section has a documented exception (auto-cycle dwell on practitioner/values cards is 600ms with the drawer curve; paint-sweep rows are bound to their sweep duration — see below).

| Property | Duration | Curve |
| --- | --- | --- |
| Color / border / chip / opacity | `300ms` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Card lift (`transform`) + shadow | `300ms` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Accent reveal bar (`scale-y`) | `300ms` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Image filter / grayscale / portrait crossfade | `400ms` to `500ms` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Micro button arrow / chevron translate | `220ms` | `cubic-bezier(0.23, 1, 0.32, 1)` |

Rules:

- Never use bare `transition` — list the properties (`transition-[transform,box-shadow]`, `transition-colors`, etc.) so layout properties aren't accidentally tweened.
- Avoid the plain `ease-out` keyword for hover. It ramps too steep at the start and reads as "just appears." Use the curve above.
- When a hover triggers a **paint sweep** (e.g. `before:scale-x-100` filling a row in accent), sync the text and icon color transitions to the same duration and curve as the sweep, so the foreground inverts as the paint passes over it — not before. Current paint sweep: `380ms` / `cubic-bezier(0.22, 1, 0.36, 1)`.
- Auto-cycle cards (homepage proof, about values) keep `600ms` / `cubic-bezier(0.32, 0.72, 0, 1)` so the dwell and hover share the same feel.

## Other Common Durations

| Use | Duration |
| --- | --- |
| Mobile nav overlay | `200ms` |
| Gutter active overlay | `300ms` |
| First-visit overlay exit | `300ms` |
| Product mark float loop | `5800ms` to `6800ms` |
| Home flywheel cycle interval | `4000ms` |
| Home flywheel movement | `1050ms` |

## Curve Library

- General hover / state: `cubic-bezier(0.23, 1, 0.32, 1)` (long-tail ease-out).
- Paint-sweep rows (entity definition audience picker): `cubic-bezier(0.22, 1, 0.36, 1)`.
- Auto-cycle dwell (proof, values): `cubic-bezier(0.32, 0.72, 0, 1)` (drawer).
- Flywheel index motion: `cubic-bezier(0.58, 0, 0.08, 1)`.
- Flywheel caption words: `cubic-bezier(0.23, 1, 0.32, 1)`.

## First-Visit Loader

Runtime: `components/first-visit-loader.tsx` and `components/ui/report-icon-loader.*`.

- Plays once per browser using `localStorage` key `report-first-visit-loader-seen`.
- Locks body scroll while visible.
- Uses a fixed overlay at `z-[120]` on `bg-surface-page`.
- Black triangles enter left-to-right, back row to front row.
- The red arrow enters last and glows subtly after landing.
- Reduced motion renders the complete static mark.

Loader timing:

- Triangle animation: `820ms`.
- Triangle delay: `680ms + order * 58ms`.
- Arrow snap: `420ms`, delayed `200ms`.
- Arrow glow loop: `1800ms`, starts after `2000ms`.

## Home Flywheel

Runtime: `components/sections/report-flywheel.tsx`.

- Three product marks cycle through top/right/left slots.
- Cycle interval: `4000ms`.
- Movement duration: `1050ms`.
- Hovering the visual area pauses future cycle advances.
- If a handoff is already running, let it complete.
- Lower/rest marks are buttons. Clicking a lower mark promotes it to the top.
- While pointer remains near the flywheel, the cycle stays paused; pointer away resumes from the selected top item.
- Reduced motion keeps state changes immediate and readable.

## Product Hero Marks

Runtime: `components/ui/marks/hero-mark.*`.

- Product marks float only while in view.
- Hover transforms are desktop-pointer only.
- Reduced motion disables transitions and floating.

Variant behavior:

- Investigate: most motion, larger vertical travel, slight counterclockwise tilt.
- Compliance: steadier, smaller travel, slight clockwise tilt and scale.
- Institute: between the two, with small clockwise tilt.

## Gutter Motion

Runtime: `components/gutter-pinstripes.tsx`, `components/gutter-dot-grid.*`, and `app/globals.css`.

- Pinstripes rest as faint ink.
- When the containing section enters the viewport middle band, a red overlay fades in over `300ms`.
- The red stripe mask pulses down the gutter over `4s`.
- Reduced motion disables the stripe pulse and removes the mask.
- Dot grids pulse opacity on active dots over `1400ms`; reduced motion freezes to a readable active opacity.

## Card Hover Motion

Default raised card:

- Resting shadow: `0 8px 18px rgba(10, 10, 10, 0.06)`.
- Hover shadow: `0 14px 30px rgba(10, 10, 10, 0.10)`.
- Transform: `hover:-translate-y-0.5`.
- Reveal: bottom accent bar scales from `scale-y-0` to `scale-y-100`.
- Reduced motion removes the lift.

Do not apply the same reveal to every card when a more specific state cue exists. Institute access cards and role path cards intentionally vary their red reveal direction and intensity.

## Logo Loop

Runtime: `components/ui/logo-loop.*`.

- Below `md`, logos render in a static grid.
- At `md+`, logos run in a masked marquee.
- Marquee duration: `60s`, linear.
- Reduced motion stops the marquee.

## Mobile Nav

Runtime: `components/mobile-nav-menu.tsx`.

- Hamburger lines transform over `200ms`.
- Middle line fades over `150ms`.
- Overlay opacity transitions over `200ms`.
- Escape closes the menu.
- Body scroll locks while open.

## Anti-Patterns

- No bouncing playful motion.
- No decorative loops that are unrelated to state.
- No hover-only content on touch.
- No repeated heavy shadow/lift on dense rows.
- No motion that hides copy or traps a mark halfway through a state.
