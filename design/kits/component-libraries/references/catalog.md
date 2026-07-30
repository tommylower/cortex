# UI Component Library Catalog

Checked 2026-07-29. Recheck upstream details before every pull.

## Statuses

- **foundation** — a baseline supplier, governed by Studio's current defaults.
- **integrated** — has a Cortex selection or adaptation skill.
- **saved** — a promising supplier without a Cortex workflow.
- **reference-only** — code reuse is blocked until permission is verified.

## Browse by Kind

| Kind | Suppliers |
| --- | --- |
| foundations and general UI | shadcn/ui, Base UI |
| command, input, and interaction behavior | cmdk, dnd kit, input-otp |
| feedback and product status | Sonner, Dot Matrix, Thinking Orbs |
| data display and dense UI | Dither Kit, Liveline, NumberFlow, React Virtuoso |
| motion and visual treatment | Fluid Functionalism, Torph |
| reference anatomy | Beautiful UI |
| developer tuning | Leva lives in [`design-tools`](../../../tools/design-tools/SKILL.md); DialKit has its own Cortex skill |

## shadcn/ui

- **Status:** foundation
- **Tags:** application UI, primitives, blocks, registry
- **Delivery:** CLI and registries; generated components become project-owned
  source.
- **Best pull:** common application primitives, blocks, registry distribution,
  and a consistent local component layer.
- **Studio handling:** use the primitive engine named by Studio's current
  rules. Inspect `components.json` and use CLI dry-run, view, and diff options
  before changing project-owned files.
