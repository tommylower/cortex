# Components

## Buttons

Buttons use mono uppercase text, square borders, and a left-to-right fill wipe.

Implemented primitives:

- `ButtonPrimary` - paper background, ink text, arrow icon
- `ButtonSecondary` - transparent border button
- `ButtonSmall` - compact accent-capable button
- `ButtonSecondarySmall` - compact secondary button
- `PricingPlanCta` - pricing-specific tracked CTA

Global behavior:

- `.btn-fill`
- `.btn-fill-primary`
- `.btn-fill-secondary`
- `.btn-fill-accent`
- `.btn-fill-danger`

Hover lifts by `translateY(-2px)` on fine pointers. Active state compresses slightly.

## Labels

`SectionLabel` is the primary label primitive:

- square outline
- small pulsing square
- mono uppercase text
- default paper color
- optional accent color

Use labels as section anchors, not decorative badges.

## Cards

Shared helper:

- `SystemCard`
- `systemCardStyle`
- `CARD_BORDER_SUBTLE`
- `CARD_BORDER_STRONG`
- `CARD_SHADOW`

Card rules:

- square corners
- hairline border
- subtle dark shadow
- transparent or ink background unless explicitly inverted
- display title, mono supporting text

## Profile Cards

`ProfileCard` is used for team and advisor cards. It standardizes:

- role/eyebrow
- display name
- divider
- mono biography/affiliation text
- LinkedIn CTA

## Icon Masks

`MaskedIcon` handles repeated SVG mask icons. Use it when rendering arrow/icon masks with `currentColor`.

For scan visuals, icon masks remain inline where animation and sizing are section-specific.

## Pricing Cards

Pricing cards use `.pricing-card` and related global classes:

- `.pricing-card`
- `.pricing-card-divider`
- `.pricing-card-cta`
- `.pricing-card-cta-secondary`

The whole card inverts to paper/ink on hover. CTA states stay distinct inside the inverted card.

## Pillar / Module Cards

`pillar-card` is used for SR3 module cards and platform module rows.

Behavior:

- scan icon shimmer
- hover pause and active green state
- static mode for Platform modules
- deep-link target state for module rows

## Loading Screen

`LoadingScreen` is the branded page loader and a motion-system artifact worth highlighting in deck work.

Behavior:

- renders a pixel battery module
- fills cells sequentially, then enters a charged green state
- exits upward before revealing the page
- stores `co:loaded` in `sessionStorage` so it does not repeat on every route load
- supports `?loader-preview` for review captures
- includes status semantics and a reduced-motion path

## Tables And Rows

Pricing and trust sections use table-like row systems with hairline borders, mono labels, and green plan/status emphasis. Keep them sharp, dense, and legible.
