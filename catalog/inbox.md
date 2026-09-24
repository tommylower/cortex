# resource inbox

use this inbox for external resources that are worth preserving but are not yet tested, adopted, or ready for a permanent cortex shelf.

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

### GitHub Tools for eve

- status: `saved`
- source: [Vercel announcement](https://vercel.com/changelog/github-tools-eve) and [GitHub Tools integration guide](https://github-tools.com/frameworks/eve)
- purpose: build durable GitHub agents for code review, issue triage, repository exploration, CI operations, and maintainer work, with preset tool scopes and human approval gates for writes.
- likely home: agent infrastructure or a future `agent-workflows` GitHub automation experiment; not a default Cortex skill.
- license: MIT
- runtime: TypeScript on eve with `@github-tools/sdk`, AI SDK v7, Zod, and either a GitHub token or Vercel Connect. Intended for deployed or long-running agents rather than ordinary interactive Codex or Claude Code sessions.
- caution: the preferred `@github-tools/eve-extension` direction was not yet published to npm when reviewed. Some write operations are not idempotent, so durable approval and replay behavior must be tested before granting repository write access.
- promote when: a real persistent GitHub workflow needs scheduled or unattended PR review, issue triage, or CI maintenance that current interactive GitHub tools do not cover.

### emulsion

- status: `saved`
- source: [dennisonbertram/emulsion](https://github.com/dennisonbertram/emulsion)
- purpose: collaborative storyboard blocking for AI filmmaking. combines a Claude Code skill with a three.js browser app, live agent edits, keyframed objects and cameras, and MP4 motion-reference exports for video-generation workflows.
- likely home: `design/tools/emulsion`
- license: MIT
- runtime: Python 3 local server on port 8741, browser UI, three.js from a CDN, and Node-based QA/export helpers.
- caution: early-stage project. audit the skill before installation because its upstream instructions encourage agents to contribute improvements back automatically.
- promote when: it has been tested in a disposable project, its agent instructions and network behavior have been reviewed, and a real filmmaking workflow justifies maintaining a Cortex integration.

### jakubkrehel/skills

- status: `promoted`
- source: [jakubkrehel/skills](https://github.com/jakubkrehel/skills), reviewed at `a67333399dabbc71d7778962cb9c4fb9b86a00d0`
- purpose: seven agent skills for whole-interface review, UI polish, typography, color, accessibility, layout, and UX writing. the quoted `/better-colorsi` is a typo; the upstream skill is `better-colors`.
- likely home: `better-typography`, `better-layout`, and `better-accessibility` are in `design/foundations/`; `better-writing` and `better-ui` are in `design/craft/`; `better-colors` upgraded `design/color/oklch-skill`; `better-interface` improved `design/review/studio-audit` instead of becoming a competing router.
- license: MIT, copyright 2026 Jakub Krehel.
- runtime: documentation-only Agent Skills. no scripts, packages, services, or code execution.
- caution: upstream motion recipes remain supplier values and cannot override Studio defaults. Cortex descriptions were pruned, references moved behind contextual pointers, and each standalone review format yields to `studio-audit` when orchestrated.
- promote when: promoted on 2026-07-29. validate the adapted domain coverage on the next real `studio-audit` and revise only from observed gaps.

### emilkowalski/skills

- status: `promoted`
- source: [emilkowalski/skills](https://github.com/emilkowalski/skills), reviewed at `d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128` (2026-09-24; first reviewed at `70744e3`).
- purpose: thirteen skills covering motion craft, building animations, focused review, codebase animation audits and plans, opportunity finding, animation vocabulary, Apple design principles, mobile web feel, library selection, Sonner, UI variant prototyping, React Native animation, and Swift.
- likely home: `design/emil/` holds the upstream skills as-is: `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, and `mobile-native`. `pick-ui-library` improved `component-libraries`; `ask-sonner` became `component-libraries/references/sonner.md`; the variant picker improved the engineering `prototype` UI branch. `animate-expo` and `write-swift` are not vendored.
- license: MIT, copyright 2026 Emil Kowalski.
- runtime: documentation-only Agent Skills. no scripts, packages, services, or code execution.
- caution: concrete motion values remain supplier examples beneath project tokens and Studio law. On 2026-09-24 the earlier consolidation of the three audit skills into `emil-design-eng` was reversed: they were hard to find by name, so each is its own skill again. `design/emil/README.md` records the update procedure.
- promote when: promoted on 2026-07-29; regrouped under `design/emil/` on 2026-09-24.
