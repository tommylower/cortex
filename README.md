# skills

Markdown files that AI agents load as context. Design patterns, accessibility standards, animation references, agent workflows. I use these across all my projects.

These are plain markdown — they work with any AI coding tool (Claude Code, Cursor, Windsurf, GitHub Copilot, Codex, or anything else that reads project files).

Some I wrote, some I collected. Credits noted where applicable. Updated regularly.

## structure

```
skills/
  design/       # UI, motion, accessibility, design tooling
  agents/       # agent setup patterns, autonomous workflows
  marketing/    # submodule → coreyhaines31/marketingskills
```

## design/

| Skill | What it is | Why I use it |
|-------|-----------|-------------|
| **ui-principles** | Spacing scale, type hierarchy, layout rules, responsive breakpoints, component standards | Stops agents from inventing arbitrary values. Every other design skill builds on this, so it's worth reading first. |
| **rams** | WCAG 2.1 accessibility audit + visual consistency review. Returns a scored report with line numbers and fixes. | Catches accessibility and visual issues while building instead of in review. Run it on any component file with `/rams`. |
| **framer-motion** | React animation patterns — scroll reveals, staggered lists, hover interactions, accordions. Includes timing guidelines and spring values. | Prevents the "I'll just guess spring stiffness" problem. Ready-to-use patterns that actually feel right. |
| **css-interaction-tips** | Micro-interaction CSS — button press feel, smooth entrances, touch targets, hover-only on desktop, popover origins. | Small things that make UI feel responsive. Useful even if you're not doing heavy animation work. |
| **dialkit** | Dev-time tool for tuning animation values with sliders, toggles, and spring curve editors. Remove before shipping. | Saves the edit-save-reload loop when dialing in motion. Optional — only relevant during polish phases. |
| **wiretext** | ASCII wireframing via MCP server. Prototypes page structure and content hierarchy. | Quick way to align on layout before writing any code. Useful for early-stage planning, not needed for every project. |
| **figma-mcp** | Figma → Claude Code bridge. Reads frame layouts, extracts design tokens, maps Figma components to code. | If you design in Figma, this closes the gap between design files and implementation. Skip if you don't use Figma. |
| **reference-patterns** | Design patterns from production sites (Linear, Vercel, Lovable). Layouts, dark theme techniques, micro-interactions. | Good reference when building marketing pages or product UIs. Gives agents real-world examples instead of generic patterns. |

## agents/

| Skill | What it is | Why I use it |
|-------|-----------|-------------|
| **agentation** | Setup and config for the Agentation annotation toolbar in Next.js. MCP server integration for agent-driven design feedback. | Lets agents leave design annotations directly on your running app. Requires the Agentation package. |
| **agentation-self-driving** | Autonomous design critique mode. Agent opens a browser, scans pages, and creates annotations. Includes a two-session workflow where one agent critiques while another fixes in parallel. | Experimental. Useful for automated design QA across full pages, but it's a more involved setup. |

## marketing/

Submodule: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills). 33 skills covering copywriting, SEO, CRO, paid ads, email sequences, and more. Includes 51 CLI tools and integration guides for 30+ platforms. By Corey Haines.

Worth pulling in if you're building anything with a marketing site, landing pages, or growth workflows. Not needed for pure product/app work.

## usage

You don't need all of these. Pick what's relevant to your stack and workflow.

Point your AI tool's config at the skills directory. The file varies by tool, but the instruction is the same:

```md
# in AGENTS.md, .claude/CLAUDE.md, .cursor/rules, .windsurfrules, etc.
Reference ~/Desktop/code/tools/skills/ for shared knowledge.
```

Or use [wip-create-designbase](https://github.com/tommylower/foundations) to scaffold a project pre-wired with these.

## related

- [foundations](https://github.com/tommylower/foundations) — project scaffold + `wip-create-designbase` CLI
- [marketingskills](https://github.com/coreyhaines31/marketingskills) — marketing skills (submodule)
