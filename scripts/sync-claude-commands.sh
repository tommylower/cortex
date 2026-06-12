#!/usr/bin/env bash
# sync cortex-owned Claude slash commands into ~/.claude/commands/.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.claude/commands"
mkdir -p "$TARGET_DIR"
rm -f "$TARGET_DIR/design-builder.md"

write_command() {
  local name="$1"
  local body="$2"
  printf '%s\n' "$body" > "$TARGET_DIR/$name.md"
}

COMMON_RULES="First read:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/SKILL.md
\`\`\`

Then follow its rules:

- keep the portable source of truth in Cortex markdown
- load only the matching reference file from \`$CORTEX_ROOT/agent-workflows/waveframe/references/\`
- treat text after the slash command as user context, not required syntax
- ask short setup questions when context is missing
- keep private process notes in \`.waveframe/\`
- keep client-facing output limited to README, AGENTS, and design-system docs
- propose before major writes
- never push unless explicitly asked"

cat > "$TARGET_DIR/waveframe.md" <<EOF
---
description: waveframe router. Prefer specific commands like /design-scaffold, /design-system-synthesize, /design-system-extract, or /design-handoff-hardening when you know the task.
argument-hint: [optional context]
---

# waveframe

Use the Cortex waveframe workflow as a numbered router.

$COMMON_RULES

Infer the route from any context after the command. If the route is unclear, ask exactly this and wait:

\`\`\`text
What do you want to do?

1. Scaffold or update a project
2. Synthesize messy brand exploration into a design system
3. Extract design system from a finished codebase
4. Harden a finished implementation before handoff
5. Turn visual references into a front-end architecture brief
6. Map approved sitemap or wireframes into content structure
7. Apply a reusable output template
8. Scaffold a product UI design system from exploration
9. Update an existing design system from recent work
10. Audit drift between docs, design system, and code
11. Something else - type what you want me to do
\`\`\`

Accept a number, option text, or free-form description. If the user chooses 11, route from their description or ask one focused follow-up.
EOF

write_command "design-scaffold" "---
description: Scaffold or update a project with Cortex, README, AGENTS, and optional draft/ready design-system setup.
argument-hint: [optional project context]
---

# design-scaffold

Use Cortex waveframe in project-scaffold mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/project-scaffold.md
\`\`\`

Ask for missing project intake, recommend architecture, then propose before writing."

write_command "design-system-synthesize" "---
description: Turn messy brand exploration into a reusable client design-system skill or project-local design-system docs.
argument-hint: [optional source/context]
---

# design-system-synthesize

Use Cortex waveframe in design-system-synthesis mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/design-system-synthesis.md
\`\`\`

Ask where the messy brand exploration lives, confirm synthesis scope, then propose before writing."

write_command "design-system-extract" "---
description: Extract a reusable design system from a finished or manually built codebase, including client-facing docs and optional local Cortex skill.
argument-hint: [optional codebase/context]
---

# design-system-extract

Use Cortex waveframe in design-system-extract mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/design-system-extract.md
\`\`\`

Inspect the finished codebase and existing docs, propose the package targets and skill name, include visual handoff links when provided, then ask approval before writing."

write_command "design-handoff-hardening" "---
description: Audit a finished implementation for repeated visual patterns, propose safe code normalization, then prepare design-system handoff extraction.
argument-hint: [optional codebase/context]
---

# design-handoff-hardening

Use Cortex waveframe in handoff-hardening mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/handoff-hardening.md
\`\`\`

Inspect the finished implementation for repeated tokens, shadows, card treatments, section wrappers, buttons, motion, and stale docs. Propose safe normalizations with files, risk, and verification before editing. After approved changes, continue into design-system extraction from the stabilized code."

write_command "design-architecture" "---
description: Synthesize visual, structural, or component references into the correct design-system reference file after approval.
argument-hint: [optional reference/context]
---

# design-architecture

Use Cortex waveframe in design-architecture mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/design-architecture.md
\`\`\`

Ask where the references are, identify the target design system or project, identify the current phase, propose the destination reference file, state what is explicitly not being done, then ask approval before writing."

write_command "design-content-map" "---
description: Turn approved sitemaps, docs, or wireframes into private content maps, ASCII wireframes, and promotable section briefs.
argument-hint: [optional sitemap/wireframe context]
---

# design-content-map

Use Cortex waveframe in content-map mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/content-map.md
\`\`\`

Ask where the sitemap, doc, or approved wireframe lives and which page or flow to map first. Draft privately in \`.waveframe/\`. Promote to \`design-system/\`, README, or AGENTS only after explicit user approval."

write_command "design-structure" "---
description: Apply a private reusable output template, such as a design-system deck, brand overview deck, product UI system board, landing-page variant, or dashboard structure, to a selected design system and target surface.
argument-hint: [optional template/context]
---

# design-structure

Use Cortex waveframe in design-structure mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/structure.md
\`\`\`

Ask which private output template to use, which design system to apply, and which target surface to build in. Produce an application plan and ask approval before writing."

write_command "design-product-ui-system" "---
description: Audit product UI exploration and scaffold software design-system guidance for tokens, semantic roles, app shell, components, states, and code mapping before implementation.
argument-hint: [optional product UI source/repo context]
---

# design-product-ui-system

Use Cortex waveframe in product-ui-system mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/product-ui-system.md
$CORTEX_ROOT/agent-workflows/waveframe/structures/product-ui-system-board/STRUCTURE.md
\`\`\`

Ask for the product UI exploration source if missing, identify whether a repo path is only for code mapping or also approved for writes, then audit color readiness, split brand/product lanes, map semantic roles, and propose the next scaffold before writing."

write_command "design-system-update" "---
description: Fold stable design decisions from recent code/manual work back into an existing design system.
argument-hint: [optional changed area/context]
---

# design-system-update

Use Cortex waveframe in design-system-update mode.

$COMMON_RULES

Use the waveframe rules to fold stable decisions from recent manual/code work into the selected design system. If a dedicated reference file does not exist yet, use the design-system-synthesis reference and keep the update narrowly scoped."

write_command "design-drift-audit" "---
description: Audit drift between README, AGENTS, design-system docs, and the actual codebase.
argument-hint: [optional audit focus]
---

# design-drift-audit

Use Cortex waveframe in drift-audit mode.

$COMMON_RULES

Load:

\`\`\`text
$CORTEX_ROOT/agent-workflows/waveframe/references/drift-audit.md
\`\`\`

Audit README, AGENTS, design-system docs, and code. Report findings before making fixes."
