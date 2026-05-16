# Platform Mapping

## Runtime

- Framework: Next.js 16.1.6
- Router: App Router
- React: 19
- TypeScript: 5
- Styling: Tailwind CSS 4 via `@tailwindcss/postcss`
- Package manager: Bun
- Node: 22

## Important Files

- `src/app/layout.tsx` - shell, fonts, analytics, body motif
- `src/app/globals.css` - tokens, globals, keyframes, interaction classes
- `src/components/*` - UI sections and primitives
- `src/components/LoadingScreen.tsx` - branded loading-screen motion artifact
- `src/lib/industries.ts` - industry route content
- `src/app/blog/data.ts` - blog data and placeholder mode

## Fonts

- F37 Grotesc local variable font: `src/fonts/F37GrotescText-VF.ttf`
- IBM Plex Mono loaded from Google via `next/font/google`

## Packages

Runtime packages relevant to the design system:

- `motion` - animation dependency
- `unicornstudio-react` - hero scene integration
- `@vercel/analytics` and `@vercel/speed-insights` - analytics overlays
- `@chenglou/pretext` - text measurement dependency

## Integrations

- Notion API for blog structure
- Resend for subscribe endpoint
- Vercel deployment
- Cloudflare in front of production domains, according to project docs

## Body Motif

The root body includes:

```html
data-wave-signature="built by a wave in progress. waves don't die."
```

Keep it present and non-visible.

## Handoff Notes

Design-system decks and asset templates should bind fills and strokes to local color variables and paint styles. Keep public copies free of private project links and client-specific file names.
