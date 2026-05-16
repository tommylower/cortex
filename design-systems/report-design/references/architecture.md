# Architecture

Status: **ready for the current runtime**.

## Visual Language Summary

The site is a framed operational report on a cream paper surface. A max-width shell contains a sticky ink nav, 1px ink outer frame, vertical gutter rails, section bodies, and per-section ink chrome rows. Sections stack in normal flow. The shell is persistent across routes and should not change per page.

## Runtime Shell

Runtime files:

- `app/layout.tsx`
- `components/shell.tsx`
- `components/section-gap.tsx`
- `components/mobile-breakpoint-blocker.tsx`

`app/layout.tsx` mounts:

1. `PaperBackground`
2. `AnalyticsProvider`
3. `Shell`
4. `FirstVisitLoader`
5. `PasswordGate` unless the local dev bypass is active
6. `CookieNotice`

The root `<body>` carries:

```html
data-wave-signature="built by a wave in progress. waves don't die."
```

Do not remove it.

## Shell Geometry

- Shell wrapper: `mx-auto w-full max-w-[1440px]`.
- Shell outer padding: `p-0 md:p-4 xl:p-8`.
- Frame surface: `bg-surface-page`.
- Frame outline: four absolute 1px `bg-line-strong` divs in a `z-30` decorative layer.
- Gutter rails: two absolute 1px `bg-line-strong` divs at `left/right-4 md:left/right-6 xl:left/right-10`.
- Sticky nav: `h-14` (`56px`), `top-0`, `z-40`, `bg-surface-inverse`.
- Logo block: top-left link, `h-16 w-16 md:h-24 md:w-24`, inverse surface, cream logo.
- Desktop nav: centered mono links plus right-side Book a Call CTA at `lg+`.
- Mobile nav menu exists for `md` to `<lg` widths.
- Below `768px`, `MobileBreakpointBlocker` covers the viewport and the shell wrapper is hidden. Treat sub-768 mobile as blocked until runtime changes remove that boundary.

## Page Composition

Every route composes sections directly inside `Shell`:

```tsx
<FrameBody fill>
  <Hero />
</FrameBody>
<SectionChrome inverse />

<SectionGap />

<FrameBody>
  <Section />
</FrameBody>
<SectionChrome inverse />

<SectionGap />
<Footer />
```

Rules:

- `Shell` renders `{children}` directly. It does not wrap children in one global body.
- `FrameBody` is the per-section content box.
- `fill` adds `md:flex-1`; only the hero normally uses it.
- `SectionChrome` is a 36px per-section terminator row.
- `SectionGap` is a 72px empty shell row between sections.
- `Footer` includes its own `FrameBody` and `SectionChrome`.

## Section Chrome

Runtime: `SectionChrome` in `components/shell.tsx`.

- Height: `h-9` or 36px.
- Horizontal inset: `mx-4 md:mx-6 xl:mx-10`, matching gutter rails.
- Default surface: `bg-surface-page`.
- `inverse` surface: `bg-surface-inverse`, `text-fg-on-inverse`, no top hairline.
- Non-inverse rows draw a top 1px `bg-line-strong` hairline.
- Children render in three slots at `lg+`.
- Below `lg`, only the first child renders and is centered with fluid clamp text.

## Section Gap

Runtime: `components/section-gap.tsx`.

- Height: `72px`, exactly 2x section chrome.
- Surface: `bg-surface-page`.
- `z-20`, so it masks gutter stripe overshoot from neighboring sections.
- Use between a completed section chrome and the next section body.

## Gutter Rails and Motifs

Persistent rails belong to the shell. Per-section gutter motifs are optional overlays inside sections:

- `GutterPinstripes` paints diagonal stripes in left and right gutter strips.
- Stripe directions should alternate by section: `tl-br`, `tr-bl`, `tl-br`, etc.
- Active stripes turn red when the section intersects the middle viewport band.
- `GutterDotGrid` exists as a dot-matrix gutter motif but is not the default section treatment.

## Line Rules

- Shell frame/rail lines are bg-divs, not CSS borders.
- Component/card borders may use Tailwind `border`, but do not draw borders on top of the shell rails.
- Full-bleed section grids that hit gutter rails avoid their own outer `border-x` at `md+`.
- Use `Hairline` when a divider needs to extend from inner gutter to inner gutter.

## Responsive Boundary

Current runtime:

| Width | Behavior |
| --- | --- |
| `<768px` | `MobileBreakpointBlocker` covers viewport; shell hidden |
| `768-1023px` | shell visible, compact nav menu |
| `1024-1279px` | desktop nav links begin at `lg`; shell pad 16px |
| `>=1280px` | shell pad 32px |
| any width wider than 1440px plus padding | shell stays centered; background remains full bleed |

When mobile work resumes, remove the blocker only with a runtime and docs update.

## Anti-Patterns

- Do not replace `Shell`.
- Do not render page content outside the shell.
- Do not add page-wide absolute positioning.
- Do not put content over the gutter rails.
- Do not add CSS borders to shell geometry.
- Do not remove section gaps to tighten pages unless the section pattern is redesigned and documented.
- Do not make route-specific shell variants.
