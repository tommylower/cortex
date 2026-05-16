# Components

Status: **ready for the current runtime**.

This file documents reusable runtime primitives. It is not a full component API reference. Code remains the final implementation source.

## Shell Components

### Shell

Runtime: `components/shell.tsx`

Persistent site frame. It mounts `MobileBreakpointBlocker`, frame outline, gutter rails, sticky nav, and route children.

Rules:

- Do not duplicate or nest `Shell`.
- Do not create route-specific shell variants.
- Shell geometry uses bg-div hairlines.

### FrameBody

Runtime: `components/shell.tsx`

Per-section content box.

Props:

- `fill`: use for the hero or one viewport-fill section.
- `className`: allowed for section-specific adjustments, but avoid overriding base padding unless existing page patterns require it.

### SectionChrome

Runtime: `components/shell.tsx`

36px per-section chrome row. Usually passed `inverse`.

Rules:

- Use after most major `FrameBody` sections.
- Children are optional.
- If children are passed, provide up to three slots.

### SectionGap

Runtime: `components/section-gap.tsx`

72px shell gap between sections. Do not replace with local margin.

### MobileBreakpointBlocker

Runtime: `components/mobile-breakpoint-blocker.tsx`

Covers `<768px` with a "mobile loading" panel and hides the shell. Documented as current runtime state, not as a final mobile UX goal.

## Navigation

### ActiveNavLink

Runtime: `components/ui/active-nav-link.tsx`

Desktop nav link that marks active routes with red fill.

### MobileNavMenu

Runtime: `components/mobile-nav-menu.tsx`

Compact nav overlay for `md` to `<lg` widths. Locks body scroll while open, closes on Escape and link click, and uses the same vertical labels as desktop nav.

## CTA System

### DotMatrixCta

Runtime: `components/ui/dot-matrix-cta.tsx`

Primary CTA primitive. It combines mono uppercase label text with a dot-matrix reveal.
Most shipped CTA labels now render at `12px`; compact/micro sizes step down only where space is constrained.

Variants:

- `primary`: filled CTA.
- `bracket`: bracket-framed secondary CTA.

Tones:

- `accent`: red primary or red bracket. **Shipped.**
- `ink`: ink bracket with red hover. **Shipped.**
- `inverse`: cream treatment for dark surfaces. **Unshipped on `primary`.** Available; not used in production today.
- `cream-accent`: cream resting surface with red hover. **Unshipped on `primary`.** Available; not used in production today.
- `nav`: nav-specific bracket treatment; keep only while runtime uses it.

Sizes:

- `hero`: standard hero CTA. **Shipped.**
- `heroWide`: longer hero/section CTA. **Shipped.**
- `heroLong`: available but not widely shipped. **Unshipped.** Keep available for hero layouts that need extra width.
- `default`: normal section CTA. **Shipped.**
- `compact`: small card CTA. **Unshipped.** Available for tight card layouts.
- `micro`: tiny embedded CTA. **Unshipped.** Available for inline use.
- `nav`: top nav CTA. **Shipped.**

Rules:

- Named CTA wrappers stay thin.
- Do not duplicate dot-matrix reveal internals in sections.
- Do not tune individual button padding in page sections.
- Mobile/touch labels stay centered without relying on hover.

### Named CTA Wrappers

Runtime: `components/ui/*button.tsx`

Wrappers include:

- `BookACallButton`
- `BookACallNavButton`
- `BookACallInverseButton`
- `StartLearningButton`
- `StartLearningInverseButton`
- `StartSubscriptionButton`
- `StartSubscriptionInverseButton`
- `RequestTeamDemoButton`
- `SeeHowWeEngageButton`
- `DownloadSampleReportButton`

Rules:

- Prefer wrappers when the action is known.
- Use `cta-links.ts` for external URLs.
- Do not hard-code repeated Cal.com or Institute URLs.

### BracketFrame

Runtime: `components/ui/bracket-frame.tsx`

Draws four 1px L-shaped corner brackets using CSS background layers.

