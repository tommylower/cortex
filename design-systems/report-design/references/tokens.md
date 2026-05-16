# Tokens

Status: **ready for the current runtime**.

The system has two color layers:

```text
primitive palette -> semantic roles -> components
```

Components use semantic roles. Palette primitives are documented so the roles can be audited and mirrored into Figma variables.

## Color Primitives

Locked 2026-04-28 from the Paper palette exploration.

| Name | Hex | CSS variable |
| --- | --- | --- |
| INK | `#0A0A0A` | `--color-ink` |
| SLATE | `#9A9287` | `--color-slate` |
| GROUND | `#F4EDDD` | `--color-ground` |
| SURFACE | `#F7F4EC` | `--color-surface` |
| REPORT RED | `#C70000` | `--color-report-red` |

Do not use primitives directly in component classes. Add or reuse a semantic role instead.

## Semantic Color Roles

| Role | Maps to | Use |
| --- | --- | --- |
| `--color-surface-page` | GROUND | body background, shell interior, section bodies, paper base |
| `--color-surface-raised` | SURFACE | raised panels and subtle card surfaces when a brighter cream is needed |
| `--color-surface-inverse` | INK | nav, footer/chrome bands, inverse panels |
| `--color-fg` | INK | default text and icons on cream |
| `--color-fg-muted` | SLATE | secondary labels, captions, quiet metadata |
| `--color-fg-on-inverse` | GROUND | text and logo art on ink |
| `--color-line` | SLATE at 24 percent | quiet dividers |
| `--color-line-strong` | INK | frame lines, rails, borders, structural dividers |
| `--color-accent` | REPORT RED | CTAs, active states, proof bars, focus/error/signal |
| `--color-fg-on-accent` | SURFACE | text and icons on red |

Tailwind v4 exposes these as utilities such as `bg-surface-page`, `text-fg`, `border-line-strong`, `bg-accent`, and `text-fg-on-accent`.

## Color Discipline

- Red appears only through `--color-accent` and `--color-fg-on-accent`.
- The page background is `--color-surface-page` plus the procedural paper texture.
- Use `--color-line-strong` for shell geometry and load-bearing section borders.
- Use `--color-line` only for quieter internal dividers where the full ink line is too heavy.
- No tonal ramps exist. Add them only when a shipped component requires them.
- No global hover/pressed/disabled colors exist. Current components use opacity, background swaps, or `color-mix()` locally.

## Typography

Status: **runtime-backed, with a Figma alignment note**.

Current code wires:

| Role | Runtime source | CSS variable | Use |
| --- | --- | --- | --- |
| Sans | local Satoshi files | `--font-sans` -> `--font-satoshi` | body, paragraphs, general UI |
| Mono | Google JetBrains Mono | `--font-mono` -> `--font-jetbrains-mono` | labels, chrome, metadata, technical copy |
| Display | Google JetBrains Mono | `--font-display` -> `--font-jetbrains-mono` | headings, hero display, CTAs |

Usage:

- Display headings use `font-display`, uppercase, tight leading, and balanced wrapping.
- Body copy uses `font-sans` with relaxed line height.
- Kicker labels, chrome labels, nav, CTAs, form controls, and data-like captions use `font-mono`.
- The Figma deck currently renders body copy in JetBrains Mono because Figma cannot load the local Satoshi font files. That is a tooling issue, not a design direction. Runtime contract stays Satoshi sans + JetBrains Mono mono/display.

## Type Scale

Use the runtime-backed scale below before inventing new sizes.

