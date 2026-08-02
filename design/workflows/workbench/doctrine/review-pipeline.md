# review pipeline

how a mock from anywhere becomes an approved, elevated section. generalized
from the reference project's component-framework; project-agnostic. this is the
workbench-specific procedure that funnels into studio's
`doctrine/component-intake.md`. the intake loop owns the three-layer model and
the buckets; this file owns the CANVAS path around it.

## the core idea

a component can be mocked anywhere: paper, figma, or by hand in code. the mock
is only ever a visual spec. everything after handoff is identical no matter
where the mock came from. the mock owns the look. the pipeline owns behavior,
tokens, and review.

two contracts are the law (studio invariants 4 and 8):

- **behavior floor**: keyboard, focus, aria, the state machine. inherited from
  a proven engine, never redrawn. identical whether it comes from base-ui,
  radix, react-aria, or hand-rolled novel code. scroll/intersection reveals run
  once and do not re-fire on re-entry (novel-bucket code owns this guarantee
  itself, no engine supplies it).
- **skin**: color, radius, type, motion, density. always ours. exactly one
  `.brand-*` class per component owns all visuals, tokens only.

the engine that satisfies the floor is a profile default, not the law.

## the pipeline: one path, three intake modes converge at stage 4

```text
1. brief             register/extend the section in src/design/sections.tsx
2. source classify   bucket per component-intake: composition | headless-floor | novel
3. local primitive   behavior lands in components/ui, cva skin confined here
4. token reconcile   <-- every intake mode converges here. all values -> tokens
5. brand skin        one .brand-* class + a system/section wrapper
6. canvas review     state matrix at 375 / 768 / 1024 / 1440, every cell in
                     both color schemes (the workspace renders a light and a
                     .dark cell per state)
7. approval          operator accepts; status -> approved
8. elevation         assemble into a page, move shared primitives, update registries
```

stage rules pulled out of the list:

- stage 2, bucket: behavior complexity drives the bucket, not how expressive it
  looks. expressiveness is free in every bucket; only complex interaction pulls
  for a headless engine.
- stage 3, composition: composition-bucket components have no behavior floor and
  land directly in `components/` as product; no ui primitive is created for
  them.
- stage 3, headless-floor: the component that composes engine parts IS the
  primitive. the whole engine assembly (field, label, control, error slots)
  lives in `components/ui`; product compositions import that primitive, never
  the engine's sub-parts (the engine-boundary check enforces this).
- a variant axis on a composition-bucket component is a `data-*` attribute
  keyed in the skin, nothing more. cva (and a ui primitive) enters only when
  the axis rides a behavior floor.

## stage 8: elevation

- elevate only from `approved`. never set `elevated` from any other status;
  the operator gate at stage 7 is the pipeline's one human gate and nothing
  mechanical replaces it.
- assemble: import the section component into the target page. the canvas
  chrome (`.brand-canvas*`) is never a product frame; a product page's layout
  skin is its own `.brand-*` wrapper class in `globals.css` (e.g.
  `.brand-page`), tokens only, so the screen stratum still states no values.
- dedupe shared primitives: the primitive stays in `components/ui` where
  stage 3 put it. when a second section needs the same behavior floor, it
  imports the existing primitive; never fork a copy into the new section. for
  a composition-bucket section this sub-step is a no-op, skip it.
- update registries: set the section's `status` to `elevated` in
  `src/design/sections.tsx` (the render stays wired; the canvas keeps the
  review record). add to `lib/registry.ts` only if the elevation pulled in
  something new.

## intake adapters: each mode reaches stage 4 the same way

### paper / figma mock

- operator points at a specific frame. pull exact values with the MCP: jsx
  for slot anatomy, computed styles for values, fill-image for raster fills
  only. never read sizes or colors off a screenshot.
- map each value with the snap rule: a pulled value within ~2px or ~25% of an
  existing space/radius token (or a near-identical color) SNAPS to that
  token; record the delta. anything further proposes a new role. the
  thresholds are tunable defaults, revise them from use.
