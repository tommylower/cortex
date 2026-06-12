---
name: pretext
description: "Pretext by Cheng Lou. Pure JavaScript/TypeScript library for fast, accurate multi-line text measurement and layout without DOM reflow. Use whenever working on typography rules, text-heavy components, button or label overflow checks, virtualized lists, masonry layouts, balanced text, shrink-wrap text, dynamic input autosizing, layout-shift prevention on async text loads, or any case where text dimensions affect layout decisions. Triggers on: text measurement, text layout, text overflow, button label, label fits, multi-line text, text height, shrink-wrap, balanced text, virtualization, masonry, typography rules, layout shift, async text, label overflow, input autosize."
author: Cheng Lou (https://github.com/chenglou/pretext)
---

# pretext

Pure JavaScript/TypeScript library for multi-line text measurement and layout. Fast, accurate, language-aware, render-agnostic (DOM, Canvas, SVG, server-side). Side-steps DOM measurements (`getBoundingClientRect`, `offsetHeight`) which trigger layout reflow.

The library implements its own text measurement using the browser's font engine as ground truth. Measurements are pure arithmetic over precomputed widths. Highly AI-friendly: agents can verify "does this label fit?" without spinning up a headless browser.

## The text rule (always folds into projects)

> **Never trigger DOM reflow for text measurement. Precompute heights and widths in pure arithmetic. Keep text layout deterministic and verifiable without a browser.**

This rule applies whenever the project has:
- buttons / tags / chips with dynamic labels (verify they don't overflow)
- inputs with autosizing height
- virtualized lists or masonry layouts
- balanced-text heroes (binary-search a nicer wrap point)
- async text loads where layout shift would otherwise occur
- shrink-wrap text containers (tightest container width that fits the actual text content)

If any of those exist, pretext is the implementation backbone. CSS alone cannot give precise text dimensions before render.

## When to reach for it

Reach for pretext when:
- you need text height BEFORE rendering (preallocate space, prevent layout shift)
- you need shrink-wrap (CSS `width: min-content` is wrong for multi-line; pretext gives the actual narrowest width that fits)
- you're building a virtualized list and need accurate per-item heights without rendering them
- you need balanced text wrapping (e.g., two-line headlines that don't have one orphan word)
- you need dev-time / agent-time verification that a label fits in a container at a given width
- you're rendering to Canvas, SVG, WebGL, or server-side (browsers' DOM measurement is unavailable)

Don't reach for it when:
- text is single-line and CSS `white-space: nowrap` + `text-overflow: ellipsis` solves the problem
- container width is fluid and you're fine with whatever wrapping the browser produces
- the text is decorative and exact measurements don't drive any layout decision

## Install (when adding to a project)

1. **Check if already installed.** Look for `@chenglou/pretext` in package.json dependencies. If found, report and exit.

2. **Install.**
   ```sh
   npm install @chenglou/pretext
   # or: bun add @chenglou/pretext
   # or: pnpm add @chenglou/pretext
   ```

3. **Add a measurement helper** at `src/lib/text-measure.ts` (or your project's lib path):
   ```ts
   import { prepare, layout, prepareWithSegments, measureLineStats, walkLineRanges, type LayoutCursor } from '@chenglou/pretext'

   // Sync font + letterSpacing string with your CSS exactly.
   // font follows canvas font shorthand: "500 16px Inter"
   // letterSpacing in CSS px

   export function measureTextHeight(text: string, font: string, maxWidth: number, lineHeight: number) {
     const prepared = prepare(text, font)
     return layout(prepared, maxWidth, lineHeight)
   }

   export function shrinkWrapWidth(text: string, font: string, maxWidth: number) {
     const prepared = prepareWithSegments(text, font)
     let widest = 0
     walkLineRanges(prepared, maxWidth, line => {
       if (line.width > widest) widest = line.width
     })
     return widest
   }

   export function fitsInOneLine(text: string, font: string, maxWidth: number) {
     const prepared = prepareWithSegments(text, font)
     const { lineCount } = measureLineStats(prepared, maxWidth)
     return lineCount === 1
   }
   ```

4. **Sync the font and letter-spacing strings with the project's tokens.** If `references/tokens.md` defines `--text-body: 16px / 24px / 0em / 400`, the pretext call must be `prepare(text, '400 16px <font-family>')` with `letterSpacing: 0`. If they drift, measurements drift.

5. **Confirm setup.** Tell the user pretext is installed and the helper is at `src/lib/text-measure.ts`.

## Project rule fold-in (which references file gets which rule)

When designing or implementing a project that uses pretext, fold these rules into the project's `references/*.md` (rules abstract, no attribution per the SHIPS rule):

### `references/tokens.md` (typography section)

Add a rule near the type scale table:

> **Text dimensions are computed via a deterministic measurement helper, not via DOM reflow.** Components that depend on text height or width must call the project's text-measure helper, not `getBoundingClientRect` or `offsetHeight`. Sync font, weight, size, line-height, and letter-spacing exactly between CSS tokens and the measurement helper.

### `references/components.md`

For atoms with dynamic labels (button, tag, chip, input):

> **Label overflow check.** Dynamic labels are verified at dev time / agent time using the text-measure helper. Buttons and tags must not silently wrap to two lines.

For autosizing inputs / textareas:

> **Autosizing height.** Computed via measurement helper. Set the textarea height to the precomputed value before render.

### `references/primitives.md`

For virtualized lists, masonry, or balanced-text primitives:

> **Item heights are precomputed via the measurement helper.** Virtualization buffers are sized from precomputed heights, not from rendered measurements. Masonry placement uses precomputed heights to avoid layout thrash.

### `references/responsive.md`

> **Shrink-wrap pattern.** When a container should be the tightest width that fits multi-line text, use the measurement helper's shrink-wrap function rather than CSS `min-content` (which is wrong for multi-line). Set the container to the returned width.

### `references/animation.md`

> **Layout-shift prevention on async text.** When text loads asynchronously and triggers layout, precompute the final height via the measurement helper before the text inserts. Reserve space, then fade text in.

### `references/platform-mapping.md`

> **Text measurement helper.** Project includes `@chenglou/pretext` and a wrapper at `src/lib/text-measure.ts` exposing `measureTextHeight`, `shrinkWrapWidth`, `fitsInOneLine`. Components import from there, not from `@chenglou/pretext` directly, to keep font strings centralized.

## Anti-patterns

- **`getBoundingClientRect()` for layout decisions.** Triggers reflow. Use the measurement helper.
- **`offsetHeight` / `offsetWidth` for sizing.** Same problem.
- **Hidden DOM nodes used to measure text** (the classic "render in an offscreen div, read its height"). Pretext makes this obsolete and avoids the reflow.
- **Out-of-sync font strings.** If CSS says `500 16px "Inter"` and pretext gets called with `400 16px Inter`, the measurements are wrong. Always centralize through the wrapper helper.
- **Pretext for text that doesn't drive layout.** If the text is decorative and you don't need its dimensions, don't measure it. Pretext's job is precision where precision matters.
- **CSS `width: min-content` for multi-line shrink-wrap.** It picks the longest single word, not the longest wrapped line. Use `shrinkWrapWidth()`.

## Forward compatibility

When new pretext APIs land (server-side rendering, automatic hyphenation, etc.), update `src/lib/text-measure.ts` first, then update the project rules in `references/*.md` to reflect new capabilities. Don't add raw `@chenglou/pretext` imports scattered across components — the wrapper is the contract.

## See also

- repo: https://github.com/chenglou/pretext
- live demos: https://chenglou.me/pretext/
- the underlying principle: pure-arithmetic text measurement is one of those infrastructure-level inversions that unlocks correctness in places web has been wrong about for years (virtualization, balanced text, shrink-wrap, dev-time verification)
