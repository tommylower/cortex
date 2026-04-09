---
name: dev-setup
description: Development setup, deployment flow, and environment variable management
---

# Dev Setup & Deployment

## Deployment
- Push to main → Vercel auto-deploys to production
- Push to any branch → Vercel preview deployment
- Supabase migrations run via CLI, not auto-deployed

## Development
1. Clone repo
2. `cp .env.example .env.local` (fill in keys)
3. `bun install`
4. `bun dev`

## Environment Variables
- Never commit `.env` files
- Use `.env.example` as the template with placeholder values
- Vercel env vars for production
- Supabase project settings for DB keys

## Dev Tools (Agentation, Interface Kit, DialKit)

these are **opt-in only**. never install or mount unless the user explicitly asks (e.g. "add agentation", "add dialkit"). do not auto-scaffold them into new projects.

### production rules (strict)

- dev tools must NEVER appear in production builds
- always gate with `process.env.NODE_ENV === "development"`
- never import dev tool packages at the top level of layout.tsx. use dynamic imports
- before any deploy or push to main, verify: no dev tool imports outside of NODE_ENV gates
- if a build fails on vercel, check dev tool imports first. they are the most common cause
- dev tool packages (`agentation`, `interface-kit`, `dialkit`, `motion`) go in `devDependencies`, not `dependencies`

### when the user requests a dev tool

1. install the package as a devDependency
2. create `src/components/DevTools.tsx` if it doesn't exist
3. mount only the requested tool inside the NODE_ENV gate
4. use `next/dynamic` with `{ ssr: false }` for each tool
5. mount `<DevTools />` as a sibling of `{children}` in layout.tsx

```tsx
"use client";
import dynamic from "next/dynamic";

const isDev = process.env.NODE_ENV === "development";

// only add the tools the user has requested:
const Agentation = dynamic(() => import("agentation").then((m) => ({ default: m.Agentation })), { ssr: false });

export function DevTools() {
  if (!isDev) return null;
  return <Agentation />;
}
```
