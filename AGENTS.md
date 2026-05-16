# cortex

shared library of skills, workflows, tools, and references for AI-assisted development. designed to be agent-agnostic. consumed by claude code, codex, cursor, and any agent that can read markdown.

## how to use this repo

cortex is mounted into projects as a symlink at the project root: `<project>/cortex -> ~/Developer/code/cortex`. agents working inside a project can read anything in `cortex/` directly. cortex is not a dependency, package, or runtime. it's content.

if you are an agent and the user asks for design help, marketing help, workflow guidance, or tooling, look here first before generating from scratch.

## layout

```
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design-skills/     UI, motion, accessibility, visual implementation patterns
├── design-systems/    reference design systems, used only when explicitly requested
├── dev-tools/         overlays, annotation tools, tuning tools, local dev helpers
└── marketing/         marketing skills and tooling (forked from coreyhaines31/marketingskills)
```

each top-level folder contains an `AGENTS.md` indexing its skills. start there when scoping a category.

## skill format

skills follow the [Agent Skills specification](https://agentskills.io/specification.md). every skill lives in its own directory containing a `SKILL.md`:

```
<category>/<skill-name>/
├── SKILL.md       required, main instructions
├── examples/      optional
├── presets/       optional
├── references/    optional, loaded on demand
├── scripts/       optional, executable code
└── assets/        optional, templates and data
```

### required frontmatter

```yaml
---
name: skill-name
description: what the skill does and when to use it. include trigger phrases.
---
```

constraints:
- `name`: 1 to 64 chars, lowercase letters, numbers, hyphens. must match the directory name. no leading/trailing hyphen, no `--`.
- `description`: 1 to 1024 chars. cover what it does, when to use it, and related skills.

### body

- `SKILL.md` should usually stay under 500 lines. if a slash-command or other execution-critical skill needs more room, keep the operational core in `SKILL.md` and move supporting detail into `references/` where possible.
- second person, direct, instructional.
- short paragraphs, bullet lists, code blocks for templates.
- no agent-specific syntax in `SKILL.md`. nothing that only one agent can parse.

### canonical reference

`marketing/CLAUDE.md` contains the baseline spec, write style, and PR checklist. use it as the starting point, but keep cortex-specific adapter and workflow rules in this repo's own docs.

## how skills reach agents

cortex is the source of truth. agents see cortex skills via thin adapters that live in `scripts/`. nothing inside a skill folder is allowed to know about a specific agent.

**first-time setup on a new machine:**

1. clone cortex somewhere (e.g. `~/Developer/code/cortex`).
2. run the local setup script once:
   ```bash
   ~/Developer/code/cortex/scripts/setup-local-agents.sh
   ```
3. if you only want the per-agent sync without changing local config, run the Claude adapter directly:
   ```bash
   ~/Developer/code/cortex/scripts/sync-claude-skills.sh
   ~/Developer/code/cortex/scripts/sync-claude-commands.sh
   ```
4. or run the Codex adapter directly:
   ```bash
   ~/Developer/code/cortex/scripts/sync-codex-skills.sh
   ```
5. (optional) if you prefer manual control, skip the setup script and wire the settings yourself. for Claude, add a `SessionStart` hook to `~/.claude/settings.json` so the Claude sync runs automatically every session. merge this into the existing `settings.json` (replace the path if cortex lives elsewhere):
   ```json
   "hooks": {
     "SessionStart": [
       {
         "hooks": [
           {
             "type": "command",
             "command": "$HOME/Developer/code/cortex/scripts/sync-claude-skills.sh >/dev/null 2>&1 || true"
           },
           {
             "type": "command",
             "command": "$HOME/Developer/code/cortex/scripts/sync-claude-commands.sh >/dev/null 2>&1 || true"
           }
         ]
       }
     ]
   }
   ```
6. (optional) point Codex `notify` at `scripts/codex-turn-ended-notify.sh` if you want automatic session-journal updates there too.

**claude code adapter:**

- `scripts/sync-claude-skills.sh` walks every category folder, finds every `<category>/<skill>/SKILL.md`, and creates a symlink `~/.claude/skills/<skill-name>` pointing back at the cortex folder. idempotent. removes stale symlinks. safe to re-run.
- `scripts/sync-claude-commands.sh` installs Cortex-owned slash-command adapters, including `/waveframe`, `/design-scaffold`, `/design-system-synthesize`, `/design-architecture`, `/design-structure`, `/design-product-ui-system`, `/design-system-update`, and `/design-drift-audit`, into `~/.claude/commands/`.
- a `SessionStart` hook in `~/.claude/settings.json` runs the sync scripts every time a claude session starts, so new skills and slash commands appear automatically. you should never need to run them manually.

**codex adapter:**

- `scripts/sync-codex-skills.sh` populates `~/.codex/skills/` with symlinks to each cortex skill directory.
- because the symlinks point straight at the cortex repo, Codex sees the latest skill contents automatically after the initial sync. rerun the script only when adding, deleting, or renaming skills.
- `scripts/codex-turn-ended-notify.sh` can piggyback on Codex's `notify` setting to auto-create and refresh session-journal notes on turn end.

**other agents:**

- if an agent can read markdown from the project workspace, the `cortex/` symlink is already enough.
- if an agent needs a dedicated skills directory, add a new adapter script alongside the existing ones rather than embedding agent-specific files in a skill folder.
- `scripts/validate-skills.sh` checks every skill has frontmatter, a `name` matching its directory, a non-empty description, and no duplicate names across cortex. run it before committing skill changes. CI should run it too.

**combined local setup:**

- `scripts/setup-local-agents.sh` configures Claude and Codex for the current machine in one pass and then runs both sync scripts.
- it is safe to re-run when moving cortex to a new path or onboarding a new machine.

**rules for adding a new skill:**

1. create `<category>/<skill-name>/SKILL.md` with valid frontmatter (`name` must equal the directory name).
2. run `scripts/validate-skills.sh` and fix anything it complains about.
3. run the relevant sync script if you want the new skill mirrored into agent-specific skill directories immediately.

**rules for agents (you, reading this):**

- never put agent-specific files inside a skill folder (no `.claude/`, no claude-only commands in `SKILL.md`). skills are agent-agnostic markdown.
- never bypass the sync script by hand-symlinking individual skills into `~/.claude/skills/` or `~/.codex/skills/`. let the adapter scripts own those directories.
- never add a new category folder without updating the `CATEGORIES` list in every adapter or validation script that defines it.
- never rename a skill directory without also updating its `name:` frontmatter, or validation will fail.
- if you need to support a new agent (cursor, codex, etc.), add a new adapter script alongside the existing ones. do not bake agent-specific behavior into a skill folder.

## adding cortex to a new project

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```