- an unlocked token still wins by default: snap the pulled value to it and
  note the delta; retune the token itself only on operator say-so. locked
  role tokens are non-authoritative from a mock, never overwrite one;
  confirm with the operator first.
- if no token family exists for a pulled axis (spacing, icon size), either
  propose the family or fall back to the seed's unit convention (rem
  literals); say which you did. never leave px raw.
- a new color role is the coordinated edits from css-invariants role
  completeness (`@theme` primitive, `:root` + `.dark`, `@theme inline`),
  named `--color-<role>`; skipping the `.dark` key is a red build.
- record the pulled value and its delta as a comment on the token line, and
  reference the mock in the section brief. that annotates the artifact in
  place; it is not a parallel record.
- mock state names map onto the `StateName` union by nearest semantic
  (dismissed -> closed); extend the union only when no member fits.
- enter at stage 4. mock output never lands raw in a section.

### code mock

- treat the in-code mock as an unskinned draft. it may carry raw utilities or
  literals.
- sweep for repeated literals, collapse to candidate tokens. scope the sweep to
  the new component only. do not rewrite existing `.brand-*` blocks.
- enter stage 4: replace literals with tokens, strip utilities that fight the
  skin, fold visuals into one `.brand-*` class. keep wired behavior only if it
  matches the engine profile; otherwise rewire onto the profile engine before
  tokenizing.
- the paper adapter's reconciliation clauses are mode-agnostic and apply here
  verbatim: the snap rule, unlocked-token-wins-with-delta, the locked-token
  guard, the no-token-family fallback, role completeness for new color roles,
  the value+delta recording sink, and StateName nearest-semantic mapping.

### external template

- register the source in the library registry (`lib/registry.ts`) first.
- record which engine the template resolves to. if it is not the profile
  engine, reject and rebuild on the profile engine (css-invariants enforcement
  owns the symmetric check and the supplier-drift fact; do not assume the
  supplier's default matches the profile).
- if the template's tooling rewrote `app/globals.css` (shadcn init injects
  imports and a parallel token vocabulary), that fork is part of THIS intake:
  reconcile the foreign roles at stage 4, or adopt them into the contract
  deliberately.
- strip the skin: drop the template's variant color / size / radius classes.
  keep only the primitive and its wiring.
- enter stage 4: re-skin via one new `.brand-*` class. the template's original
  classNames must not survive onto the element.

## the section registry: the brief lives here

`src/design/sections.tsx` is the canvas's source of truth for what to review
(`.tsx`, it carries the render components).
each section carries the brief so the canvas and the operator share one record:

- purpose, named copy source (verbatim, no fabricated copy. greenfield, when
  no source exists yet: name the placeholder explicitly and mark it to be
  replaced; never silently fabricate product copy)
- one-sentence desktop intent, one-sentence mobile intent
- acceptance criteria
- status: `draft | in-review | approved | elevated`
- the state list to render (default / open / closed / hover / focus / active /
  disabled / loading / empty / error, as the component has them. overlays name
  open/closed; they are states like any other)

design decisions live in the artifact, never hand-transcribed. the registry
carries the brief and status, not a parallel spec.

## overlays on the canvas

a portalled overlay (dialog, sheet, popover) escapes its review cell by
default: the engine portals to `<body>`, `position: fixed` centers every open
cell on the viewport, and N modal instances fight for focus trap and scroll
lock, rendering the canvas inert. the review render is therefore a contained,
non-modal variant of the same component:

- the section component renders its own positioned frame div inside the cell
  and passes that frame as the engine's portal container. hold the frame
  in state and pass the element:

  ```tsx
  const [frame, setFrame] = useState<HTMLDivElement | null>(null);
  <div ref={setFrame} className="brand-x-frame" /* portal target */ />
  // pass `frame` (the element) as the engine's portal container
  ```

  the reason is portability and SSR honesty, not ref timing: some engines
  (base-ui) accept a bare ref and resolve it internally, others and raw
  `createPortal` read the container at render time and a null first-render
  ref escapes the popup to body. state works everywhere. either way the
  popup is absent from prerendered html until a client render, so containment
  can only be verified in a hydrated browser, never via curl.
