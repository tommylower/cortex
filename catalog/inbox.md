# resource inbox

use this inbox for external resources cortex is actively evaluating for a permanent shelf. plain bookmarks and someday ideas are kept outside cortex; an entry comes here when evaluation starts.

an inbox entry is not an endorsement or installation instruction. before promotion, verify the source, license, runtime behavior, maintenance status, and fit with an existing shelf.

## lifecycle

- `saved` — captured with enough context to find and assess later.
- `evaluating` — under active review or being tested in a disposable environment.
- `promoted` — moved into a permanent cortex skill, tool, workflow, or reference.
- `retired` — kept for history but no longer recommended.

## entry template

```md
### name

- status:
- source:
- purpose:
- likely home:
- license:
- runtime:
- caution:
- promote when:
```

## entries

### inkboard/system-atlas

- status: `evaluating`
- source: [inkboard/system-atlas](https://github.com/inkboard/system-atlas), reviewed 2026-10-21 (last push 2026-09-01, 7 commits)
- purpose: an agent skill that turns an architecture discussion into an explorable isometric map (chapters, hover and pin, go inside for steps, inspectable data packets) plus a generated `SYSTEM.md`, both built from one `data.mjs`. open questions carry stable ids and states across feedback rounds.
- likely home: studio's `inventory.md` as a supplier beside `spec-map`, for systems still being designed. `spec-map` keeps the static spec map.
- license: MIT.
- runtime: documentation and build script only. `bun build.mjs` writes one self-contained html file (a google fonts stylesheet is its only external asset). installs with `npx skills add inkboard/system-atlas`.
- caution: young and quiet since september. it carries its own visual language and its own process rules; read them as examples, not studio law. it asks before committing docs, and its docs-policy advice may not match a project's.
- promote when: it maps two real systems still in design, each through at least one feedback round, without fighting studio's rules.

### @shadcn/lint

- status: `evaluating`
- source: [shadcn-ui/lint](https://github.com/shadcn-ui/lint), reviewed at `@shadcn/lint@0.2.1` (2026-10-10)
- purpose: an agent-first linter for Tailwind v4 design systems, as an ESLint or Oxlint plugin. six rules (`no-restyle`, `no-raw-colors`, `no-arbitrary-values`, `no-inline-styles`, `no-unknown-classes`, `require-static-classes`), each naming the fix from the project's own components, variants, and theme.
- likely home: studio's `doctrine/enforcement.md`, as the lint gate beside preflight for `cva-utilities` projects. studio's `inventory.md` carries its verdict.
- license: MIT.
- runtime: a per-project dev dependency. needs Node 20.19+, ESLint 9.30+ with `@typescript-eslint/parser` 8.40+, or Oxlint 1.80+.
- caution: pre-1.0 and moving fast. it repeats preflight's raw-hex check inside arbitrary classes. `--brand-*` primitives in `@theme` pass `no-raw-colors` as theme colors, so screens need a deny rule to stay on `--color-*` roles.
- promote when: it runs clean in two real `cva-utilities` projects without fighting preflight.

### jakubkrehel/skills

- status: `promoted`
- source: [jakubkrehel/skills](https://github.com/jakubkrehel/skills), reviewed at `a67333399dabbc71d7778962cb9c4fb9b86a00d0`
- purpose: seven agent skills for whole-interface review, UI polish, typography, color, accessibility, layout, and UX writing. the quoted `/better-colorsi` is a typo; the upstream skill is `better-colors`.
- likely home: `better-typography`, `better-layout`, and `better-accessibility` are in `design/foundations/`; `better-writing` and `better-ui` are in `design/craft/`; `better-colors` upgraded `design/color/oklch-skill`; `better-interface` improved `design/review/studio-audit` instead of becoming a competing router.
- license: MIT, copyright 2026 Jakub Krehel.
- runtime: documentation-only Agent Skills. no scripts, packages, services, or code execution.
- caution: upstream motion recipes remain supplier values and cannot override Studio defaults. Cortex descriptions were pruned, references moved behind contextual pointers, and each standalone review format yields to `studio-audit` when orchestrated.
- promote when: promoted on 2026-07-29. validate the adapted domain coverage on the next real `studio-audit` and revise only from observed gaps.

### blader/humanizer

- status: `promoted`
- source: [blader/humanizer](https://github.com/blader/humanizer), reviewed at `9862685` (2026-09-24).
- purpose: rewrite AI-sounding prose so it reads like the writer, based on Wikipedia's "Signs of AI writing".
- likely home: `agent-workflows/humanizer`, next to `google-developer-style`. The five most persistent tells also went into the private always-on writing profile.
- license: MIT, copyright 2025 Siqi Chen.
- runtime: documentation-only Agent Skill. the upstream plugin manifests, `agents/openai.yaml`, and package validator were not vendored.
- caution: the multi-line description was flattened to one line and given routing pointers to `google-developer-style` and `better-writing`.
- promote when: promoted on 2026-09-24.

### emilkowalski/skills

- status: `promoted`
- source: [emilkowalski/skills](https://github.com/emilkowalski/skills), reviewed at `d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128` (2026-09-24; first reviewed at `70744e3`).
- purpose: thirteen skills covering motion craft, building animations, focused review, codebase animation audits and plans, opportunity finding, animation vocabulary, Apple design principles, mobile web feel, library selection, Sonner, UI variant prototyping, React Native animation, and Swift.
- likely home: `design/emil/` holds the upstream skills as-is: `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, and `mobile-native`. `pick-ui-library` improved `component-libraries`; `ask-sonner` became `component-libraries/references/sonner.md`; the variant picker improved the engineering `prototype` UI branch. `animate-expo` and `write-swift` are not vendored.
- license: MIT, copyright 2026 Emil Kowalski.
- runtime: documentation-only Agent Skills. no scripts, packages, services, or code execution.
- caution: concrete motion values remain supplier examples beneath project tokens and Studio law. On 2026-09-24 the earlier consolidation of the three audit skills into `emil-design-eng` was reversed: they were hard to find by name, so each is its own skill again. `design/emil/README.md` records the update procedure.
- promote when: promoted on 2026-07-29; regrouped under `design/emil/` on 2026-09-24.
