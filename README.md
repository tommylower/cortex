# cortex

Public skill library for AI-assisted development. Cortex is the portable, agent-agnostic version of how I work: design craft, engineering discipline, agent workflows, marketing skills, and the small adapters that make those skills available to tools like Claude Code and Codex.

Skills are plain markdown. Cortex is not a package, dependency, or runtime. Agents can read it directly from a project, or consume it through thin sync adapters.

## structure

```text
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design/            everything visual, indexed by shelf
│   ├── foundations/   principles, patterns, responsive, loading states
│   ├── color/         oklch, gradients
│   ├── motion/        animation, transitions, interaction feel, sound
│   ├── craft/         interaction craft, taste, animation critique, UI polish
│   ├── review/        static and live UI/UX review workflows
│   ├── systems/       opt-in reference design systems, never auto-applied
│   ├── workflows/     design-system extraction and design operations
│   ├── kits/          component kits and registry-backed UI systems
│   └── tools/         installable tools and integrations
├── engineering/       process-discipline skills (mostly vendored from mattpocock/skills)
├── marketing/         marketing skills and tooling (git submodule)
├── catalog/           shelf registry used by docs, validation, and sync scripts
└── scripts/           agent adapters, validation, publishing, journal sweep
```

Every category has an `AGENTS.md` index. Start there. The library rule: you should find a skill by walking the folders, not by searching. Shelf paths live in `catalog/shelves.json`; update that before changing sync or validation behavior.

## key skills

### design

- `preflight` — final design audit before shipping
- `ui-principles` — spacing, typography, layout fundamentals
- `responsive-craft` — responsive implementation and multi-breakpoint preview
- `emil-design-eng` — design-engineering heuristics for motion and interaction feel
- `animation-vocabulary` — reverse-lookup glossary for naming web motion effects
- `interface-craft` — storyboard animation, dial-driven tuning, and design critique
- `paper` — Paper / paper.design canvas workflow when available
- `figma-mcp` — Figma MCP setup and workflows
- `wiretext` — terminal wireframing
- `rams` — external Rams design-review command when explicitly requested
- `shader-lab` — Basement Studio's shader runtime for GPU compositions
- `asbuilt` — derive and conform a design-system package from a finished codebase
- `muller-brockmann-grid-systems` — opt-in Swiss editorial grid system with inspectable overlays

### agent workflows

- `claude-workflow` — Claude planning, verification, and hooks
- `agent-swarm` — multi-agent workflow patterns
- `agent-interviewer` — generate a personalized agent behavior file
- `project-defaults` — default scaffold, stack, conventions, env setup, and deployment flow
- `fable-prompting` — how to prompt Fable 5 for next-gen results, with three drop-in files (house-rules block, `/loop` template, verifier sub-agent prompt)
- `improve` — read-only senior-advisor codebase audit that writes handoff plans (by shadcn)

### engineering

- `grill-me` / `grill-with-docs` — stress-test a plan before building
- `tdd`, `diagnose`, `prototype` — building discipline
- `to-prd`, `to-issues`, `triage` — planning and tickets
- `handoff` — close out a token-heavy session with pre-clear checks and a short restart prompt
- `write-a-skill`, `writing-great-skills` — author and refine skills with proper structure, attribution, and predictable behavior
- `deadcode` — find and remove unused code and dependencies

### marketing

The `marketing/` submodule brings in the full Marketing Skills library by Corey Haines (MIT). See `marketing/AGENTS.md`.

It's a submodule because upstream updates constantly. The pin moves two ways: a weekly GitHub Action bumps it automatically, or run `scripts/update-marketing.sh` to bump on demand. Clone with `git clone --recurse-submodules` to get it on a fresh machine.

