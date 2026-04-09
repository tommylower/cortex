---
name: interface-kit
description: Add Interface Kit visual design overlay to a Next.js project
author: Josh Puckett (https://github.com/joshpuckett/interfacekit)
---

# Interface Kit

Set up Interface Kit — a visual design tool for styling React apps directly in the browser.

## Steps

1. **Check if already installed**
   - Look for `interface-kit` in package.json dependencies
   - If not found, run `npm install interface-kit` (or pnpm/yarn based on lockfile)

2. **Check if already configured**
   - Search for `<InterfaceKit` or `import { InterfaceKit }` in src/ or app/
   - If found, report that Interface Kit is already set up and exit

3. **Detect framework**
   - Next.js App Router: has `app/layout.tsx` or `app/layout.js`
   - Next.js Pages Router: has `pages/_app.tsx` or `pages/_app.js`

4. **Add the component**

   For Next.js App Router, add to the root layout as a sibling (not wrapping children):
   ```tsx
   import { InterfaceKit } from "interface-kit/react";

   // Add inside the body, alongside children (not wrapping):
   {children}
   {process.env.NODE_ENV === "development" && <InterfaceKit />}
   ```

   For Next.js Pages Router, add to _app:
   ```tsx
   import { InterfaceKit } from "interface-kit/react";

   // Add after Component (not wrapping):
   <Component {...pageProps} />
   {process.env.NODE_ENV === "development" && <InterfaceKit />}
   ```

5. **Confirm setup**
   - Tell the user Interface Kit is configured and available in dev mode

## Production Rules (strict)

- install as devDependency only: `bun add -d interface-kit`
- NEVER import outside a `NODE_ENV === "development"` gate
- NEVER add to layout.tsx directly. mount inside `src/components/DevTools.tsx` using `next/dynamic` with `{ ssr: false }`
- if build fails on vercel, check interface-kit imports first
- only install when the user explicitly asks (e.g. "add interface-kit"). never auto-scaffold

## Notes

- visual styling tool. edit styles directly in the browser and it writes back to code
- add as a sibling to children, never wrap children with it
- works alongside Agentation and DialKit as siblings in DevTools.tsx
