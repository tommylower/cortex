---
name: funky-shadow
description: "Install and use the funky-shadow package for dithered, gradient-colored shadows behind UI elements. Use when the user asks for dithered shadows, pixel shadows, Bayer matrix texture, retro gradient shadows, canvas-rendered shadows, Oklab shadow gradients, or wants to add the funky-shadow tool to a React or web project."
author: iamnoman (https://www.npmjs.com/package/funky-shadow)
---

# Funky Shadow

`funky-shadow` renders dithered gradient shadows behind an element. It uses a hidden canvas, Bayer matrix thresholding, and Oklab color interpolation. Use it for expressive product cards, editorial feature panels, app icons, media tiles, and small hero accents where a normal CSS shadow feels too generic.

Source: https://iamnoman.com/funky-shadow

## When to Use

- The design needs a visible textured shadow or retro pixel glow.
- A card, tile, product mockup, or icon should feel more tactile without adding a full shader stack.
- The user explicitly asks for Funky Shadow, dithered shadow, Bayer shadow, pixel shadow, or Oklab shadow gradient.

Avoid it for dense operational UI, tables, forms, destructive flows, or anything where the shadow would compete with task completion.

## Install

Check the package manager first, then install normally:

```bash
bun add funky-shadow
pnpm add funky-shadow
npm install funky-shadow
```

React is an optional peer dependency. In React projects, prefer the component API. In non-React projects, use `renderShadow`.

## React Pattern

```tsx
import { FunkyShadow } from "funky-shadow";

export function FeatureCard() {
  return (
    <FunkyShadow
      width={280}
      height={180}
      radius={12}
      preset="galaxy"
      pixelScale={3}
      offsetY={20}
      blur={30}
      opacity={0.7}
    >
      <div className="h-[180px] w-[280px] rounded-xl bg-white">
        Content
      </div>
    </FunkyShadow>
  );
}
```

Keep `width`, `height`, and `radius` synchronized with the child element. If the element is responsive, derive the values from a measured wrapper or choose a stable fixed-format treatment.

## Canvas Pattern

```ts
import { renderShadow } from "funky-shadow";

const canvas = document.querySelector("canvas");

renderShadow(canvas, 280, 180, 12, {
  preset: "galaxy",
  pixelScale: 3,
  offsetY: 20,
  blur: 30,
  opacity: 0.7,
});
```

## Tuning Rules

- Start with `pixelScale={3}`. Use `1` for smooth gradients and `4` or `5` for obvious pixel texture.
- Keep `dither="4x4"` for most UI; use `8x8` for larger surfaces and `off` for clean bands.
- Prefer `shape="radial"` for natural light and `shape="line"` when the shadow should sweep directionally.
- Keep opacity below `0.8` unless the shadow is the visual subject.
- Custom `colors` should come from the project palette. Do not introduce unrelated neon palettes into restrained systems.
- Respect `prefers-reduced-motion` if the shadow parameters are animated.

## Verification

After adding Funky Shadow:

1. Run the project typecheck/build.
2. Inspect desktop and mobile viewports for clipping around the canvas shadow.
3. Confirm text and controls remain readable over or near the shadow.
4. If the component is responsive, resize slowly and check that the canvas stays aligned with the child.
