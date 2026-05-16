# Imagery

Status: **ready for the current runtime**.

## Brand Assets

Runtime assets live under `public/brand/`.

Core logos:

- `/brand/report-full.svg`
- `/brand/report-full-cream.svg`
- `/brand/report-icon.svg`
- `/brand/report-icon-cream.svg`
- `/brand/report-ios-save-icon.svg`

Product marks:

- `/brand/report-mark-investigate-active.png`
- `/brand/report-mark-investigate-rest.png`
- `/brand/report-mark-compliance-active.png`
- `/brand/report-mark-compliance-rest.png`
- `/brand/report-mark-institute-active.png`
- `/brand/report-mark-institute-rest.png`
- `/brand/report-mark-flywheel-active.png`
- `/brand/report-mark-flywheel-rest.png`

Rules:

- Use cream logo art on inverse ink surfaces.
- Use ink logo art on cream surfaces.
- The iOS save icon is a square ink-background asset with the cream full logo and red lead arrow. Keep it reserved for app/home-screen icon contexts, not inline page UI.
- Product marks may show rest/active states.
- Do not recolor raster product marks in CSS.

## Product Mark Treatment

- Home flywheel uses custom product marks as the primary visual system.
- Product heroes use `HeroMark` around custom mark components.
- Active states lean red; rest states stay ink/cream.
- Marks are large, centered, and inspectable. Avoid putting them inside decorative cards.

## Photography and Raster Images

Runtime image folders:

- `public/images/home/`
- `public/images/investigate/`
- `public/images/compliance/`
- `public/team/`

Treatment:

- Images sit inside bordered row structures, not stock-card layouts.
- Many section images use grayscale/resting opacity and transition to clearer active state when their row enters view.
- Feather images into the cream paper surface with `linear-gradient` overlays using `--color-surface-page`.
- Decorative images may have empty `alt=""`; meaningful portraits should use descriptive alt text.

## Halftone Editorial Set

The site uses a fixed set of seven hand-rendered halftone scenes rendered in cream + signal red. They are the only marketing illustrations on the surface. Source set is registered in the design-system deck (Slide 15 — Imagery · halftone editorial set).

Canonical mapping (Figma name → runtime path → primary placements):

| Figma            | Runtime path                                | Primary placements                                                                            |
| ---------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `main 1`         | `/images/home/about-halftone.webp`          | `about-hero`, `entity-definition` (thesis row), `report-hero`                           |
| `coins 1`        | `/images/home/entity-definition-01.webp`    | `compliance-hero`, `compliance/definition-block`, `three-verticals` (compliance card)         |
| `serve 1`        | `/images/home/who-we-serve-halftone.webp`   | `who-we-serve-hero`, `entity-definition` (problem row)                                        |
| `institute 1`    | `/images/home/institute-halftone.webp`      | `institute-hero`, `institute-overview`, `three-verticals` (institute card)                    |
| `scale 1`        | `/images/investigate/definition-01.webp`    | `investigate-hero`, `investigate/definition-block`, `three-verticals` (investigate card)      |
| `magnify 1`      | `/images/investigate/definition-02.webp`    | `investigate/definition-block` (problem row)                                                  |
| `compliance 1`   | `/images/compliance/definition-02.webp`     | `compliance/definition-block` (problem row)                                                   |

Treatment rules:

- Feather each cell into the page. Wrap the image in 90° + 180° `linear-gradient` overlays that fade to `var(--color-surface-page)`. The canonical helper is `FeatheredImageCell` in `components/sections/entity-definition.tsx` — reuse, don't reimplement.
- Grayscale at rest, color on scroll-in. `useCenterActive` (IntersectionObserver, `-30% 0px -30% 0px`) toggles `grayscale opacity-70` → `grayscale-0 opacity-100` over 500ms `cubic-bezier(0.23, 1, 0.32, 1)`. Respect `motion-reduce`.
- `alt=""` by default. These are scene decoration paired with a text cell, not informational photography.

Anti-patterns specific to this set:

- Do not recolor or invert. The cream + signal-red duotone is fixed.
- Do not use a halftone as a solo hero image. It always pairs with a feather gradient and an adjacent text cell.
- Do not tile or repeat. Halftones are scenes, not patterns. The procedural paper texture handles surface fill.
- Do not introduce a new halftone without adding the file under `public/images/...` AND registering it in the canonical mapping above and on the deck slide.

## Logo Loop

Runtime logos live under `public/logos/`.

Rules:

- SVG logo assets should be black marks on transparent/empty space.
- Do not include white fills in SVG logos.
- The loop may mix image logos and text fallback names.
- Group metadata can classify logos as customers, blockchain analytic partners, or general partners, but the current UI renders one flat loop.
- Do not use raw PNGs in the marquee when an SVG exists.

## Iconography

Runtime interface icons come from:

- `components/ui/icons/streamline-cyber`
- `components/ui/icons/verticals`

Rules:

- Use Streamline Cyber icons for UI markers.
- Default marker color is `text-accent`.
- Do not import a second icon library for production UI.
- Keep icons line-like, technical, and functional.

## Procedural Paper Texture

Runtime: `components/paper-background.tsx`.

- Uses `@paper-design/shaders-react` `PaperTexture`.
- Mounted as a fixed pointer-inert layer with `data-paper-background="procedural-paper-texture"`.
- Uses low-opacity SLATE grain `#9A928724`.
- Blends with `mix-blend-multiply`.
- No decorative gradient blobs, orbs, or stock atmospheric backgrounds.

## 3D and GLB Pipeline

Earlier notes describe a possible GLB architectural icon pipeline. That pipeline is not currently shipped in the runtime and no production GLB assets are present under `public/`.

Current rule:

- Treat GLB architectural icons as planned/exploratory, not as current design-system truth.
- If reintroduced, document the runtime renderer, asset paths, fill/stroke treatment, caching, interaction, and fallback images in this file and in `platform-mapping.md`.

## Anti-Patterns

- No generic stock imagery.
- No blurred dark atmospheric hero media.
- No decorative orbs or blobs.
- No unapproved logo variants.
- No image-only proof points. Proof must remain readable as text.
- No new visual asset category without documenting source, treatment, and runtime mapping.
