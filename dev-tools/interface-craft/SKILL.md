---
name: interface-craft
description: Add Interface Kit visual design overlay to a Next.js project
author: Josh Puckett (https://github.com/joshpuckett/interfacekit)
---

# Interface Craft

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

## Notes

- The `NODE_ENV` check ensures Interface Kit only loads in development
- Interface Kit is a visual styling tool — edit styles directly in the browser and it writes back to code
- Add as a sibling to children, never wrap children with it
