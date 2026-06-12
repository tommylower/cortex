#!/usr/bin/env bash
# publish a cortex folder to a standalone showcase repo via git subtree split.
# the folder's commit history is extracted and force-pushed as the repo's main
# branch, so the showcase repo is always an exact mirror of the cortex folder.
#
# usage:   scripts/publish.sh <folder> <owner/repo>
# example: scripts/publish.sh agent-workflows/nightcap tommylower/nightcap

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$CORTEX_ROOT"

PREFIX="${1:?usage: publish.sh <folder> <owner/repo>}"
REPO="${2:?usage: publish.sh <folder> <owner/repo>}"
PREFIX="${PREFIX%/}"

[ -d "$PREFIX" ] || { echo "no such folder: $PREFIX" >&2; exit 1; }

if ! git diff --quiet HEAD -- "$PREFIX" || [ -n "$(git status --porcelain "$PREFIX")" ]; then
  echo "uncommitted changes under $PREFIX — commit them first" >&2
  exit 1
fi

owner="${REPO%%/*}"
branch="publish-$(basename "$PREFIX")"

git subtree split --prefix="$PREFIX" -b "$branch" >/dev/null
git push --force "https://$owner@github.com/$REPO.git" "$branch:main"
git branch -D "$branch" >/dev/null

echo "published $PREFIX -> https://github.com/$REPO"
