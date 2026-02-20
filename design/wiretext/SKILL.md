# Wiretext

ASCII wireframe tool with MCP server integration for Claude Code. Generate and edit wireframes directly from the terminal, then fine-tune in the browser.

## MCP Setup (Claude Code)
```bash
claude mcp add wiretext -- npx -y @wiretext/mcp
```

## MCP Tools

- create_wireframe — generate an editable wiretext URL from wire objects
- render_wireframe — render wire objects as ASCII art inline

## Primitives

box, text, line, arrow

## Components

button, input, select, checkbox, radio, toggle, table, modal, browser, card, navbar, tabs, progress, icon, image, alert, avatar, divider, breadcrumb, list, stepper, rating, skeleton

## Workflow

1. Tell Claude Code to wireframe a section/page using wiretext MCP
2. CC generates wire objects and returns editable wiretext URL
3. Open URL in browser, fine-tune layout and components
4. Use wireframe as reference to build in code

## Notes

- Use for rapid wireframing before building in code or Figma
- Focus on content hierarchy and structure, not pixel precision
- Pairs well with section-by-section page builds
