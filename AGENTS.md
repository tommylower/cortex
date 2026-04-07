# cortex

shared library of skills, workflows, tools, and references for AI-assisted development. designed to be agent-agnostic. consumed by claude code, codex, cursor, and any agent that can read markdown.

## how to use this repo

cortex is mounted into projects as a symlink at the project root: `<project>/cortex -> ~/Desktop/code/cortex`. agents working inside a project can read anything in `cortex/` directly. cortex is not a dependency, package, or runtime. it's content.

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

### legacy skills

some older skills under `agent-workflows/` and `design-skills/` predate the spec and lack frontmatter. they still work. align them to the spec when they get touched.

### canonical reference

`marketing/CLAUDE.md` contains the full spec, write style, and PR checklist. treat it as the source of truth for skill authoring across cortex.

## adding cortex to a new project

```bash
ln -s ~/Desktop/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```
