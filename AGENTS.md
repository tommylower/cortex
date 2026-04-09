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

- under 500 lines. move long-form material into `references/`.
- second person, direct, instructional.
- short paragraphs, bullet lists, code blocks for templates.
- no agent-specific syntax in `SKILL.md`. nothing that only one agent can parse.

### canonical reference

`marketing/CLAUDE.md` contains the full spec, write style, and PR checklist. treat it as the source of truth for skill authoring across cortex.

## how skills reach claude code (and other agents)

cortex is the source of truth. agents see cortex skills via thin adapters that live in `scripts/`. nothing inside a skill folder is allowed to know about a specific agent.

**first-time setup on a new machine:**

1. clone cortex somewhere (e.g. `~/Developer/code/cortex`).
2. run the sync script once to populate `~/.claude/skills/`:
   ```bash
   ~/Developer/code/cortex/scripts/sync-claude-skills.sh
   ```
3. (optional but recommended) add a `SessionStart` hook to `~/.claude/settings.json` so the sync runs automatically every claude session. merge this into the existing `settings.json` (replace the path if cortex lives elsewhere):
   ```json
   "hooks": {
     "SessionStart": [
       {
         "hooks": [
           {
             "type": "command",
             "command": "$HOME/Desktop/code/cortex/scripts/sync-claude-skills.sh >/dev/null 2>&1 || true"
           }
         ]
       }
     ]
   }
   ```
   without the hook, you'll need to re-run the sync script manually after adding new skills.

**claude code adapter:**

- `scripts/sync-claude-skills.sh` walks every category folder, finds every `<category>/<skill>/SKILL.md`, and creates a symlink `~/.claude/skills/<skill-name>` pointing back at the cortex folder. idempotent. removes stale symlinks. safe to re-run.
- a `SessionStart` hook in `~/.claude/settings.json` runs the sync script every time a claude session starts, so new skills appear automatically. you should never need to run it manually.
- `scripts/validate-skills.sh` checks every skill has frontmatter, a `name` matching its directory, a non-empty description, and no duplicate names across cortex. run it before committing skill changes. CI should run it too.

**rules for adding a new skill:**

1. create `<category>/<skill-name>/SKILL.md` with valid frontmatter (`name` must equal the directory name).
2. run `scripts/validate-skills.sh` and fix anything it complains about.
3. that's it. the next claude session will pick it up.

**rules for agents (you, reading this):**

- never put agent-specific files inside a skill folder (no `.claude/`, no claude-only commands in `SKILL.md`). skills are agent-agnostic markdown.
- never bypass the sync script by hand-symlinking individual skills into `~/.claude/skills/`. let the script own that directory.
- never add a new category folder without updating the `CATEGORIES` list in both scripts.
- never rename a skill directory without also updating its `name:` frontmatter, or validation will fail.
- if you need to support a new agent (cursor, codex, etc.), add a new sync script alongside `sync-claude-skills.sh`. do not modify the existing one.

## adding cortex to a new project

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```
