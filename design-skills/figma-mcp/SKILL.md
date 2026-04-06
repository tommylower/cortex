# Figma MCP

Official Figma remote MCP server. Lets Claude Code read design tokens, components, and layout data directly from Figma files.

## Setup (Claude Code)

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Use `--scope user` to make it available across all projects.

After adding, restart CC, type `/mcp`, select `figma`, and authenticate via browser.

## Usage

### Read design tokens from a frame
Copy link to a Figma frame (right click → copy link to selection), then prompt:
"Read the design tokens from this Figma frame: [paste link]. Update tailwind.config.ts with these values."

### Generate code from a design
Select a frame in Figma, copy the link, then prompt:
"Convert this Figma design to a React component: [paste link]"

### Extract variables and styles
"Pull the color variables and typography styles from this Figma file: [paste link]"

## What It Can Do

- Read frame layout, positions, sizes, and structure
- Extract design variables (colors, spacing, typography)
- Map Figma components to codebase components
- Generate code from selected frames
- Pull in component and layout data for design system work

## Workflow

1. Design tokens and system in Figma
2. Copy frame link
3. Paste into CC with instructions
4. CC reads Figma data and generates/updates code
5. Use agentation to fine-tune in browser
6. Use rams to review for accessibility and polish

## Notes

- Works with Figma remote server — no desktop app required
- Link-based: always provide a frame link or selection link
- Works best when frames are well-organized with named layers
- Pair with a DESIGN_DIRECTION.md or CLAUDE.md fallback for tokens