By contrast, `engineering/` is a vendored MIT snapshot of [mattpocock/skills](https://github.com/mattpocock/skills) — it only changes when deliberately re-vendored.

## clone

```bash
git clone --recurse-submodules https://github.com/tommylower/cortex.git
cd cortex
bash scripts/validate-skills.sh
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

## mount cortex into a project

```bash
export CORTEX_HOME=/path/to/cortex
ln -s "$CORTEX_HOME" <project>/cortex
echo cortex >> <project>/.gitignore
```

Once mounted, any agent that can read markdown from the workspace can use `cortex/` directly.

## agent adapters

One-command setup on a new machine:

```bash
$CORTEX_HOME/scripts/setup-local-agents.sh
```

Or run the per-agent syncs directly:

```bash
$CORTEX_HOME/scripts/sync-claude-skills.sh     # symlinks skills into ~/.claude/skills/
$CORTEX_HOME/scripts/sync-claude-commands.sh   # installs cortex slash commands
$CORTEX_HOME/scripts/sync-codex-skills.sh      # symlinks skills into ~/.codex/skills/
```

Recommended: a `SessionStart` hook in `~/.claude/settings.json` that runs the Claude syncs, so new skills appear automatically every session. See `AGENTS.md` for the snippet and adapter details. Skills stay agent-agnostic markdown; agent-specific automation lives in adapter scripts, never inside a skill folder.

## journal

[nightcap](https://github.com/tommylower/nightcap) (`agent-workflows/nightcap/`) reads the day's Claude Code and Codex transcripts every night and writes one narrative entry per substantial session, first person, in your own voice, like a handwritten journal. Each entry records the date, agent, project, a resume command linking back to the chat, and a 1-3 paragraph summary of the work and thinking.

Personalization (name, voice, journal location) lives in `~/.config/nightcap/config.json`. Entries are local-only and never committed. See the skill's `SKILL.md` for setup, scheduling, and on-demand sweeps.

Standalone tools like nightcap are developed here and mirrored to their own repos with `scripts/publish.sh <folder> <owner/repo>` using a git subtree split. A standalone publish should contain only the selected folder's public files and should not depend on local Cortex paths.

## skill format

Cortex skills follow the [Agent Skills specification](https://agentskills.io/specification.md): one directory per skill, a `SKILL.md` with `name` and `description` frontmatter, supporting detail in `references/`. Skills that are not original carry an `author:` line crediting the source. `scripts/validate-skills.sh` enforces the basics. `catalog/shelves.json` is the single source of truth for which shelves validate and sync.

## public safety

- `local/`, `.agents/`, `.claude/`, `.DS_Store`, `skills-lock.json`, and generated journal notes are ignored.
- Public shelves must validate with `scripts/validate-skills.sh`.
- Private client material and unlicensed third-party material stay out of public shelves.
- Skills must not require machine-specific absolute paths. Put reusable references inside the skill folder.

## credits

Cortex mixes original skills with adapted and vendored work. Credit is preserved wherever the work is not original, in each skill's frontmatter and body. Currently that includes:

- [Matt Pocock](https://github.com/mattpocock/skills) — the engineering process set
- [Corey Haines](https://github.com/coreyhaines31/marketingskills) — the marketing submodule
- [Emil Kowalski](https://github.com/emilkowalski/skills) — design-engineering philosophy and animation vocabulary
- [Josh Puckett](https://github.com/joshpuckett) — Interface Craft, DialKit, Interface Kit
- [shadcn](https://github.com/shadcn) — improve
- [Jakub Krehel](https://github.com/jakubkrehel/oklch-skill) — OKLCH, gradients
- [Dominik Martin](https://github.com/dominikmartn/nothing-design-skill) — nothing-design
- [Zeke](https://github.com/zeke/swiss-design-skill) — swiss-design
- [Micka](https://github.com/mickadesign/fluid-functionalism) — fluid-functionalism
- [Vercel Labs](https://github.com/vercel-labs) — view transitions, deploy patterns
- [Basement Studio](https://github.com/basementstudio/shader-lab) — shader-lab
- [Cheng Lou](https://github.com/chenglou) — pretext
- Dennis Jin & Benji Taylor — agentation
- [raphaelsalaja](https://audio.raphaelsalaja.com/) — interface-sound
- [zzzzshawn](https://github.com/zzzzshawn) — loading-states
- [iamnoman](https://www.npmjs.com/package/funky-shadow) — funky-shadow
- OpenAI — codex plugin setup

If something here is yours and miscredited or unwelcome, open an issue.

## license

Cortex is MIT licensed. Third-party and adapted skills keep their source credit in frontmatter and body text; the marketing submodule keeps its upstream license in `marketing/`.

## where this is going

- keep the library shallow and obvious: new shelves only when a real cluster forms, merge skills that start saying the same thing
- grow the original skill set; vendor less, write more
- keep everything readable by any agent, with adapters as the only agent-specific layer
