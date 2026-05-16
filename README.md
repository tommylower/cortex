# cortex

cortex is a public library of skills, workflows, design systems, and local tools for AI-assisted work.

It is not a framework or a package. It is a markdown workspace agents can read directly. The point is to make useful working habits portable: design freely, keep decisions traceable, turn loose references into reusable structure, and leave behind enough detail for future work, case studies, client handoff, or implementation.

## structure

```text
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design-skills/     UI, motion, accessibility, visual implementation patterns
├── design-systems/    opt-in reference design systems and extracted design packages
├── dev-tools/         overlays, annotation tools, tuning tools, and local dev helpers
├── marketing/         marketing skills and tooling
└── scripts/           validation, sync adapters, and local agent setup scripts
```

Each top-level folder has an `AGENTS.md` index. Start there when you want to know what is available.

## waveframe

`waveframe` is the workflow layer for turning messy design work into reusable structure.

It supports the whole arc: early references, rough direction, half-built sites, finished code, decks, design-system markdown, and implementation docs. The final output is usually a design-system package that can be read by people and agents:

- `SKILL.md` or `design-system/README.md` as the operating brief
- reference files for tokens, components, layout, motion, imagery, voice, and platform mapping
- implementation details such as CSS variables, Tailwind config guidance, runtime dependencies, and handoff notes
- optional deck or board structures for review, client delivery, or case-study writing

## key skills

### design-skills

| skill | what it does |
| --- | --- |
| `design-tools` | inventory of available design tools and when to use each one |
| `preflight` | final design audit before shipping |
| `ui-principles` | core UI principles: spacing, hierarchy, defaults |
| `responsive-craft` | responsive implementation and multi-breakpoint review |
| `emil-design-eng` | motion and interaction heuristics for polished product UI |
| `framer-motion` | animation patterns for React and Next.js |
| `view-transitions` | native shared-element and route transitions |
| `loading-states` | skeletons, progress states, and crafted loading moments |
| `interface-sound` | tasteful UI sound feedback |
| `funky-shadow` | dithered Oklab gradient shadows |
| `shader-lab` | WebGPU shader compositions |
| `pretext` | deterministic text measurement guidance lives under dev tools |
| `figma-mcp` | Figma MCP setup and workflows |
| `wiretext` | terminal wireframing |

### design-systems

| system | use it for |
| --- | --- |
| `nothing-design` | monochrome, industrial, typography-led interfaces |
| `swiss-design` | grid-first editorial interfaces with restrained color |
| `report-design` | report marketing pages with framed shell, paper texture, and signal red |
| `infrastructure-design` | dark institutional technical marketing with hairlines, square geometry, and sparse signal color |

See `design-systems/README.md` for how these relate to waveframe and how to read each package.

### dev-tools

| skill | what it does |
| --- | --- |
| `deadcode` | find unused files, exports, dependencies, and types |
| `agentation` | visual annotation toolbar for browser-driven iteration |
| `agentation-self-driving` | autonomous design critique mode using Agentation |
| `interface-kit` | visual design overlay |
| `dialkit` | live tuning controls for animation and design values |
| `pretext` | deterministic text measurement for layout stability |

### agent-workflows

| skill | what it does |
| --- | --- |
| `waveframe` | project scaffolds, design-system synthesis, extraction, handoff, and drift audits |
| `agent-swarm` | multi-agent parallel workflow patterns |
| `claude-workflow` | Claude Code planning, verification, hooks, and context management |
| `codex-review` | cross-model review and delegation setup |
| `agent-interviewer` | interview-driven personalized agent behavior file |
| `session-journal` | optional local markdown memory for session notes and preferences |
| `dev-setup` | development setup and environment handling |
| `vercel-deploy` | Vercel deploy and preview workflow |

### marketing

The `marketing/` submodule brings in the Marketing Skills library. See `marketing/AGENTS.md` after initializing submodules.

## local setup

Mount cortex into a project when you want agents to read it directly:

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```

The local agent tooling in `scripts/` does three things:

- syncs cortex skills into `~/.claude/skills/` and `~/.codex/skills/`
- installs Claude slash-command adapters such as `/waveframe`
- optionally wires session-journal hooks so local session notes stay current

Run the combined setup:

```bash
~/Developer/code/cortex/scripts/setup-local-agents.sh
```

Or run adapters directly:

```bash
~/Developer/code/cortex/scripts/sync-claude-skills.sh
~/Developer/code/cortex/scripts/sync-claude-commands.sh
~/Developer/code/cortex/scripts/sync-codex-skills.sh
```

## skill format

Cortex skills follow the [Agent Skills specification](https://agentskills.io/specification.md). Every skill lives in its own directory with a `SKILL.md` containing YAML frontmatter (`name`, `description`) and direct instructions.

## credits

Updated frequently. Local-first. Credit is preserved where the work is not original.
