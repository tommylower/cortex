#!/usr/bin/env bash
# Preserve Codex desktop turn-ended notifications while also refreshing the
# cortex session journal for the active workspace.

set -u

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"$CORTEX_ROOT/scripts/session-journal-start.sh" "${PWD}" >/dev/null 2>&1 || true
"$CORTEX_ROOT/scripts/session-journal-stop.sh" "${PWD}" >/dev/null 2>&1 || true

if [ "$#" -gt 0 ]; then
  "$@" >/dev/null 2>&1 || true
fi
