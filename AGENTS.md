# cortex

shared library of skills, workflows, tools, and references for AI-assisted development. designed to be agent-agnostic. consumed by claude code, codex, cursor, and any agent that can read markdown.

## how to use this repo

cortex is mounted into projects as a symlink at the project root: `<project>/cortex -> ~/Developer/code/cortex`. agents working inside a project can read anything in `cortex/` directly. cortex is not a dependency, package, or runtime. it's content.

if you are an agent and the user asks for design help, marketing help, workflow guidance, or tooling, look here first before generating from scratch.

## layout

```
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design/            everything visual, indexed by shelf
│   ├── foundations/   principles, patterns, responsive, loading states, preflight audit
│   ├── color/         oklch, gradients
│   ├── motion/        animation, transitions, interaction feel, sound
│   ├── systems/       opt-in reference design systems, never auto-applied
│   └── tools/         installable tools and integrations (figma, wireframes, shaders, overlays)
├── engineering/       process-discipline skills (mostly vendored from mattpocock/skills)
├── local/             gitignored. client work and material not licensed for redistribution
├── marketing/         marketing skills and tooling (git submodule of coreyhaines31/marketingskills)
└── scripts/           agent adapters and validation
```

each category folder contains an `AGENTS.md` indexing its skills. start there when scoping a category.

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
- `author`: required for any skill that is not original to this repo. credit the source by name with a link. original skills omit it.

### body

- `SKILL.md` should usually stay under 500 lines. if an execution-critical skill needs more room, keep the operational core in `SKILL.md` and move supporting detail into `references/`.
- second person, direct, instructional.
- short paragraphs, bullet lists, code blocks for templates.
- no agent-specific syntax in `SKILL.md`. nothing that only one agent can parse. (skills *about* a specific agent, like claude-workflow, are fine. the format stays plain markdown.)

## attribution

credit where credit's due is a hard rule here:

- vendored or adapted skills carry an `author:` line in frontmatter and keep source links in the body.
- the `marketing/` submodule points straight at its upstream, [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills).
- third-party material that is not clearly licensed for redistribution does not ship publicly. it lives in `local/`, which is gitignored.
- client work never ships publicly. it lives in `local/`.

## how skills reach agents

cortex is the source of truth. agents see cortex skills via thin adapters in `scripts/`. nothing inside a skill folder is allowed to know about a specific agent.

**first-time setup on a new machine:**

1. clone cortex somewhere (e.g. `~/Developer/code/cortex`).
2. run the local setup script once:
   ```bash
   ~/Developer/code/cortex/scripts/setup-local-agents.sh
   ```
3. or run the per-agent syncs directly:
   ```bash
   ~/Developer/code/cortex/scripts/sync-claude-skills.sh
   ~/Developer/code/cortex/scripts/sync-claude-commands.sh
   ~/Developer/code/cortex/scripts/sync-codex-skills.sh
   ```
4. (optional) for manual control, add a `SessionStart` hook to `~/.claude/settings.json` so the Claude sync runs every session:
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

**claude code adapter:**

- `scripts/sync-claude-skills.sh` walks every category folder, finds every `<category>/<skill>/SKILL.md`, and symlinks `~/.claude/skills/<skill-name>` back to the cortex folder. idempotent, removes stale links, safe to re-run.
- `scripts/sync-claude-commands.sh` installs cortex-owned slash commands (`/handoff`, `/closeout`) into `~/.claude/commands/`, and removes the retired waveframe/design-* adapters on each run.

**codex adapter:**

- `scripts/sync-codex-skills.sh` populates `~/.codex/skills/` with symlinks to each cortex skill directory. rerun only when adding, deleting, or renaming skills.

**other agents:**

- if an agent can read markdown from the project workspace, the `cortex/` symlink is already enough.
- if an agent needs a dedicated skills directory, add a new adapter script alongside the existing ones rather than embedding agent-specific files in a skill folder.
- `scripts/validate-skills.sh` checks every skill has frontmatter, a `name` matching its directory, a non-empty description, and no duplicate names across cortex. run it before committing skill changes.

**rules for adding a new skill:**

1. create `<category>/<skill-name>/SKILL.md` with valid frontmatter (`name` must equal the directory name).
2. if the skill is not original, add the `author:` line and source links.
3. if it names a client or is not licensed for redistribution, it goes in `local/`.
4. add the skill to its category `AGENTS.md` index and the public menu in the root `README.md`.
5. run `scripts/validate-skills.sh` and fix anything it complains about.
6. run the relevant sync script to mirror it into agent skill directories immediately.

**rules for agents (you, reading this):**

- never put agent-specific files inside a skill folder (no `.claude/`, no claude-only commands in `SKILL.md`). skills are agent-agnostic markdown.
- never bypass the sync scripts by hand-symlinking skills into `~/.claude/skills/` or `~/.codex/skills/`. the adapter scripts own those directories.
- never add a new category folder without updating the `CATEGORIES` list in every sync and validation script.
- never rename a skill directory without also updating its `name:` frontmatter.
- never move anything out of `local/` into a public category without explicit user approval.

## adding cortex to a new project

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```
