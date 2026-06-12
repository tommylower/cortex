#!/usr/bin/env bash
# sync every cortex skill into ~/.claude/skills/ as a symlink.
# idempotent: skips correct symlinks, repairs stale ones, removes dead ones.
# safe to run on every claude session start.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.claude/skills"
mkdir -p "$TARGET_DIR"

# every category folder that contains skill subdirectories.
CATEGORIES=(
  "agent-workflows"
  "design/foundations"
  "design/color"
  "design/motion"
  "design/systems"
  "design/tools"
  "engineering"
  "marketing/skills"
  "local"
)

wanted=""

is_cortex_skill_target() {
  case "$1" in
    "$CORTEX_ROOT"/*) return 0 ;;
    */cortex/agent-workflows/*) return 0 ;;
    */cortex/design/*) return 0 ;;
    */cortex/local/*) return 0 ;;
    */cortex/engineering/*) return 0 ;;
    */cortex/marketing/skills/*) return 0 ;;
    *) return 1 ;;
  esac
}

for category in "${CATEGORIES[@]}"; do
  for skill_dir in "$CORTEX_ROOT/$category"/*/; do
    [ -d "$skill_dir" ] || continue
    [ -f "$skill_dir/SKILL.md" ] || continue
    name="$(basename "$skill_dir")"
    wanted="$wanted
$name"
    target="$TARGET_DIR/$name"
    # remove stale link/file if it points elsewhere
    if [ -L "$target" ]; then
      current="$(readlink "$target")"
      if [ "$current" != "${skill_dir%/}" ]; then
        rm "$target"
      fi
    elif [ -e "$target" ]; then
      # not a symlink, leave it alone (could be user's own)
      continue
    fi
    [ -e "$target" ] || ln -s "${skill_dir%/}" "$target"
  done
done

# clean up dead or stale symlinks that look like cortex-managed skill links
for link in "$TARGET_DIR"/*; do
  [ -L "$link" ] || continue
  name="$(basename "$link")"
  target="$(readlink "$link")"
  if is_cortex_skill_target "$target"; then
    if ! printf '%s\n' "$wanted" | grep -qx "$name" || [ ! -e "$link" ]; then
      rm "$link"
    fi
  fi
done