Rules:

- Use for bracket CTAs and bracketed visual frames.
- Tones are `ink`, `accent`, and `cream`.
- `topCorners` and `bottomCorners` can disable half the frame.

Intentional variant: `components/sections/three-verticals.tsx` contains a local 8-span `BracketFrame` whose stroke spans carry `data-bracket-stroke`. That DOM shape is required so outer CSS can drive two stacked hover states (card + CTA) on the bracket strokes independently from fill overlays. Canonical's single-span approach can't be targeted that way. Keep both unless the home page hover treatment changes.

## Typography Helpers

### BalancedHeading

Runtime: `components/ui/balanced-heading.tsx`

Small semantic wrapper for headings. Use when the tag needs to be configurable and heading wrap needs to stay consistent with CSS balance.

### SectionHeading

Runtime: `components/ui/section-heading.tsx`

Centered section heading with optional kicker. Marketing section H2s use the current compact standard: `text-[20px] md:text-[36px]`, `leading-[1.1]`, uppercase, balanced, and `max-w-[26ch]`.

### SectionIntroBody

Runtime: `components/ui/section-intro-body.tsx`

Shared intro paragraph treatment: `text-[15px] md:text-[17px]`, `leading-[1.6]`, balanced, and constrained to `64ch`. The target is a compact stacked intro: medium-length subheads should usually land around two lines, while longer explanatory intros should open horizontally instead of becoming tall narrow columns.

### AccentCallout

Runtime: `components/ui/accent-callout.tsx`

Short red left-bar callout. Use for compact explanatory notes, not long prose.

## Lines and Gutters

### Hairline

Runtime: `components/ui/hairline.tsx`

1px divider that extends from inner gutter to inner gutter by compensating for `FrameBody` padding.

### GutterPinstripes

Runtime: `components/gutter-pinstripes.tsx`

Per-section diagonal stripe overlay in the gutter area.

Props:

- `direction`: `tl-br` or `tr-bl`.
- `bottomExtent`: `chrome`, `flush`, `hero`, or `tight`.
- `verticalInset`: compensation for sections with local negative vertical margins.

### GutterDotGrid

Runtime: `components/gutter-dot-grid.tsx`

Optional square-dot gutter motif. Use sparingly; pinstripes are the default.

## Logo and Mark Components

### LogoLoop

Runtime: `components/ui/logo-loop.tsx`

Logo strip. Renders a static grid below `md` and a masked auto-scrolling marquee at `md+`. Logos with no `src` fall back to text wordmarks.

### HeroMark

Runtime: `components/ui/marks/hero-mark.tsx`

Product hero mark shell. It applies variant-specific float and hover variables.

Variants:

- `investigate`
- `compliance`
- `institute`

### ReportIconLoader

Runtime: `components/ui/report-icon-loader.tsx`

Inline SVG icon loader. Used by `FirstVisitLoader` and static/triggered mark moments.

## Overlays and Utility UI

### PaperBackground

Runtime: `components/paper-background.tsx`

Fixed `PaperTexture` shader layer mounted under the shell.

### FirstVisitLoader

Runtime: `components/first-visit-loader.tsx`

Client overlay that plays once per browser using `localStorage`.

### PasswordGate

Runtime: `components/password-gate.tsx`

Client password gate. Disabled only in development when `NEXT_PUBLIC_DISABLE_PASSWORD_GATE=true`.

### CookieNotice

Runtime: `components/cookie-notice.tsx`

Inverse fixed notice with red top signal bar and border buttons.

## Shared Section Components

- `FAQ`: shared FAQ card grid.
- `Footer`: shared footer, wrapped in `FrameBody` and `SectionChrome`.
- Product/page section components live under `components/sections/*`.

## Component Anti-Patterns

- Do not duplicate CTA internals.
- Do not introduce a second icon set.
- Do not add rounded cards.
- Do not add one-off shadow values.
- Do not put `FrameBody` inside another `FrameBody`.
- Do not turn private page helpers into shared primitives until at least two runtime sections need them.
