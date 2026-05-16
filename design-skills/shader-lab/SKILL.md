---
name: shader-lab
description: Install and use Basement Studio's Shader Lab runtime to drop GPU shader compositions into a Next.js or React app. Use when the user wants shader-driven visual effects — warped text, liquid backgrounds, distortion, noise flows, post-processing passes, animated hero treatments — sourced from the Shader Lab editor. Triggers: shader, shaders, shader-lab, basement shader, shader effects, gpu effects, shader composition, warped text, liquid background, displacement text, hero shader, shader post-processing.
author: Basement Studio (https://github.com/basementstudio/shader-lab)
---

# Shader Lab

Set up `@basementstudio/shader-lab` — a React runtime that plays compositions authored in the Shader Lab editor. Compositions can stack text layers, image layers, and custom TSL (Three Shading Language) shader layers, with a timeline, and can be used as a DOM element, as a texture in a three.js scene, or as a post-processing pass.

Full suite, not just text. The same runtime renders any composition the editor can export.

## When to use

- User wants a bespoke shader-driven hero, background, or accent on a landing page.
- User wants to reuse compositions they already built (or will build) in the Shader Lab editor at https://eng.basement.studio/tools/shader-lab.
- User wants post-processing (bloom, grain, distortion) over an existing three.js / R3F scene.

## Before installing, confirm browser scope

This runtime requires **WebGPU**. That means:

- Chrome, Edge: supported
- Safari 18+: supported
- Firefox: behind a flag as of early 2026

Ask the user if a WebGPU-only effect is acceptable for their audience. If not, either:

- Build a CSS / canvas2D fallback for non-WebGPU browsers and gate the shader behind a capability check, or
- Use a different tool (react-three-fiber + fragment shader on a mesh is a WebGL alternative with broader reach).

Do not skip this check — shipping a silently-broken hero on Firefox is worse than not shipping it.

## Steps

1. **Check if already installed**
   - Look for `@basementstudio/shader-lab` in `package.json` dependencies.
   - If found, skip install and move to step 4.

2. **Detect package manager**
   - `bun.lock` or `bun.lockb` → bun
   - `pnpm-lock.yaml` → pnpm
   - `yarn.lock` → yarn
   - else → npm

3. **Install the runtime and three.js**
   ```bash
   bun add @basementstudio/shader-lab three
   bun add -d @types/three
   ```
   (substitute `npm install` / `pnpm add` / `yarn add` per manager)

4. **Create a compositions directory**

   Recommended path: `src/shaders/compositions/` (or `app/_shaders/compositions/` in pure App Router projects).

   Each composition lives in its own file as a typed config. Structure:
   ```
   src/shaders/
   ├── compositions/
   │   ├── hero.ts
   │   ├── accent-warp.ts
   │   └── background-flow.ts
   └── ShaderComposition.tsx   // thin client wrapper around ShaderLabComposition
   ```

5. **Add the client wrapper**

   `ShaderLabComposition` and the hooks are client-side only. In Next.js App Router, wrap them in a `"use client"` component so server components can import it freely.

   `src/shaders/ShaderComposition.tsx`:
   ```tsx
   "use client";

   import { ShaderLabComposition } from "@basementstudio/shader-lab";
   import type { ComponentProps } from "react";

   type Config = ComponentProps<typeof ShaderLabComposition>["config"];

   export function ShaderComposition({
     config,
     onRuntimeError,
   }: {
     config: Config;
     onRuntimeError?: (message: string) => void;
   }) {
     return (
       <ShaderLabComposition
         config={config}
         onRuntimeError={
           onRuntimeError ??
           ((message) => {
             if (process.env.NODE_ENV !== "production") {
               console.error("[shader-lab]", message);
             }
           })
         }
       />
     );
   }
   ```

6. **Add a WebGPU capability guard**

   `src/shaders/useSupportsWebGPU.ts`:
   ```tsx
   "use client";

   import { useEffect, useState } from "react";

   export function useSupportsWebGPU(): boolean | null {
     const [supported, setSupported] = useState<boolean | null>(null);

     useEffect(() => {
       const gpu = (navigator as Navigator & { gpu?: unknown }).gpu;
       setSupported(Boolean(gpu));
     }, []);

     return supported;
   }
   ```

   Usage on a page:
   ```tsx
   "use client";

   import { ShaderComposition } from "@/shaders/ShaderComposition";
   import { useSupportsWebGPU } from "@/shaders/useSupportsWebGPU";
   import { heroConfig } from "@/shaders/compositions/hero";
   import { HeroFallback } from "@/components/HeroFallback";

   export function Hero() {
     const supported = useSupportsWebGPU();
     if (supported === null) return null; // avoid flash during detection
     if (!supported) return <HeroFallback />;
     return <ShaderComposition config={heroConfig} />;
   }
   ```

7. **Author compositions**

   The primary way to build a composition is in the **Shader Lab editor** at https://eng.basement.studio/tools/shader-lab. Export gives you a config object you can paste into a file under `src/shaders/compositions/`.

   Minimal handwritten example for reference:
   ```ts
   import type { ComponentProps } from "react";
   import type { ShaderLabComposition } from "@basementstudio/shader-lab";

   type Config = ComponentProps<typeof ShaderLabComposition>["config"];

   export const heroConfig: Config = {
     layers: [
       { type: "text", content: "Your text" },
       // stack a custom shader layer above for effects:
       // { type: "customShader", sketch: yourSketchFn },
     ],
     timeline: { duration: 6, loop: true, tracks: [] },
   };
   ```

   Custom shader layers use TSL (Three Shading Language) — a `Fn()`-wrapped function that returns a TSL node. Injected globals include `time`, `inputTexture`, and noise / tonemapping / SDF helpers. Write these in the editor first, then export.

8. **Advanced: compositions as textures or post-processing**

   - **Composition as a texture in an R3F scene**: use `useShaderLab(config, { width, height, pixelRatio })` and pass the returned `texture` to a material.
   - **Post-processing over an existing renderer**: `useShaderLab(config, { renderer })` and drive it with `postprocessing.render(inputTexture, time, delta)` in your render loop.
   - **Manual render loop**: `useShaderLabCanvasSource` / `useShaderLabPostProcessingSource` for full control.

   These are client-side, same `"use client"` rule applies.

## Where configs live

Treat composition configs as content, not code. They belong in a dedicated directory (`src/shaders/compositions/`) next to any per-composition sketch functions. Reuse configs across projects by copy or by referencing a shared package if the studio maintains one.

## Troubleshooting

- **Blank output, no error**: likely WebGPU not available. Add the capability guard above.
- **"Runtime error" callback fires**: inspect the message, most common cause is an invalid sketch function or an unsupported TSL node. Reopen the composition in the Shader Lab editor and re-export.
- **SSR hydration warning**: the component is client-only. Ensure the parent is marked `"use client"` or imported via `dynamic(() => ..., { ssr: false })`.
- **Three.js version conflict**: `three` is a peer dep. If another package pins an incompatible version, resolve with `overrides` / `resolutions` in `package.json`.

## References

- Runtime README: https://github.com/basementstudio/shader-lab
- Editor: https://eng.basement.studio/tools/shader-lab
- TSL docs: https://threejs.org/docs/?q=tsl (Three Shading Language)
