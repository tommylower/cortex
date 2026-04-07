---
name: rams
description: "AI design engineer that reviews code for accessibility issues, visual inconsistencies, and UI polish, then offers to fix them. Checks alt text, aria-labels, form labels, keyboard handlers, contrast ratios, touch target sizes, heading hierarchy, spacing consistency, z-index conflicts, font usage, and line height. Outputs a score out of 100 with line numbers, code snippets, fix suggestions, and WCAG references. Use when the user asks for a design review, accessibility audit, UI polish pass, a11y check, or wants Rams to review a component or page. Triggers: rams, design review, a11y, accessibility audit, wcag, ui polish, design critique, review my component."
---

# Rams

AI design engineer for coding agents. Reviews code for accessibility issues, visual inconsistencies, and UI polish — then offers to fix them.

## Installation
```bash
curl -fsSL https://rams.ai/install | bash
```

Auto-detects your coding agent (Claude Code, Cursor, etc).

## Usage

Run `/rams` in your coding agent to trigger a design review of the current file or component.

## What It Checks

### Accessibility
- Images without alt text
- Icon-only buttons missing aria-labels
- Form inputs without labels
- Non-semantic click handlers
- Missing keyboard handlers
- Color-only information
- Touch targets under 44x44px
- Skipped heading levels
- Contrast ratio below 4.5:1

### Visual Consistency
- Inconsistent spacing values
- Overflow and alignment issues
- Z-index conflicts
- Mixed font families and weights
- Line height issues
- Missing font fallbacks

## Notes
- Run after building components, before polish phase
- Each issue includes line number, code snippet, fix suggestion, and WCAG reference
- Outputs a score out of 100
