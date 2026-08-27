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
import shlex
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
    f"{shlex.quote(cortex_root + '/scripts/sync-claude-skills.sh')} >/dev/null 2>&1 || true",
    f"{shlex.quote(cortex_root + '/scripts/sync-claude-commands.sh')} >/dev/null 2>&1 || true",
]

for command in start_commands:
    if not any(isinstance(h, dict) and h.get("command") == command for h in start_hooks):
        start_hooks.append({"type": "command", "command": command})

settings_path.write_text(json.dumps(data, indent=2) + "\n")
PY

  python3 "$CORTEX_ROOT/scripts/configure-claude-session-pickup.py" \
    --settings "$settings_path" \
    --cortex-root "$CORTEX_ROOT"

  CORTEX_TARGET_HOME="$TARGET_HOME" \
    "$CORTEX_ROOT/scripts/sync-claude-skills.sh"
  CORTEX_TARGET_HOME="$TARGET_HOME" \
    "$CORTEX_ROOT/scripts/sync-claude-commands.sh"
  CORTEX_CLAUDE_CONFIG_DIR="$claude_dir" \
    "$CORTEX_ROOT/scripts/sync-claude-agents.sh"
}

setup_codex() {
  local codex_dir="$TARGET_HOME/.codex"
  mkdir -p "$codex_dir"

  CORTEX_TARGET_HOME="$TARGET_HOME" \
    "$CORTEX_ROOT/scripts/sync-codex-skills.sh"
}

if [ "$SETUP_CLAUDE" -eq 1 ]; then
  setup_claude
fi

if [ "$SETUP_CODEX" -eq 1 ]; then
  setup_codex
fi

REPORTING_ARGS=(--home "$TARGET_HOME")

if [ "$SETUP_CLAUDE" -eq 1 ] && [ "$SETUP_CODEX" -eq 1 ]; then
  if [ -f "$TARGET_HOME/.gemini/GEMINI.md" ]; then
    REPORTING_ARGS+=(--target "$TARGET_HOME/.gemini/GEMINI.md")
  fi

  if [ -f "$TARGET_HOME/clawd/AGENTS.md" ]; then
    REPORTING_ARGS+=(--target "$TARGET_HOME/clawd/AGENTS.md")
  fi
else
  REPORTING_ARGS+=(--project-only)

  if [ "$SETUP_CLAUDE" -eq 1 ]; then
    REPORTING_ARGS+=(--target "$TARGET_HOME/.claude/CLAUDE.md")
  fi

  if [ "$SETUP_CODEX" -eq 1 ]; then
    REPORTING_ARGS+=(--target "$TARGET_HOME/.codex/AGENTS.md")
  fi
fi

"$CORTEX_ROOT/scripts/sync-agent-reporting.sh" "${REPORTING_ARGS[@]}"

echo "Configured local agents for cortex in $TARGET_HOME"
