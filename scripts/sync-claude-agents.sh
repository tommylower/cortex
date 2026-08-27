#!/usr/bin/env bash
# Sync cortex-owned Claude subagents into the active Claude config directory.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${CORTEX_CLAUDE_CONFIG_DIR:-${CLAUDE_CONFIG_DIR:-$HOME/.claude}}/agents"
SOURCE_DIR="$CORTEX_ROOT/scripts/claude-agents"

mkdir -p "$TARGET_DIR"

for source in "$SOURCE_DIR"/*.md; do
  [ -f "$source" ] || continue
  target="$TARGET_DIR/$(basename "$source")"
  if [ -L "$target" ] && [ "$(readlink "$target")" != "$source" ]; then
    rm "$target"
  elif [ -e "$target" ] && [ ! -L "$target" ]; then
    continue
  fi
  [ -e "$target" ] || ln -s "$source" "$target"
done
