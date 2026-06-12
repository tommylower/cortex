#!/usr/bin/env bash
# Configure local Claude and Codex installs to use cortex skills.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_HOME="${HOME}"
SETUP_CLAUDE=1
SETUP_CODEX=1

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Options:
  --home PATH      Use an alternate home directory (useful for testing)
  --claude-only    Configure Claude only
  --codex-only     Configure Codex only
  -h, --help       Show this help
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --home)
      [ $# -ge 2 ] || { echo "--home requires a path" >&2; exit 1; }
      TARGET_HOME="$2"
      shift 2
      ;;
    --claude-only)
      SETUP_CLAUDE=1
      SETUP_CODEX=0
      shift
      ;;
    --codex-only)
      SETUP_CLAUDE=0
      SETUP_CODEX=1
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

mkdir -p "$TARGET_HOME"

setup_claude() {
  local claude_dir="$TARGET_HOME/.claude"
  local settings_path="$claude_dir/settings.json"
  mkdir -p "$claude_dir"

  CLAUDE_SETTINGS_PATH="$settings_path" CORTEX_ROOT="$CORTEX_ROOT" python3 <<'PY'
import json
import os
from pathlib import Path

settings_path = Path(os.environ["CLAUDE_SETTINGS_PATH"])
cortex_root = os.environ["CORTEX_ROOT"]

if settings_path.exists():
    data = json.loads(settings_path.read_text())
else:
    data = {}

hooks = data.setdefault("hooks", {})

def normalize_group(entries, matcher=""):
    for entry in entries:
        if isinstance(entry, dict) and isinstance(entry.get("hooks"), list):
            if matcher == "" or entry.get("matcher", "") == matcher:
                entry.setdefault("matcher", matcher)
                return entry
    entry = {"matcher": matcher, "hooks": []} if matcher else {"hooks": []}
    entries.append(entry)
    return entry

session_start = hooks.setdefault("SessionStart", [])
start_group = normalize_group(session_start)
start_hooks = start_group["hooks"]
start_commands = [
    f"{cortex_root}/scripts/sync-claude-skills.sh >/dev/null 2>&1 || true",
    f"{cortex_root}/scripts/sync-claude-commands.sh >/dev/null 2>&1 || true",
]

for command in start_commands:
    if not any(isinstance(h, dict) and h.get("command") == command for h in start_hooks):
        start_hooks.append({"type": "command", "command": command})

settings_path.write_text(json.dumps(data, indent=2) + "\n")
PY

  HOME="$TARGET_HOME" "$CORTEX_ROOT/scripts/sync-claude-skills.sh"
  HOME="$TARGET_HOME" "$CORTEX_ROOT/scripts/sync-claude-commands.sh"
}

setup_codex() {
  local codex_dir="$TARGET_HOME/.codex"
  mkdir -p "$codex_dir"

  HOME="$TARGET_HOME" "$CORTEX_ROOT/scripts/sync-codex-skills.sh"
}

if [ "$SETUP_CLAUDE" -eq 1 ]; then
  setup_claude
fi

if [ "$SETUP_CODEX" -eq 1 ]; then
  setup_codex
fi

echo "Configured local agents for cortex in $TARGET_HOME"
