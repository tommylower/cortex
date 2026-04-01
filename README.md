# skills

Markdown files that AI agents (Claude Code, Cursor, etc.) load as context. Design patterns, accessibility standards, animation references, agent workflows. I use these across all my projects.

Some I wrote, some I collected. Credits noted where applicable. Updated regularly.

## structure

```
skills/
  design/       # UI, motion, accessibility, design tooling
  agents/       # agent setup patterns, autonomous workflows
  marketing/    # submodule → coreyhaines31/marketingskills
```

## design/

| Skill | Description |
|-------|------------|
| **ui-principles** | Spacing scale, type hierarchy, layout rules, responsive breakpoints, component standards |
| **rams** | WCAG 2.1 accessibility audit + visual consistency review. Scored report with line numbers and fixes |
| **framer-motion** | React animation patterns — scroll reveals, staggered lists, hover, accordions. Timing and spring values |
| **css-interaction-tips** | Micro-interaction CSS — button press, smooth entrances, touch targets, hover-only on desktop |
| **dialkit** | Dev-time animation tuning. Sliders, toggles, spring editors. Remove before shipping |
| **wiretext** | ASCII wireframing via MCP. Page structure and content hierarchy prototyping |
| **figma-mcp** | Figma → Claude Code integration. Reads frames, extracts tokens, maps to code |
| **reference-patterns** | Production site patterns (Linear, Vercel, Lovable). Layouts, dark themes, animations |

## agents/

| Skill | Description |
|-------|------------|
| **agentation** | Agentation toolbar setup for Next.js. MCP server config for agent-driven design annotations |
| **agentation-self-driving** | Autonomous design critique. Agent opens a browser, scans pages, creates annotations. Two-session workflow for parallel critique + fix |

## marketing/

Submodule: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills). 33 skills (copywriting, SEO, CRO, paid ads, email), 51 CLI tools, 30+ platform integrations. By Corey Haines.

## usage

Reference in your project config:

```md
# .claude/CLAUDE.md or .cursor/rules
Reference ~/Desktop/code/skills/ for shared knowledge.
```

Or use [wip-create-designbase](https://github.com/tommylower/foundations) to scaffold a project pre-wired with these.

## related

- [foundations](https://github.com/tommylower/foundations) — project scaffold + `wip-create-designbase` CLI
- [marketingskills](https://github.com/coreyhaines31/marketingskills) — marketing skills (submodule)
