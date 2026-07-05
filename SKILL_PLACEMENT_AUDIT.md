# Cortex Skill Placement Audit

Scope: every public skill currently listed by `catalog/shelves.json`.

Validation checked: `scripts/validate-skills.sh` passes across 107 public skills.

This audit is about human findability and agent invocation shape, not a line-by-line rewrite of every skill body. Full inventory remains in `SKILL_AUDIT.md`; this file records what was checked and what was cleaned up before building the global `/skills` or `/cortex` discovery layer.

## Verdict

The new shelf structure is basically right.

Keep these shelves:

```text
agent-workflows/
design/foundations/
design/color/
design/motion/
design/craft/
design/review/
design/systems/
design/workflows/
design/kits/
design/tools/
engineering/
marketing/skills/
local/
```

Most skills are in the right folder. The cleanup pass handled the base issues without another broad re-org:

1. `asbuilt` is now self-contained under `design/workflows/asbuilt/references/`.
2. Paper and Rams are now visible design-tool skills.
3. Dev-overlay setup rules now live in `design/tools/dev-overlays.md`.
4. `stack`, `conventions`, and `dev-setup` were merged into `project-defaults`.
5. `caveman` and `grug` now state their distinction.
6. Solve memory/discovery with a router/index, not more folders.

## Cleanup Completed

### 1. `design/workflows/asbuilt` is public-safe

Earlier versions of `asbuilt` referenced material outside this repository and carried wording that was too specific for a public skill library.

The cleanup bundled the reusable doctrine into `design/workflows/asbuilt/references/`, removed machine-specific paths, and rewrote the skill as a generic design-system extraction workflow.

Decision: keep it in `design/workflows/`.

### 2. Ghost design-tool references are now visible

Before:

- `design/AGENTS.md` and `design-tools` mention Paper / `paper.design`.
- `figma-mcp` says to use `rams`.
- No `paper`, `pencil`, or `rams` skill exists in public Cortex.

After:

- Added `design/tools/paper`.
- Added `design/tools/rams`.
- Updated `figma-mcp`, `design-tools`, `design/AGENTS.md`, and `design/ROUTING.md`.

### 3. Dev overlay production rules are deduped

Before:

- `agentation`, `dialkit`, `interface-kit`, and `dev-setup` repeat the same dev-only production-gating rules.

After:

- Added `design/tools/dev-overlays.md`.
- Updated `agentation`, `dialkit`, `interface-kit`, and `project-defaults` to point at it.

Decision: keep the three overlay tool skills separate because they install different packages.

## Possible Merges

These are the only merge candidates I would consider.

### `project-defaults`

Merged:

- `stack`
- `conventions`
- `dev-setup`

Into:

- `agent-workflows/project-defaults`

Reason: the old three skills were small project-default wrappers with overlapping triggers.

### `caveman` + `grug`

Why:

- Both are terse communication modes.
- `grug` is user-invoked; `caveman` is model-invoked and may trigger too broadly on "be brief."

Recommendation:

- Either merge into one `terse` skill with two modes:
  - `caveman`: technical compression, exact terms stay.
  - `grug`: ELI5, jargon minimized.
- Or keep both but narrow `caveman` triggers and explain the difference in the router.

Decision: keep both, but make the difference explicit in the skill descriptions and future inventory aliases.

### `css-interaction-tips` into `emil-design-eng`

Why:

- It is a compact recipe subset of the broader craft/motion judgment in `emil-design-eng`.

Recommendation:

- Keep it separate if you want automatic routing for small hover/button/popover fixes.
- Fold it into `emil-design-eng/references/` only if reducing skill count matters more than precise invocation.

My preference: keep separate.

## Keep Separate

These look overlapping at first glance but should stay separate.

### Design Review

- `preflight`: static code/UI/a11y/AI-slop ship check.
- `wip-senior-audit`: live product audit with desktop/mobile screenshots and report output.
- `agentation-self-driving`: visible browser annotation workflow.

