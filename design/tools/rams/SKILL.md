---
name: rams
description: Rams external design-review command for accessibility, visual consistency, and UI polish. Use when the user explicitly asks for Rams or /rams. For Cortex-native review without the Rams command, use preflight for static review or wip-senior-audit for a live product audit.
author: Rams (https://rams.ai/)
---

# Rams

Rams is an external design-review command. Use this skill only when the user explicitly asks for Rams, `/rams`, or the installed Rams workflow.

## What It Checks

- Accessibility issues such as missing alt text, unlabeled icon buttons, missing form labels, skipped headings, keyboard gaps, color-only state, small touch targets, and contrast below 4.5:1.
- Visual consistency issues such as spacing drift, overflow, z-index conflicts, mixed font families, weak line height, and missing font fallbacks.
- UI polish issues with line-numbered suggestions when the command supports them.

## Setup

If Rams is not installed and the user wants it:

```bash
curl -fsSL https://rams.ai/install | bash
```

Then restart the coding agent if its command list is loaded at session start.

## Routing

- Use `rams` when the user names Rams.
- Use `preflight` for the Cortex-native static design/a11y/AI-slop review.
- Use `wip-senior-audit` for a live product audit with screenshots and a report.

Do not call Rams a Cortex-owned slash command unless `scripts/sync-claude-commands.sh` installs it.
