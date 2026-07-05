---
name: agentation
description: Add Agentation visual feedback toolbar to a Next.js project. Use when the user explicitly asks for Agentation, visual feedback annotations, browser annotation toolbar, or agentation MCP setup.
author: Dennis Jin & Benji Taylor (https://www.npmjs.com/package/agentation)
---

# Agentation

Set up the Agentation annotation toolbar in development only.

Before editing, read the shared dev-overlay rules in `../dev-overlays.md`.

## Steps

1. Check `package.json` for `agentation`.
2. Search `src/`, `app/`, and `pages/` for existing `Agentation` imports or `<Agentation` usage. If already configured, report that and stop.
3. Install as a dev dependency using the repo's package manager:

   ```bash
   bun add -d agentation
   ```

4. Create or update `src/components/DevTools.tsx` with a client-only dynamic import:

   ```tsx
   "use client";

   import dynamic from "next/dynamic";

   const Agentation = dynamic(
     () => import("agentation").then((mod) => ({ default: mod.Agentation })),
     { ssr: false },
   );

   export function DevTools() {
     if (process.env.NODE_ENV !== "development") return null;
     return <Agentation />;
   }
   ```

5. Mount `<DevTools />` as a sibling of `{children}` in the app shell.
6. Run the app in development and confirm the toolbar appears.
7. Run the production build and confirm Agentation does not ship.

## MCP Setup

For real-time annotation syncing with agents, recommend one setup path:

- Universal setup: run `npx add-mcp` and choose `agentation-mcp`.
- Package wizard, when available: run `agentation-mcp init`.

After MCP setup, restart the coding agent and run the package's doctor command if available.

## Notes

- Works alongside Interface Kit and DialKit in the same `DevTools.tsx`.
- Agentation's MCP server exposes tools such as `agentation_get_all_pending`, `agentation_resolve`, and `agentation_watch_annotations`.
- For autonomous browser annotation, use `agentation-self-driving` after the toolbar is installed.
