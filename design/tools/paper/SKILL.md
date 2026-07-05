---
name: paper
description: Paper design canvas workflow for active design work through paper.design or a Paper MCP when available. Use when the user asks to use Paper, paper.design, a visual canvas, artboards, or active design iteration outside Figma. If Paper tools are unavailable, state that clearly and fall back to Figma, Wiretext, browser artifacts, or code.
---

# Paper

Use Paper as the active design canvas when the user asks for Paper or when the design workflow needs visual artboards and a Paper MCP is available.

## Fit

Use Paper for:

- Visual layout exploration before implementation.
- Artboards and design iteration.
- Translating product direction into screens.
- Reviewing a canvas alongside code.

Do not pretend Paper is connected. If no Paper MCP/tooling is available in the current agent, say so and offer the nearest available path: Figma, Wiretext, an HTML artifact, or direct code implementation.

## Workflow

1. Confirm whether Paper access is available in the current agent.
2. If available, create or open the canvas and work visually.
3. Keep the design tied to implementation constraints: components, tokens, breakpoints, and states.
4. When handing back to code, summarize the screens, tokens, component changes, and unresolved decisions.

## Related Skills

- `figma-mcp` for Figma-to-code or token extraction.
- `wiretext` for quick low-fidelity layouts.
- `preflight` for static UI review before shipping.
- `wip-senior-audit` for live product review.
