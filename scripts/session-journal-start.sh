#!/usr/bin/env bash
# Create or refresh the active session-journal note for the current runtime.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec python3 "$CORTEX_ROOT/scripts/session-journal.py" start "${1:-}"
