---
name: preflight
description: "design audit and review pass before shipping. checks accessibility, visual consistency, and AI-generated pattern detection. run as a final check on any component or page. covers alt text, aria-labels, form labels, keyboard handlers, contrast ratios, touch targets, heading hierarchy, spacing, z-index, font usage, line height, and flags common AI slop patterns like side-tab borders, gradient text, purple palettes, nested cards, bounce easing, and monotonous layouts. Triggers: preflight, design review, a11y, accessibility audit, wcag, ui polish, design critique, review my component, ai slop check, ship check."
---

# preflight

final design audit before shipping. reviews code for accessibility issues, visual inconsistencies, and AI-generated pattern tells, then offers to fix them.

## usage

run `/preflight` on a component or page to get a scored review with line numbers, code snippets, fix suggestions, and references.

## what it checks

### accessibility
- images without alt text
- icon-only buttons missing aria-labels
- form inputs without labels
- non-semantic click handlers
- missing keyboard handlers
- missing visible focus states or `outline-none` without replacement
- unlabeled async updates, toasts, validation, or pending regions
- color-only information
- touch targets under 44x44px
- skipped heading levels
- contrast ratio below 4.5:1

### visual consistency
- inconsistent spacing values
- overflow and alignment issues
- z-index conflicts
- mixed font families and weights
- line height issues
- missing font fallbacks
- URL/state mismatch for filters, tabs, pagination, or expanded panels
- missing safe-area handling for fixed mobile surfaces

### AI pattern detection
flags common tells that make interfaces look AI-generated:

**layout tells**
- side-tab borders (thick colored border on one side of a card)
- nested cards (cards inside cards)
- everything centered (all text center-aligned)
- icon-tile-stack (small rounded-square icons stacked above headings)
- monotonous spacing (same spacing value used everywhere)

**typography tells**
- gradient text (background-clip: text with gradients)
- overused fonts (Inter, Roboto, Open Sans, Lato, Montserrat, Arial)
- single font (only one font family on the whole page)
- flat type hierarchy (font sizes too similar between levels)

**color and effect tells**
- AI color palette (purple/violet gradients, cyan-on-dark)
- dark glow (dark bg + colored box-shadow)
- bounce/elastic easing (feels dated)
- pure black/white backgrounds (no subtle tinting)
- gray text on colored backgrounds

### quality
- text lines exceeding 75 characters
- cramped padding (text too close to container edges)
- tight leading (line-height below 1.3x)
- justified text without hyphenation
- body text below 12px
- long passages in all caps
- letter-spacing over 0.05em on body text
- animating width/height/padding/margin (performance)
- `transition: all`
- blocking paste in inputs
- hardcoded date, number, or currency formatting instead of `Intl`
- images without explicit dimensions when dimensions are knowable

### forms
- inputs without `name`, appropriate `type`, or autocomplete intent
- errors not linked to fields with `aria-describedby`
- disabled submit buttons that do not explain why
- submit states that resize the button or lose the accessible label
- critical errors shown only in toasts

## output

each issue includes:
- line number and code snippet
- what's wrong and why it matters
- fix suggestion
- WCAG reference where applicable

outputs a score out of 100. run after building components, before shipping.