- the frame, not the cell, is the containing block; the seed's
  `.brand-canvas-cell` is `position: relative` only so the frame can size
  against it.
- the review render sets the engine's non-modal option. for the open state,
  either control `open` per state cell, or use the engine's keep-mounted
  option and hide closed popups in the skin (a mounted closed popup renders
  otherwise; e.g. `[data-slot="popup"][data-closed] { display: none; }`).
- the contained variant carries `data-contained`; the skin keys
  viewport-fixed (product/elevated) vs absolute-in-frame (review) off that
  attribute. never make the popup unconditionally absolute, or the elevated
  modal loses its viewport centering.
- if the primitive is modal-only (e.g. Base UI AlertDialog hardcodes
  modal: true and omits the prop), build the contained review render on the
  engine's non-modal sibling primitive (Dialog with the non-modal option),
  sharing the same skin; the product render keeps the modal alert primitive.
- modality, `<body>` portaling, and scroll lock are PRODUCT behavior; they are
  exercised at elevation (stage 8) and in the product screen, not in the
  matrix cells. the behavior floor checklist (focus trap + return, Esc, aria)
  is verified on the elevated render or a single interactive instance, never
  across N cells at once.
- elevation re-enables modality and `<body>` portaling. never ship the
  review render as-is; the non-modal contained variant exists for the matrix
  only.

## reviewing behavior on the canvas

the overlay recipe generalizes to any interactive or novel behavior (scroll
reveals, streaming text, custom triggers, and ordinary hover/focus), not just
portals. a static matrix cell cannot fire a live trigger or pseudo-class, so:

- static cells render forced end states: the section component accepts a
  forced-state seam (its `state` prop) that bypasses the live trigger, so
  every state is a reviewable frame.
- the seam applies to every INTERACTIVE component, not just novel ones:
  `:hover` and `:focus-visible` never fire in a static cell, so the section
  render forces those states via `data-state`, and the skin keys each
  reviewable state off BOTH the live pseudo-class and the matching
  `data-state` selector. write the pair once, side by side.
- the BEHAVIOR (run-once, trigger timing, re-entry) is un-reviewable as
  static cells. verify it on a single live interactive instance or the
  elevated render, exactly as overlays do; that clause is general.
- a state whose end state is invisible (a hidden reveal at opacity 0) still
  needs a reviewable cell: the cell's frame and caption are the affordance
  that distinguishes correctly-hidden from broken-empty. never review an
  invisible state without one.

## per-component checklist

- [ ] brief in `sections.tsx`: purpose, named copy source, desktop + mobile
      sentence, acceptance criteria
- [ ] intake mode declared; no raw mock / template classes survive stage 4
- [ ] bucket + engine chosen per component-intake; non-default engine recorded
      in `lib/registry.ts`
- [ ] behavior floor met (keyboard, visible focus ring, focus trap + return for
      overlays, correct role/aria/labels, disabled communicated and inert, 44px
      coarse target, reduced motion resolves to end state, reveals run once)
- [ ] every value resolves to a token via `var()`; zero hex / one-off px in new code
- [ ] exactly one `.brand-*` class owns visuals; no utility / cva classes on it
- [ ] semantic props map to data-attributes; dependency rule respected (screens
      never state raw values)
- [ ] reviewed on the canvas across 375 / 768 / 1024 / 1440
- [ ] reviewed in BOTH color schemes; the dark cells degrade nothing (role
      completeness is the mechanical check, the dark cells are the eyes on it)
- [ ] copy verbatim from the named source; no em dashes
- [ ] operator approved -> status `approved`
- [ ] elevated: assembled, shared primitives deduped (imported, never
      forked), registries updated, `next build` passes,
      `data-wave-signature` intact
