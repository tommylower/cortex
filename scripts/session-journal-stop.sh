#!/usr/bin/env bash
# Refresh the auto-capture block for the active session-journal note.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec python3 "$CORTEX_ROOT/scripts/session-journal.py" stop "${1:-}"
