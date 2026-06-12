#!/usr/bin/env bash
# bump the marketing submodule to the latest upstream commit and show what changed.
# the submodule pins a specific commit of coreyhaines31/marketingskills; upstream
# moves, the pin does not. run this (or wait for the weekly github action) to catch up.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$CORTEX_ROOT"

git submodule update --init marketing >/dev/null
before="$(git -C marketing rev-parse --short HEAD)"
git submodule update --remote marketing
after="$(git -C marketing rev-parse --short HEAD)"

if [ "$before" = "$after" ]; then
  echo "marketing already up to date ($before)"
  exit 0
fi

echo "marketing: $before -> $after"
echo
git -C marketing log --oneline -n 30 "$before..$after"
echo
echo "review the changes above, then commit the bump:"
echo "  git add marketing && git commit -m \"bump marketing submodule to $after\""
