# Architecture

## Front-End Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 through `@tailwindcss/postcss`
- Motion package installed for motion work
- Vercel Analytics and Speed Insights
- Notion API and Resend API routes

## Source Files

Important implementation files:

- `src/app/layout.tsx` - fonts, metadata, global shell, analytics, body motif
- `src/app/globals.css` - tokens, global interaction rules, animation keyframes
- `src/components/*` - page sections, primitives, shell, legal UI, cards
- `src/lib/industries.ts` - shared industry-page data
- `src/app/blog/data.ts` - blog data layer and placeholder behavior

## Primitive Strategy

Use the project primitives before creating new one-off markup:

- `ButtonPrimary`
- `ButtonSecondary`
- `ButtonSmall`
- `ButtonSecondarySmall`
- `SectionLabel`
- `SystemCard`
- `ProfileCard`
- `MaskedIcon`
- `TrustNote`
- `NewsletterForm`

Section intro remains a documented pattern rather than a component for now.

## Implementation Rules

- Keep code close to the rendered section when the section has unique content or visual logic.
- Extract only repeated, stable behavior.
- Keep brand-specific decisions visible; do not hide them behind generic primitives.
- Use CSS custom properties from `globals.css` for system-level behavior.
- Avoid broad component-library migration during handoff cleanup.

## Geometry

Use square frames, hairlines, masked SVG icons, data-grid layouts, scan visuals, radar diagrams, and table-like structures. Preserve the exact, technical feel.

## Anti-Patterns

- rounded SaaS cards
- gradient blob backgrounds
- decorative stock imagery
- generic shadcn-like card stacks
- heavy drop shadows
- arbitrary one-off breakpoints when a section pattern exists
