#!/usr/bin/env bash
# sync cortex-owned Claude slash commands into ~/.claude/commands/.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.claude/commands"
mkdir -p "$TARGET_DIR"
rm -f "$TARGET_DIR/design-builder.md"
# waveframe removed 2026-07-04 (rebuild seed: groundwork/asbuilt.md); drop its stale adapters
rm -f "$TARGET_DIR/waveframe.md" \
  "$TARGET_DIR/design-scaffold.md" \
  "$TARGET_DIR/design-system-synthesize.md" \
  "$TARGET_DIR/design-system-extract.md" \
  "$TARGET_DIR/design-handoff-hardening.md" \
  "$TARGET_DIR/design-architecture.md" \
  "$TARGET_DIR/design-content-map.md" \
  "$TARGET_DIR/design-structure.md" \
  "$TARGET_DIR/design-product-ui-system.md" \
  "$TARGET_DIR/design-system-update.md" \
  "$TARGET_DIR/design-drift-audit.md"

write_command() {
  local name="$1"
  local body="$2"
  printf '%s\n' "$body" > "$TARGET_DIR/$name.md"
}

write_handoff_command() {
  local name="$1"
  local title="$2"
  write_command "$name" "---
description: Close out a token-heavy session with pre-clear checks, compact continuity notes, and a short restart prompt.
argument-hint: [optional next-session focus]
---

# $title

First read:

\`\`\`text
$CORTEX_ROOT/engineering/handoff/SKILL.md
\`\`\`

Then follow it exactly.

Treat text after the slash command as the next-session focus. Keep output compact. Suggest commits, tests, pushes, or docs when needed before context is cleared, but do not stage, commit, push, install dependencies, or run expensive verification unless the user explicitly asked for that."
}

write_handoff_command "handoff" "handoff"
write_handoff_command "closeout" "closeout"
