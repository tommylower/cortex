# skills

The craft doesn't live in the code. It lives in the decisions before the code — the spacing that feels right before you measure it, the animation that lands before you time it, the layout that breathes before you name why. This is a collection of those decisions, written down so they survive between projects, between sessions, between 2am and the morning after.

These are the skills I reach for when I'm building. They're not frameworks or libraries. They're markdown files — instructions, patterns, principles, and reference material that AI agents (Claude Code, Cursor, and others) load as context when working alongside me. They make the agent better at the thing I care about: building interfaces that feel intentional.

I update this constantly. Some of these I wrote. Some I've collected and credited. All of them I use.

---

## structure

```
skills/
  design/       # the craft — UI principles, motion, accessibility, design tools
  agents/       # agent behavior — setup patterns, autonomous workflows
  marketing/    # marketing skills (submodule → coreyhaines31/marketingskills)
```

---

## design/

The core of this collection. How things should look, move, and feel.

| Skill | What it does |
|-------|-------------|
| **ui-principles** | The foundation. Spacing scale, type hierarchy, layout rules, responsive breakpoints, component standards. Every other design skill assumes these. |
| **rams** | Automated design review — audits components for WCAG 2.1 accessibility and visual consistency. Named after Dieter Rams. Returns a scored report with line numbers and fixes. |
| **framer-motion** | Animation patterns for React. Scroll reveals, staggered lists, hover interactions, accordions, section transitions. Timing guidelines and spring physics included. |
| **css-interaction-tips** | Quick reference for micro-interactions — button press feel, smooth entrances, touch targets, hover-only on desktop, popover origins. The small things that make UI feel alive. |
| **dialkit** | Dev-time tool for tuning animation values in real-time. Sliders, toggles, spring curve editors. Wire it up during polish, remove before shipping. |
| **wiretext** | ASCII wireframing with MCP server integration. Rapid prototyping of page structure and content hierarchy before designing or coding. |
| **figma-mcp** | Figma integration for Claude Code. Reads frame layouts, extracts design tokens, maps components to code. Bridges design to implementation. |
| **reference-patterns** | Design patterns extracted from production sites (Linear, Vercel, Lovable). Layout patterns, micro-interactions, dark theme techniques, animation approaches. |

---

## agents/

Patterns for how AI agents should behave, coordinate, and operate autonomously.

| Skill | What it does |
|-------|-------------|
| **agentation** | Setup and configuration for the Agentation annotation toolbar in Next.js projects. MCP server integration for agent-driven design feedback. |
| **agentation-self-driving** | Autonomous design critique mode. The agent opens a browser, scans the page, and creates annotations — like watching a self-driving car navigate your UI. Includes a two-session workflow where one agent critiques and another fixes in parallel. |

---

## marketing/

A submodule pointing to [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — 33 marketing skills covering copywriting, SEO, CRO, paid ads, email sequences, and more. Includes 51 CLI tools and integration guides for 30+ platforms. Credit to Corey Haines.

---

## why skills matter

An AI agent without context is just autocomplete. Skills give agents the same taste, standards, and domain knowledge that a good collaborator would have. Instead of explaining your spacing system every session, the agent already knows it. Instead of catching accessibility issues in review, the agent catches them while writing.

The goal isn't to replace judgment — it's to encode the judgment you've already made so you don't have to make it twice.

---

## usage

Reference in your project's AI config:

```md
# in .claude/CLAUDE.md or .cursor/rules
Reference ~/Desktop/code/skills/ for shared design and engineering knowledge.
```

Or use with [wip-create-designbase](https://github.com/tommylower/foundations) to scaffold a full project that comes pre-wired with these skills.

---

## linked from

- [**foundations**](https://github.com/tommylower/foundations) — opinionated project scaffold and `wip-create-designbase` CLI
- [**marketingskills**](https://github.com/coreyhaines31/marketingskills) — marketing skill collection by Corey Haines (submodule)

---

*This collection is a living document. I add, revise, and remove skills as my process evolves.*
