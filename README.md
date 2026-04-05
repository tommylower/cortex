# skills

Markdown files that AI agents load as context. Design patterns, accessibility standards, animation references, dev tools, agent workflows. I use these across all my projects.

These are plain markdown — they work with any AI coding tool (Claude Code, Cursor, Windsurf, GitHub Copilot, Codex, or anything else that reads project files).

Some I wrote, some I collected. Credits noted where applicable. Updated regularly.

## structure

```
skills/
  design/          # UI, motion, accessibility, design references
  design-systems/  # reference design systems — not auto-loaded, use when explicitly asked
  dev-tools/       # visual dev overlays, annotation tools, animation tuning
  workflows/       # agent orchestration, review patterns, working strategies
  marketing/       # submodule → coreyhaines31/marketingskills
```

All top-level directories are auto-linked into projects by [wip-scaffold](https://github.com/tommylower/wip-scaffold). The CLI symlinks every folder into `.claude/skills/` so agents pick them up automatically.

## design/

| Skill | What it is | Why I use it |
|-------|-----------|-------------|
| **ui-principles** | Spacing scale, type hierarchy, layout rules, responsive breakpoints, component standards | Stops agents from inventing arbitrary values. Every other design skill builds on this, so it's worth reading first. |
| **rams** | WCAG 2.1 accessibility audit + visual consistency review. Returns a scored report with line numbers and fixes. | Catches accessibility and visual issues while building instead of in review. Run it on any component file with `/rams`. |
| **framer-motion** | React animation patterns — scroll reveals, staggered lists, hover interactions, accordions. Includes timing guidelines and spring values. | Prevents the "I'll just guess spring stiffness" problem. Ready-to-use patterns that actually feel right. |
| **css-interaction-tips** | Micro-interaction CSS — button press feel, smooth entrances, touch targets, hover-only on desktop, popover origins. | Small things that make UI feel responsive. Useful even if you're not doing heavy animation work. |
| **wiretext** | ASCII wireframing via MCP server. Prototypes page structure and content hierarchy. | Quick way to align on layout before writing any code. Useful for early-stage planning, not needed for every project. |
| **figma-mcp** | Figma → Claude Code bridge. Reads frame layouts, extracts design tokens, maps Figma components to code. | If you design in Figma, this closes the gap between design files and implementation. Skip if you don't use Figma. |
| **gradients** | CSS gradient patterns — color spaces (oklab/oklch), layering, blend modes, animation, common recipes. | Stops agents from defaulting to sRGB muddy blends. Covers the techniques that make gradients look intentional. |
| **responsive-design** | Responsive layout patterns — fluid type/spacing scales, intrinsic grids, Pretext for text measurement, touch/hover/motion gating. | Prevents the "just add a breakpoint" approach. Fluid scales + recomposition over shrinking. |
| **reference-patterns** | Design patterns from production sites (Linear, Vercel, Lovable). Layouts, dark theme techniques, micro-interactions. | Good reference when building marketing pages or product UIs. Gives agents real-world examples instead of generic patterns. |

## dev-tools/

Visual dev overlays and annotation tools that run alongside your app in development mode.

| Skill | What it is | Credit |
|-------|-----------|--------|
| **agentation** | Annotation toolbar for Next.js. Mark up the UI with feedback that syncs to AI agents via MCP server. | [Dennis Jin & Benji Taylor](https://www.npmjs.com/package/agentation) |
| **agentation-self-driving** | Autonomous design critique — agent opens a browser, scans pages, creates annotations. Two-session workflow: one agent critiques, another fixes. | [Dennis Jin & Benji Taylor](https://www.npmjs.com/package/agentation) |
| **interface-craft** | Visual design overlay for styling React apps directly in the browser. Edit styles live and it writes back to code. | [Josh Puckett](https://github.com/joshpuckett/interfacekit) |
| **dialkit** | Floating control panel — sliders, toggles, color pickers, spring curve editors wired to component values. Tune animations without edit-save-reload. | [Josh Puckett](https://github.com/joshpuckett/dialkit) |

## workflows/

Agent orchestration patterns and working strategies.

| Skill | What it is | Why I use it |
|-------|-----------|-------------|
| **claude-workflow** | Claude Code working patterns — plan mode, subagent strategy, verification loops, context management, hook patterns (config protection, batch formatting). | Structured approach to working with Claude Code. Covers when to compact, how to manage context budget, and self-improvement loops. |
| **agent-swarm** | Multi-agent parallel workflow — wave execution (2-4 agents), review loops with rotating critique lenses, adversarial dual-review (Santa Method). | For complex builds requiring parallel workstreams. Includes repomix + external LLM review commands. |

## design-systems/

Reference design systems for exploration and inspiration. These are **not auto-loaded** — agents only use them when you explicitly ask (e.g. "use Nothing style"). They live outside `design/` so they don't inflate every project's context.

| System | What it is | Credit |
|--------|-----------|--------|
| **nothing-design** | Nothing-inspired monochrome UI — Swiss typography, OLED blacks, Space Grotesk/Mono, industrial widgets, three-layer hierarchy. Includes full token system, component specs, and platform mappings (CSS, React/Tailwind, SwiftUI). | [dominikmartn](https://github.com/dominikmartn/nothing-design-skill) |

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

Or use [wip-scaffold](https://github.com/tommylower/wip-scaffold) to scaffold a project pre-wired with these.

## related

- [wip-scaffold](https://github.com/tommylower/wip-scaffold) — scaffold + docs
- [marketingskills](https://github.com/coreyhaines31/marketingskills) — marketing skills (submodule)
