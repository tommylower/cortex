# Dev Overlay Rules

Use this shared reference for development-only visual tools such as Agentation, DialKit, and Interface Kit.

## Rule

Dev overlays are opt-in. Install and mount one only when the user explicitly asks for that tool.

Never auto-scaffold overlays into a new project.

## Production Boundary

- Install overlay packages as dev dependencies.
- Never import overlay packages at the top level of `layout.tsx`, `_app.tsx`, or other server-rendered shells.
- Mount overlays through a client-only `src/components/DevTools.tsx` component.
- Use dynamic imports with `{ ssr: false }`.
- Render overlays only when `process.env.NODE_ENV === "development"`.
- Mount `<DevTools />` as a sibling of `{children}`, not as a wrapper.
- Before a deploy or push to main, verify no overlay import exists outside the dev-only component.

## Shared Pattern

```tsx
"use client";

import dynamic from "next/dynamic";

const isDev = process.env.NODE_ENV === "development";

const Agentation = dynamic(
  () => import("agentation").then((mod) => ({ default: mod.Agentation })),
  { ssr: false },
);

export function DevTools() {
  if (!isDev) return null;

  return <Agentation />;
}
```

Add only the requested overlays. Do not install Agentation, DialKit, and Interface Kit as a bundle unless the user asks for all three.

## Verification

After adding an overlay:

1. Run the app in development and confirm the overlay appears.
2. Run the production build command.
3. Search for top-level imports:

```bash
rg 'from "(agentation|dialkit|interface-kit|interfacekit)|from .(agentation|dialkit|interface-kit|interfacekit)' app src pages
```

Any match outside `DevTools.tsx` or an explicitly dev-only file needs review.
