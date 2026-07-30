#!/usr/bin/env bash
# Sync a personal reporting profile into agent-global and project guidance files.

set -euo pipefail

TARGET_HOME="${HOME}"
PROJECT_ROOT=""
SYNC_GLOBAL=1
OPTIONAL=0

START_MARKER="<!-- cortex-reporting-profile:start -->"
END_MARKER="<!-- cortex-reporting-profile:end -->"

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Options:
  --home PATH       Use an alternate home directory
  --project PATH    Also sync the profile into PATH/AGENTS.md
  --project-only    Skip global Codex and Claude files
  --optional        Exit successfully when the profile does not exist
  -h, --help        Show this help
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --home)
      [ $# -ge 2 ] || { echo "--home requires a path" >&2; exit 1; }
      TARGET_HOME="$2"
      shift 2
      ;;
    --project)
      [ $# -ge 2 ] || { echo "--project requires a path" >&2; exit 1; }
      PROJECT_ROOT="$2"
      shift 2
      ;;
    --project-only)
      SYNC_GLOBAL=0
      shift
      ;;
    --optional)
      OPTIONAL=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

PROFILE_PATH="$TARGET_HOME/.agents/REPORTING.md"

if [ ! -s "$PROFILE_PATH" ]; then
  if [ "$OPTIONAL" -eq 1 ]; then
    exit 0
  fi
  echo "Reporting profile not found: $PROFILE_PATH" >&2
  exit 1
fi

sync_target() {
  local target_path="$1"
  local target_dir
  local temp_path

  target_dir="$(dirname "$target_path")"
  mkdir -p "$target_dir"
  temp_path="$(mktemp)"

  if [ -f "$target_path" ]; then
    awk -v start="$START_MARKER" -v end="$END_MARKER" '
      $0 == start { inside = 1; next }
      $0 == end { inside = 0; next }
      !inside { print }
    ' "$target_path" > "$temp_path"
  fi

  if [ -s "$temp_path" ]; then
    printf '\n' >> "$temp_path"
  fi

  printf '%s\n' "$START_MARKER" >> "$temp_path"
  while IFS= read -r line || [ -n "$line" ]; do
    printf '%s\n' "$line" >> "$temp_path"
  done < "$PROFILE_PATH"
  printf '%s\n' "$END_MARKER" >> "$temp_path"

  chmod 644 "$temp_path"
  mv "$temp_path" "$target_path"
}

if [ "$SYNC_GLOBAL" -eq 1 ]; then
  sync_target "$TARGET_HOME/.codex/AGENTS.md"
  sync_target "$TARGET_HOME/.claude/CLAUDE.md"
fi

if [ -n "$PROJECT_ROOT" ]; then
  sync_target "$PROJECT_ROOT/AGENTS.md"
fi

echo "Synced reporting profile from $PROFILE_PATH"
