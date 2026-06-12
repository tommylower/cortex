# Fluid Functionalism Component Inventory

Current snapshot from `https://www.fluidfunctionalism.com/r/registry.json` on 2026-06-09. Query the live registry before a project install if exact availability matters.

## Foundations

| Install name | Type | Use |
| --- | --- | --- |
| `surfaces` | theme | Eight-level surface and shadow ladder for nested elevation. |
| `utils` | lib | `cn` helper using `clsx` and `tailwind-merge`. |
| `springs` | lib | Framer Motion spring presets: fast, moderate, slow. |
| `font-weight` | lib | Variable font weight tokens. |
| `shape-context` | lib | Runtime pill/rounded shape switching. |
| `icon-context` | lib | Runtime icon library switching with Lucide fallback. |
| `icon-map` | lib | Canonical icon map across Lucide, Tabler, Phosphor, and HugeIcons. |
| `surface-context` | lib | Tracks current surface substrate for nested elevation. |
| `surface-classes` | lib | Static Tailwind class lookup for surface utilities. |
| `elevated` | lib | Elevation primitive that applies surface classes and re-provides context. |
| `use-proximity-hover` | hook | Tracks closest item to cursor inside a container. |
| `use-merge-split` | hook | Renders contiguous selected-background merge/split animation. |

## Controls

| Install name | Notes |
| --- | --- |
| `button` / `button-base` | Variants, sizes, loading state, icon support, animated weight/press feedback. |
| `tabs` / `tabs-base` | Segmented tabs with sliding active indicator, proximity hover, springs. |
| `tabs-subtle` | Horizontal tab navigation with pill selection and optional icons. |
| `switch` / `switch-base` | Spring thumb animation and label weight transition. |
| `slider` / `slider-base` | Snapped thumb, step dots, range mode, click-to-edit value. |
| `select` | Animated select menu with proximity hover and optional leading icons. |
| `dropdown` | Menu dropdown with proximity hover, animated selection indicator, focus ring. |
| `tooltip` / `tooltip-base` | Spring floating tooltip with configurable placement and rich content. |

## Forms

| Install name | Notes |
| --- | --- |
| `input-group` | Grouped fields with proximity highlight, animated labels, optional icons, errors. |
| `input-copy` | Read-only copy input with animated copy feedback. |
| `checkbox-group` / `checkbox-group-base` | Contiguous selection merging and spring check marks. |
| `radio-group` / `radio-group-base` | Proximity hover and spring selection dot. |
| `color-picker` | HEX, RGB, HSL, OKLCH, alpha, swatches, eyedropper, popover. |

## AI And Chat

| Install name | Notes |
| --- | --- |
| `input-message` | Chat composer with autosizing textarea, attachments, action slots, send button. |
| `chat-message` | User/assistant transcript entry with entrance and layout motion. |
| `thinking-indicator` | Animated loading indicator with morphing SVG and status text. |
| `thinking-steps` | Collapsible sequential reasoning/status display with badges and images. |
| `ask-user-questions` | Stepped question flow with keyboard shortcuts, single/multi-select, other input. |
| `file-thumbnail` | File preview thumbnail; images use object cover and PDFs render first page. |

## Data And Structure

| Install name | Notes |
| --- | --- |
| `accordion` / `accordion-base` | Animated expand/collapse, chevron, grouped proximity hover. |
| `dialog` / `dialog-base` | Spring modal with overlay, header, footer, title, description. |
| `table` | Semantic table with proximity row hover and fluid border transitions. |
| `badge` | Solid and dot status labels with Tailwind color palette and sizes. |
