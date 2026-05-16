# Composition

Status: **ready for the current runtime**.

## Page Rhythm

Pages are stacked report sections. The default rhythm is:

1. Hero in `FrameBody fill`.
2. Dark `SectionChrome`.
3. `SectionGap`.
4. Repeating `FrameBody` sections with dark `SectionChrome`.
5. `SectionGap`.
6. Footer.

Most pages end the final CTA with a pre-footer `SectionGap` rather than a final CTA chrome row.

## Section Families

### Hero Sections

Hero sections sit in `FrameBody fill`. They usually include:

- A mono red kicker or no kicker.
- One uppercase display H1.
- One short body paragraph or stacked display/body pair.
- A CTA pair or single primary CTA.
- Optional desktop-only mark/visual column.
- Gutter pinstripes with `bottomExtent="chrome"` or default.

Desktop product heroes may use a text/visual split. Heavy visual columns can be hidden below larger breakpoints when they compete with copy.

### Bordered Blocks

Use for entity definition, definition blocks, proof rows, FAQs, legal content, and row-based explanatory sections.

Pattern:

- Outer wrapper uses negative margins to cancel `FrameBody` padding.
- Rows use 1px `border-line-strong` separators.
- At `md+`, shell rails provide outer vertical boundaries; avoid duplicating `border-x` on the same pixel.

### Card Grids

Use for vertical cards, proof cards, team cards, values, audience segments, role paths, engagement tiers, and FAQs.

Rules:

- Single column by default.
- Dense 3+ column grids should wait until `md`, `lg`, or wider depending on card density.
- Mobile stacked cards can share a parent border; desktop cards usually get individual borders and shadows.
- Cards use square corners.
- Raised cards use the default shadow.
- Hover cards typically move `-translate-y-0.5`, increase shadow, and reveal a red bar.

### Closing CTAs

Closing CTA sections are centered, compact, and direct:

- Large uppercase display heading.
- Short body with `text-balance`.
- One CTA or a small CTA pair.
- `GutterPinstripes direction="tl-br" bottomExtent="flush"` is common.

## Copy Wrapping

- Global CSS applies `text-wrap: balance` to headings and `text-wrap: pretty` to paragraphs.
- Use `BalancedHeading` for long headings that need explicit semantic tags.
- Use `SectionIntroBody` for centered multi-sentence intro paragraphs. Keep the intro stacked and compact: medium subheads should usually be around two lines, and longer intros should use the wider shared measure rather than a narrow tall column.
- Use hard line breaks only for reviewed display copy, not prose.
- Avoid `whitespace-pre-line` except where copy is intentionally formatted as line-broken display text.

Measure references:

| Content | Measure |
| --- | --- |
| Section intro | `64ch` |
| FAQ/card question | about `36ch` |
| Short card body | about `46ch` |
| Long thesis paragraph | `60ch` to `64ch` |
| Accent callout | `32ch` |

## Kicker Labels

Default accent kicker:

```tsx
<span className="inline-block bg-accent px-1.5 py-px font-mono text-[14px] uppercase leading-[14px] tracking-[0.08em] text-fg-on-accent">
  label
</span>
```

Inverse kicker:

```tsx
<span className="inline-block bg-surface-inverse px-1.5 py-px font-mono text-[14px] uppercase leading-[14px] tracking-[0.08em] text-fg-on-inverse">
  label
</span>
```

Rules:

- Use accent kicker on cream.
- Use inverse kicker when the label sits inside or beside an inverse/accent block.
- Do not tune the 6px/1px padding locally.

## CTA Rhythm

- Use `DotMatrixCta` or a named wrapper.
- Hero CTA pairs use `size="hero"` unless text length needs `heroWide`.
- Primary CTAs use red resting surface and ink hover surface.
- Bracket CTAs are secondary.
- Mobile/touch hides the dot reserve; `sm+` restores reserve width for hover reveal.
- Do not hand-code the dot reveal outside the CTA primitive.

## Icon Rhythm

- Use Streamline Cyber icons from `components/ui/icons/streamline-cyber` for interface markers.
- Default inline icon color is red.
- Use `h-5 w-5` to `h-6 w-6` for inline proof markers.
- Use `h-8 w-8` to `h-9 w-9` for top-right card icons.
- Use custom product marks for product identity.

## Responsive Contract

Current runtime blocks `<768px`. For visible widths:

- `md` starts shell visibility and compact nav.
- `lg` restores desktop nav and many multi-column layouts.
- `xl` gives the shell its full 32px outer pad and wider card/grid breathing room.

Rules:

- Design sections single-column first.
- Use two columns only when both columns remain readable.
- Dense visual or card grids should wait until enough width exists.
- Decorative or heavy visuals may hide on smaller viewports.
- Motion and hover interactions must respect reduced motion and touch limitations.

## Anti-Patterns

- No rounded production surfaces.
- No new shadow values without documenting them in tokens.
- No new route links for CTAs unless the route exists.
- No door metaphor.
- No decorative gradients, orbs, or blob backgrounds.
- No cards inside cards.
- No content hidden only because it was hard to fit, except explicitly decorative visuals.