| Use | Mobile/tablet | Desktop | Notes |
| --- | --- | --- | --- |
| Hero H1 | `clamp(24px, 7.2vw, 40px)` | `44px`, sometimes `38px` at `xl` inside split hero | `font-display`, uppercase, `leading-[1.04]` |
| Product/page hero H1 | `22px` to `24px` | `38px` to `44px` | depends on visual density |
| Marketing section H2 | `20px` | `36px` | centered section headings, balanced, max 26ch |
| Closing CTA H2 | `20px` | `36px` | follows the same marketing section H2 scale |
| Card H3 | `18px` to `24px` | `22px` to `28px` | often stabilized with min-height |
| Section intro | `15px` | `17px` | `SectionIntroBody`, `leading-[1.6]`, max 64ch |
| Standard body | `15px` to `16px` | `16px` to `18px` | `leading-[1.45]` to `leading-[1.6]` |
| Card body | `14px` to `15px` | `15px` | `leading-[1.5]` to `leading-[1.55]` |
| Eyebrow kicker | `14px` | `14px` | mono, uppercase, `tracking-[0.08em]`, `leading-[14px]`. Matches nav font-size. Both `bg-accent` and `bg-surface-inverse` chip variants. |
| Mono label (in-card) | `10px` to `11px` | `11px` | uppercase, tracked. Smaller pills inside cards (date chips, metadata). Distinct from eyebrow kicker. |

## Spacing

No named spacing tokens are defined yet. Use the established Tailwind rhythm:

- `3` / `6` / `12` / `24` are the main proportional steps: 12 / 24 / 48 / 96px.
- `FrameBody`: `px-7 py-12`, `md:px-10 md:py-16`, `xl:px-16`.
- `SectionGap`: `72px`.
- Shell outer padding: `0` below `md`, `16px` at `md`, `32px` at `xl`.
- Gutter rails: `16px` below `md`, `24px` at `md`, `40px` at `xl`.
- Section internal padding often uses `p-6`, `md:py-12`, `md:px-8`, `md:px-10`, or mirrored `md:pr-12 md:pl-6`.
- Card padding is usually `p-5` or `p-6` on smaller cards, `p-7 md:p-8` on proof and role cards, and `md:p-10` for thesis cards.
- Dense card grids use `gap-5` at `md` and `gap-6` at `xl`.

Promote a named token only after multiple runtime components need the exact same value.

## Load-Bearing Widths

Five arbitrary widths in the codebase are geometry contracts, not magic numbers. Treat them as part of the design system. Changing any of them is a system change, not a local tweak.

| Width | Where it lives | What it controls |
| --- | --- | --- |
| `1440px` | `Shell` wrapper (`components/shell.tsx`) | Shell max width. The whole frame is bounded by this. |
| `760px` | `SectionIntroBody` (`components/ui/section-intro-body.tsx`) | Section intro paragraph measure. |
| `32ch` | `AccentCallout` (`components/ui/accent-callout.tsx`) | Red-bar callout measure. |
| `180px` | `DotMatrixCta` size `hero` | Mobile width of hero CTAs. |
| `240px` | `DotMatrixCta` size `heroWide` | Mobile width of wider hero CTAs. |
| `260px` | `DotMatrixCta` size `heroLong` | Mobile width of the longest hero CTAs. |

Do not change these inline. If a section needs a different measure, prefer a new variant over editing the constant.

## Radius

Production UI currently uses **no rounded corners**.

Rules:

- Do not add `rounded-*` to production UI.
- Frames, cards, buttons, panels, nav, and overlays stay square.
- If a future approved visual direction needs radius, add a token and update this file plus `platform-mapping.md`.

## Lines

- Shell geometry uses 1px absolute `bg-line-strong` divs.
- Section/card internals may use Tailwind borders, but avoid overlapping section `border-x` with shell rails.
- Use `Hairline` for full-width section dividers that need to align to the inner gutter.
- Do not mix a shell bg-div line and a CSS border on the same pixel.

## Shadows

Default resting card/panel shadow:

```txt
0 8px 18px rgba(10, 10, 10, 0.06)
```

Tailwind utility:

```txt
shadow-[0_8px_18px_rgba(10,10,10,0.06)]
```

Default hover card/panel shadow:

```txt
0 14px 30px rgba(10, 10, 10, 0.10)
```

Rules:

- Use shadows for raised cards, proof panels, callouts, and compact UI panels.
- Keep shadows secondary to the line system.
- Do not stack multiple shadows.
- Institute access/path cards include CSS-module variants around `0 12px 24px rgba(10, 10, 10, 0.09)` and `0 14px 30px rgba(10, 10, 10, 0.10)` because their hover treatments are intentionally varied.
