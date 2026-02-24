# UI Design Principles

Core principles for building high-quality UI. Reference these when creating components, layouts, and pages.

## Spacing System

Use a consistent spacing scale. Never use arbitrary values.
- 4px — tight inner padding (badges, pills)
- 8px — default inner padding, small gaps
- 12px — compact component padding
- 16px — standard component padding, list gaps
- 24px — card padding, medium section gaps
- 32px — large component gaps
- 48px — section padding (mobile)
- 64px — section padding (tablet)
- 80px — section padding (desktop small)
- 120px — section padding (desktop large)

## Typography Hierarchy

Every page should have a clear type hierarchy. Never use more than 3-4 font sizes per page.
- Display: 48-72px — hero headlines only
- H1: 36-48px — page titles
- H2: 24-32px — section titles
- H3: 20-24px — card titles, subsections
- Body: 16-18px — paragraph text
- Small: 14px — captions, labels, metadata
- Micro: 12px — badges, overlines

Line height: 1.1-1.2 for headlines, 1.5-1.6 for body text.

## Layout Rules

- Max content width: 1200-1280px
- Text max-width: 640-720px for readability
- Use 12-column grid for desktop, collapse to 4 for mobile
- Cards: consistent padding, consistent radius, consistent shadow
- Sections: alternate between full-width and contained widths for rhythm
- Always group related elements with less space than unrelated elements (proximity principle)

## Visual Hierarchy

- One primary action per section (single CTA)
- Use size, weight, and color to establish 3 levels: primary, secondary, tertiary
- Dark backgrounds for emphasis sections, light for breathing room
- Icons support text, never replace it (except established patterns like search, close, menu)

## Component Patterns

- Buttons: minimum 44px height for touch, 12-24px horizontal padding, never less than 80px wide
- Cards: consistent internal structure (image/icon → title → description → action)
- Inputs: minimum 44px height, visible labels (not just placeholder), clear focus states
- Navigation: logo left, links center or right, CTA far right

## Responsive

- Design desktop-first for marketing sites, mobile-first for apps
- Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)
- Stack horizontal layouts vertically on mobile
- Reduce section padding by ~40% on mobile
- Headlines scale down 1-2 steps on mobile

## Common Mistakes to Avoid

- Inconsistent spacing (mixing 15px and 16px)
- Too many font sizes on one page
- Buttons that look like links and links that look like buttons
- Sections with no breathing room between them
- Text over images without sufficient contrast/overlay
- Centering everything — left-align body text
