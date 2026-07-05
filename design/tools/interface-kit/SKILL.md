---
name: interface-kit
description: Add Interface Kit visual design overlay to a Next.js project. Use when the user explicitly asks for Interface Kit, browser visual editing, or a style-editing overlay.
author: Josh Puckett (https://github.com/joshpuckett/interfacekit)
---

# Interface Kit

Interface Kit is a development-only visual design overlay for editing React app styles directly in the browser.

Before editing, read the shared dev-overlay rules in `../dev-overlays.md`.

## Steps

1. Check `package.json` for `interface-kit`.
2. Search `src/`, `app/`, and `pages/` for existing `InterfaceKit` imports or `<InterfaceKit` usage. If already configured, report that and stop.
3. Install as a dev dependency:

   ```bash
   bun add -d interface-kit
   ```

4. Create or update `src/components/DevTools.tsx`:

   ```tsx
   "use client";

   import dynamic from "next/dynamic";

   const InterfaceKit = dynamic(
     () => import("interface-kit/react").then((mod) => ({ default: mod.InterfaceKit })),
     { ssr: false },
   );

   export function DevTools() {
     if (process.env.NODE_ENV !== "development") return null;
     return <InterfaceKit />;
   }
   ```

5. Mount `<DevTools />` as a sibling of `{children}` in the app shell.
6. Run the development app and confirm the overlay appears.
7. Run the production build and confirm Interface Kit does not ship.

## Notes

- Add as a sibling to children, never as a wrapper.
- Works alongside Agentation and DialKit in `DevTools.tsx`.
- Use for browser-side visual style editing; use `dialkit` for explicit control panels and spring tuning.