Same neighborhood, different execution paths. Do not merge.

### Design Systems

- `swiss-design`: opt-in Swiss International Style visual system.
- `muller-brockmann-grid-systems`: stricter grid construction and verification workflow.
- `nothing-design`: full branded monochrome/industrial system with deep references.

Do not merge. Keep opt-in only.

### Design Craft

- `emil-design-eng`: taste, motion judgment, invisible UI detail.
- `interface-craft`: storyboard animation, DialKit-oriented tuning, critique branches.
- `css-interaction-tips`: tiny CSS interaction recipes.

Mostly right as-is.

### Engineering Planning

- `to-prd`: conversation to PRD.
- `to-issues`: PRD/plan to vertical-slice issues.
- `handoff`: closeout/restart continuity.
- `merge-quiz`: understanding check before merge.

These occur at different workflow moments and produce different artifacts. Group in router; do not merge.

### Marketing

`marketing/skills` is an upstream submodule. Do not merge or refolder upstream skills inside Cortex.

There are natural semantic clusters:

- Acquisition: `ads`, `ad-creative`, `directory-submissions`, `programmatic-seo`, `seo-audit`, `ai-seo`
- Conversion: `cro`, `signup`, `onboarding`, `paywalls`, `pricing`, `offers`
- Content: `content-strategy`, `copywriting`, `copy-editing`, `emails`, `social`, `video`, `image`
- Research: `customer-research`, `competitor-profiling`, `competitors`
- Lifecycle/revenue: `analytics`, `revops`, `referrals`, `churn-prevention`

Represent those clusters in the generated index/aliases, not by moving files.

## Folder Placement Confirmation

| Shelf | Placement Verdict |
| --- | --- |
| `agent-workflows` | Right. `project-defaults` now owns scaffold/stack/conventions/dev setup. |
| `design/foundations` | Right. Baseline principles and responsive/loading/reference patterns belong here. |
| `design/color` | Right. OKLCH and gradients are cleanly scoped. |
| `design/motion` | Right. Implementation animation, transitions, vocabulary, sound. |
| `design/craft` | Right. Taste/polish/craft heuristics. Optional `css-interaction-tips` merge only. |
| `design/review` | Right. Clear review/audit/annotation workflows. |
| `design/systems` | Right. Keep opt-in only. |
| `design/workflows` | Right. `asbuilt` is now self-contained. |
| `design/kits` | Right. `fluid-functionalism` is a component-kit workflow, not a generic tool. |
| `design/tools` | Right. Paper/Rams are visible; shared dev-overlay rules are deduped. |
| `engineering` | Right. Mostly process-discipline skills. `caveman` vs `grug` is clarified. |
| `marketing/skills` | Right. Preserve upstream submodule shape. |
| `local` | Right. Use for private/client/license-restricted skills. |

## Discovery Gap To Solve Next

The remaining user pain is not folder placement. It is recall:

> "I know generally what I want, but I do not remember what the skill is called."

The next layer should be a generated router/index:

- `catalog/skills.generated.json`
- `catalog/aliases.json`
- `scripts/build-skill-index.js`
- a Claude slash command such as `/skills` or `/cortex`

Examples the router should understand:

| User Phrase | Route |
| --- | --- |
| security audit | `improve security`, optionally `blindspot` first for auth/data/deploy/infra |
| design critique | `preflight`, `wip-senior-audit`, or `agentation-self-driving` depending on static/live/annotation |
| polish this UI | `emil-design-eng`, `interface-craft`, `css-interaction-tips` |
| dead code cleanup | `deadcode` |
| what tool makes wireframes | `wiretext` |
| what Figma thing do I use | `figma-mcp` |
| make a PRD | `to-prd` |
| break this into tickets | `to-issues` |

## Recommended Base-Fix Order

1. Re-run `scripts/validate-skills.sh`.
2. Run Claude/Codex sync scripts.
3. Build the generated router/index layer.