- **Sources:** [docs](https://ui.shadcn.com/docs),
  [repository](https://github.com/shadcn-ui/ui),
  [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)

## Base UI

- **Status:** foundation
- **Tags:** headless, behavior, accessibility, primitives
- **Delivery:** `@base-ui/react`, including through shadcn's Base UI component
  base.
- **Best pull:** accessible, unstyled behavior floors for controls, menus,
  overlays, selection, and other interactive primitives.
- **Studio handling:** inherit keyboard, focus, ARIA, portal, and state
  machinery. Own wrapper grammar and skin locally.
- **Sources:** [docs](https://base-ui.com/react/overview/quick-start),
  [repository](https://github.com/mui/base-ui) (MIT)

## cmdk

- **Status:** saved
- **Tags:** command menu, combobox, search, keyboard, headless, React
- **Delivery:** `cmdk` npm package. The core command surface is unstyled; its
  bundled `Command.Dialog` composes Radix Dialog.
- **Best pull:** command palettes, searchable action lists, and composable
  combobox-like interfaces with built-in filtering, grouping, selection,
  loading, and empty states.
- **Studio handling:** use the command behavior without importing a second
  overlay engine. In a Base UI project, mount the core `Command` inside the
  project's existing dialog or popover rather than using `Command.Dialog`.
  Keep keyboard invocation immediate, provide unique values and labels, and
  bring virtualization when result counts exceed cmdk's intended range.
- **Sources:** [repository and documentation](https://github.com/dip/cmdk),
  [MIT license](https://github.com/dip/cmdk/blob/main/LICENSE.md)

## dnd kit

- **Status:** saved
- **Tags:** behavior, drag and drop, sorting, accessibility, cross-framework
- **Delivery:** layered packages with a framework-agnostic core and adapters
  for React, Vue, Svelte, and Solid; React projects use `@dnd-kit/react`.
- **Best pull:** draggable, droppable, sortable, and reorderable interfaces
  that need pointer, touch, and keyboard sensors plus collision and constraint
  extension points.
- **Studio handling:** inherit sensors, ARIA, announcements, collision, and
  sortable behavior rather than rebuilding them. Verify keyboard and screen
  reader instructions, touch thresholds, focus restoration, cancellation,
  reduced motion, scroll containers, and every valid and invalid drop state.
- **Sources:** [docs](https://dndkit.com/),
  [repository](https://github.com/clauderic/dnd-kit),
  [MIT license](https://github.com/clauderic/dnd-kit/blob/main/LICENSE)

## input-otp

- **Status:** saved
- **Tags:** form input, authentication, one-time code, accessibility, unstyled, React, shadcn
- **Delivery:** zero-dependency `input-otp` React package or the shadcn
  `input-otp` wrapper.
- **Best pull:** verification and one-time-passcode fields that preserve one
  real input for autofill, paste, selection, keyboard, screen reader, form,
  and password-manager behavior while exposing visual slot state.
- **Studio handling:** inherit the single-input behavior floor; never rebuild
  the field as several manually coordinated inputs. Own slot grammar and skin
  locally, then verify labels, error state, partial paste, SMS autofill,
  mobile keyboards, password managers, no-JS fallback, and auto-submit.
- **Sources:** [docs](https://input-otp.rodz.dev/),
  [repository](https://github.com/guilhermerodz/input-otp),
  [MIT license](https://github.com/guilhermerodz/input-otp/blob/master/LICENSE)

## Fluid Functionalism

- **Status:** integrated
- **Tags:** motion, controls, AI UI, registry
- **Delivery:** selective shadcn registry components.
- **Best pull:** animated controls, proximity hover, operational UI, and
  AI/chat surfaces where motion clarifies state.
- **Studio handling:** load `fluid-functionalism`, preserve the project's
  primitive engine, and adapt selected components to local tokens and
  dependencies.
- **Sources:** [docs](https://www.fluidfunctionalism.com/docs),
  [registry](https://www.fluidfunctionalism.com/r/registry.json),
  [repository](https://github.com/mickadesign/fluid-functionalism)

## Dither Kit

- **Status:** saved
- **Tags:** charts, data visualization, dither, canvas, motion, registry
- **Delivery:** selective shadcn registry components through the Dither Kit
  CLI, which keeps a lockfile for later update and diff operations; direct
  shadcn registry installation is also supported.
- **Best pull:** composable area, line, bar, pie, and radar charts when a
  dithered rendering language is a deliberate fit. The registry also includes
  generative avatars, dithered buttons, and gradient washes.
- **Studio handling:** install selectively into a Tailwind + shadcn project,
  then treat the generated files as project-owned source. Verify chart
  legibility before visual effect, count the dither treatment against
  Studio's one-loud-thing attention budget, retune entrance motion under the
  project profile, and inspect the pulled `motion` and `d3` dependencies.
- **Sources:** [docs](https://www.tripwire.sh/dither-kit),
  [repository](https://github.com/Boring-Software-Inc/dither-kit),
  [root package manifest](https://github.com/Boring-Software-Inc/dither-kit/blob/main/package.json),
  [CLI package](https://www.npmjs.com/package/@dither-kit/cli). MIT is
  declared in the root and CLI package manifests; no root license file was
  present when checked on 2026-07-29.

## Liveline

- **Status:** saved
- **Tags:** charts, data visualization, real-time, streaming, canvas, motion, React
- **Delivery:** `liveline` npm package for React 18 and newer, rendered on
  canvas with no CSS import.
- **Best pull:** continuously updating line, multi-series, and candlestick
  charts with scrubbing, time windows, loading, paused, and empty states.
- **Studio handling:** use for genuinely live data rather than ordinary static
  dashboards. Bind appearance to project tokens, keep decorative momentum and
  burst effects subordinate to data legibility, and verify pause, empty,
  loading, reduced-motion, keyboard, screen reader, and non-canvas fallback
  behavior.
- **Sources:** [repository and documentation](https://github.com/benjitaylor/liveline),
  [MIT license](https://github.com/benjitaylor/liveline/blob/main/LICENSE)

## NumberFlow

- **Status:** saved
- **Tags:** motion, numbers, data display, accessible, cross-framework
- **Delivery:** dependency-free packages for React (`@number-flow/react`),
  Vue, Svelte, and plain TypeScript/JavaScript.
- **Best pull:** prices, percentages, counters, timers, and other changing
  numeric values where digit continuity helps the user perceive the update.
- **Studio handling:** animate only meaningful value changes, preserve the
  default reduced-motion behavior and accessible reading order, use tabular
  numerals where layout stability matters, and retune motion through project
  tokens. Verify locale requirements: non-Latin digits and RTL locales are
  listed as current limitations.
- **Sources:** [docs](https://number-flow.barvian.me/),
  [repository](https://github.com/barvian/number-flow),
  [MIT license](https://github.com/barvian/number-flow/blob/main/LICENSE.md)

## React Virtuoso

- **Status:** saved
- **Tags:** virtualization, lists, grids, tables, chat, performance, React
- **Delivery:** `react-virtuoso` for MIT-licensed list, grouped-list, grid,
  table, and masonry virtualization. Virtuoso Message List is a separate
  commercially licensed product.
- **Best pull:** large or variable-height collections, infinite feeds, grids,
  tables, and chat-like surfaces that need stable scrolling without manual
  item measurement.
- **Studio handling:** use only when collection scale justifies
  virtualization. Preserve semantic markup, focus, selection, scroll
  anchoring, loading, empty, error, prepend, and restore-position states.
  Confirm the exact package license before using Message List; do not treat
  the commercial component as part of the MIT core.
- **Sources:** [docs and license matrix](https://virtuoso.dev/),
  [core repository](https://github.com/petyosi/react-virtuoso)

## Sonner

- **Status:** saved
- **Tags:** feedback, toast, notifications, status, React
- **Delivery:** `sonner` npm package with a single `Toaster` mount and
  imperative `toast()` calls; also available through shadcn.
- **Best pull:** transient success, error, loading, promise, action, and
  informational notifications with stacking and dismissal behavior.
- **Studio handling:** prefer the project's shadcn wrapper when present. Map
  every toast to a real product state, preserve live-region semantics,
  actions, pause, dismissal, and focus behavior, and retune placement, skin,
  duration, and motion through project tokens rather than supplier defaults.
- **Sources:** [docs](https://sonner.emilkowal.ski/),
  [repository](https://github.com/emilkowalski/sonner),
  [MIT license](https://github.com/emilkowalski/sonner/blob/main/LICENSE.md)

## Dot Matrix

- **Status:** integrated
- **Tags:** motion, loading, indicators, registry
- **Delivery:** `@dotmatrix` shadcn registry.
- **Best pull:** compact loading indicators for pending and processing states.
- **Studio handling:** load `loading-states`; retune the selected loader to the
  project's motion and reduced-motion rules.
- **Sources:** [docs](https://dotmatrix.zzzzshawn.cloud/getting-started/introduction),
  [usage](https://dotmatrix.zzzzshawn.cloud/getting-started/usage),
  [repository](https://github.com/zzzzshawn/matrix). Recheck the upstream
  license before copying or redistributing source.

## Thinking Orbs

- **Status:** saved
- **Tags:** motion, loading, AI UI, status indicators, canvas
- **Delivery:** zero-dependency `thinking-orbs` npm package for React, rendered
  with a 2D canvas.
- **Best pull:** six distinct agent-activity indicators—working, searching,
  solving, listening, composing, and shaping—with separate avatar and inline
  sizes.
- **Studio handling:** use only when each orb state maps to a real product
  state. Treat its baked speeds as supplier values to review under Studio,
  preserve the static reduced-motion frames and accessible labels, and verify
  automatic theme detection against the host project.
- **Sources:** [site](https://orbs.jakubantalik.com/),
  [repository](https://github.com/Jakubantalik/thinking-orbs),
  [MIT license](https://github.com/Jakubantalik/thinking-orbs/blob/main/LICENSE)

## Beautiful UI

- **Status:** reference-only
- **Tags:** AI UI, interaction patterns, application UI, copy-paste
- **Delivery:** browser gallery with copy-paste React, TypeScript, and Tailwind
  examples.
- **Best pull:** AI-native interface anatomy: loading and thinking states,
  streaming answers, approvals, tool activity, task rows, chat composers,
  context and recommendation cards, diffs, tables, search, and fine-tuning
  controls.
- **Studio handling:** study composition, slots, states, and interaction
  grammar. Do not copy code into Cortex or a project until reuse permission is
  verified.
- **Source:** [Beautiful UI](https://beautiful-ui-five.vercel.app/). No public
  source repository or license was identified on 2026-07-29.

## Torph

- **Status:** saved
- **Tags:** motion, text, morphing, cross-framework
- **Delivery:** dependency-free `torph` npm package with React, Vue, Svelte,
  and vanilla JavaScript entry points.
- **Best pull:** morphing between changing text values with CSS or
  physics-based spring easing.
- **Studio handling:** use when continuity between text values communicates a
  real state change. Tune duration or spring values through Studio rather than
  inheriting package examples, keep reduced-motion support enabled, and verify
  the rendered element remains semantically correct.
- **Sources:** [site](https://torph.lochie.me/),
  [package documentation](https://github.com/lochie/torph/blob/main/packages/torph/README.md),
  [repository](https://github.com/lochie/torph),
  [MIT license](https://github.com/lochie/torph/blob/main/LICENSE)

## Adding an Entry

Record status, tags, delivery, best pull, Studio handling, canonical sources,
and license state. Paraphrase the source; never copy its marketing language or
code.

Keep the entry here until repeated use reveals a reusable install or adaptation
sequence that upstream documentation does not provide. Only then promote it to
its own skill.
