# cortex

Shared library of skills, workflows, tools, and notes for AI-assisted development. Cortex is agent-agnostic: agents can read it directly from a project, or consume it through thin sync adapters such as Claude and Codex skill directories.

## structure

```text
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design/            everything visual, indexed by shelf
│   ├── foundations/   principles, patterns, responsive, loading states, preflight audit
│   ├── color/         oklch, gradients
│   ├── motion/        animation, transitions, interaction feel, sound
│   ├── systems/       opt-in reference design systems, never auto-applied
│   └── tools/         installable tools and integrations
├── engineering/       process-discipline skills (mostly vendored from mattpocock/skills)
├── marketing/         marketing skills and tooling (git submodule)
└── scripts/           agent adapters, validation, journal sweep
```

Every category has an `AGENTS.md` index. Start there. The library rule: you should find a skill by walking the folders, not by searching. New public skills should also be added to the README menu below when introduced.

## key skills

### design

- `preflight` — final design audit before shipping
- `ui-principles` — spacing, typography, layout fundamentals
- `responsive-craft` — responsive implementation and multi-breakpoint preview
- `emil-design-eng` — design-engineering heuristics for motion and interaction feel
- `interface-craft` — storyboard animation, dial-driven tuning, and design critique
- `figma-mcp` — Figma MCP setup and workflows
- `wiretext` — terminal wireframing
- `shader-lab` — Basement Studio's shader runtime for GPU compositions
- `muller-brockmann-grid-systems` — opt-in Swiss editorial grid system with inspectable overlays

### agent workflows

- `waveframe` — scaffold client projects, synthesize or extract design systems, audit drift
- `claude-workflow` — Claude planning, verification, and hooks
- `agent-swarm` — multi-agent workflow patterns
- `agent-interviewer` — generate a personalized agent behavior file
- `improve` — read-only senior-advisor codebase audit that writes handoff plans (by shadcn)

### engineering

- `grill-me` / `grill-with-docs` — stress-test a plan before building
- `tdd`, `diagnose`, `prototype` — building discipline
- `to-prd`, `to-issues`, `triage` — planning and tickets
- `handoff` — close out a token-heavy session with pre-clear checks and a short restart prompt
- `deadcode` — find and remove unused code and dependencies

### marketing

The `marketing/` submodule brings in the full Marketing Skills library by Corey Haines (MIT). See `marketing/AGENTS.md`.

It's a submodule because upstream updates constantly. The pin moves two ways: a weekly GitHub Action bumps it automatically, or run `scripts/update-marketing.sh` to bump on demand. Clone with `git clone --recurse-submodules` to get it on a fresh machine.

By contrast, `engineering/` is a vendored MIT snapshot of [mattpocock/skills](https://github.com/mattpocock/skills) — it only changes when deliberately re-vendored.

## mount cortex into a project

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```

Once mounted, any agent that can read markdown from the workspace can use `cortex/` directly.

## agent adapters

One-command setup on a new machine:

```bash
~/Developer/code/cortex/scripts/setup-local-agents.sh
```

Or run the per-agent syncs directly:

```bash
~/Developer/code/cortex/scripts/sync-claude-skills.sh     # symlinks skills into ~/.claude/skills/
~/Developer/code/cortex/scripts/sync-claude-commands.sh   # installs cortex slash commands
~/Developer/code/cortex/scripts/sync-codex-skills.sh      # symlinks skills into ~/.codex/skills/
```

Recommended: a `SessionStart` hook in `~/.claude/settings.json` that runs the Claude syncs, so new skills appear automatically every session. See `AGENTS.md` for the snippet and adapter details. Skills stay agent-agnostic markdown; agent-specific automation lives in adapter scripts, never inside a skill folder.

## journal

[nightcap](https://github.com/tommylower/nightcap) (`agent-workflows/nightcap/`) reads the day's Claude Code and Codex transcripts every night and writes one narrative entry per substantial session, first person, in your own voice, like a handwritten journal. Each entry records the date, agent, project, a resume command linking back to the chat, and a 1-3 paragraph summary of the work and thinking.

Personalization (name, voice, journal location) lives in `~/.config/nightcap/config.json`. Entries are local-only and never committed. See the skill's `SKILL.md` for setup, scheduling, and on-demand sweeps.

Standalone tools like nightcap are developed here and mirrored to their own repos with `scripts/publish.sh <folder> <owner/repo>` (git subtree split, force-pushed, exact mirror).

## skill format

Cortex skills follow the [Agent Skills specification](https://agentskills.io/specification.md): one directory per skill, a `SKILL.md` with `name` and `description` frontmatter, supporting detail in `references/`. Skills that are not original carry an `author:` line crediting the source. `scripts/validate-skills.sh` enforces the basics.

## credits

Cortex mixes original skills with adapted and vendored work. Credit is preserved wherever the work is not original, in each skill's frontmatter and body. Currently that includes:

- [Matt Pocock](https://github.com/mattpocock/skills) — the engineering process set
- [Corey Haines](https://github.com/coreyhaines31/marketingskills) — the marketing submodule
- [Emil Kowalski](https://github.com/emilkowalski/skill) — design-engineering philosophy
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

## where this is going

- keep the library shallow and obvious: new shelves only when a real cluster forms, merge skills that start saying the same thing
- grow the original skill set; vendor less, write more
- keep everything readable by any agent, with adapters as the only agent-specific layer
