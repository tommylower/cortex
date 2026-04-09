# cortex

shared library of skills, workflows, and tools for AI-assisted development. agent-agnostic. works with claude code, cursor, codex, and any agent that reads markdown.

## structure

```
cortex/
├── design-skills/     UI, motion, accessibility, visual patterns
├── design-systems/    reference design systems (use when explicitly requested)
├── dev-tools/         overlays, annotation tools, code quality, local dev helpers
├── agent-workflows/   workflows, conventions, setup guides
└── marketing/         marketing skills and tooling
```

## skills

### design-skills
| skill | what it does |
|---|---|
| **preflight** | final design audit before shipping. accessibility, visual consistency, AI pattern detection |
| **ui-principles** | core UI principles. spacing scale, hierarchy, defaults |
| **framer-motion** | animation patterns for React/Next.js |
| **responsive-craft** | responsive layout implementation and multi-breakpoint preview |
| **reference-patterns** | design patterns from reference sites (Linear, Vercel, etc.) |
| **css-interaction-tips** | hover, transitions, button states, tooltips, tap targets |
| **gradients** | gradient construction, color spaces, layering, recipes |
| **figma-mcp** | official Figma MCP server for reading tokens, components, layout |
| **wiretext** | ASCII wireframe MCP tool for terminal-based wireframing |

### dev-tools
| skill | what it does |
|---|---|
| **deadcode** | find and remove unused files, exports, dependencies, types |
| **agentation** | visual feedback toolbar (opt-in, dev only) |
| **interface-kit** | visual design overlay (opt-in, dev only) |
| **dialkit** | floating control panel for tuning animations (opt-in, dev only) |

### agent-workflows
| skill | what it does |
|---|---|
| **dev-setup** | development setup, deployment flow, env var management |
| **claude-workflow** | plan mode, subagents, verification, context management |
| **agent-swarm** | multi-agent parallel workflow with review loops |
| **agent-interviewer** | interview-driven personalization file generator |

### marketing
30+ marketing skills covering SEO, content strategy, copywriting, CRO, email, ads, and more. see `marketing/AGENTS.md` for the full index.

## how to use

cortex is mounted into projects as a symlink at the project root. agents can read anything in `cortex/` directly.

```bash
ln -s ~/Developer/code/cortex <project>/cortex
echo cortex >> <project>/.gitignore
```

### claude code setup

sync cortex skills so they're available as slash commands:

```bash
~/Developer/code/cortex/scripts/sync-claude-skills.sh
```

add a SessionStart hook to `~/.claude/settings.json` so it syncs automatically:

```json
"hooks": {
  "SessionStart": [{
    "hooks": [{
      "type": "command",
      "command": "$HOME/Developer/code/cortex/scripts/sync-claude-skills.sh >/dev/null 2>&1 || true"
    }]
  }]
}
```

## skill format

follows the [Agent Skills specification](https://agentskills.io/specification.md). every skill lives in its own directory with a `SKILL.md` containing YAML frontmatter (`name`, `description`) and instructions under 500 lines.

## credits

updated frequently. local-first. credited where the work is not original.
