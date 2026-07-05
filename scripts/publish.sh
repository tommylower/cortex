#!/usr/bin/env bash
# publish a folder to a standalone repo.
# if git-subtree is installed, the folder's commit history is extracted and
# force-pushed as the repo's main branch. otherwise, the script falls back to a
# snapshot mirror commit with the exact folder contents.
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
remote="https://$owner@github.com/$REPO.git"
source_sha="$(git rev-parse --short HEAD)"
publisher_name="${PUBLISH_AUTHOR_NAME:-$(git config user.name || true)}"
publisher_email="${PUBLISH_AUTHOR_EMAIL:-$(git config user.email || true)}"

[ -n "$publisher_name" ] || publisher_name="$owner"
[ -n "$publisher_email" ] || publisher_email="$owner@users.noreply.github.com"

if command -v git-subtree >/dev/null 2>&1; then
  git subtree split --prefix="$PREFIX" -b "$branch" >/dev/null
  git push --force "$remote" "$branch:main"
  git branch -D "$branch" >/dev/null
else
  tmp="$(mktemp -d)"
  cleanup() {
    rm -rf "$tmp"
  }
  trap cleanup EXIT

  git clone "$remote" "$tmp/repo" >/dev/null 2>&1 || {
    echo "could not clone $remote" >&2
    exit 1
  }

  cd "$tmp/repo"
  find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  git -C "$CORTEX_ROOT" archive --format=tar "$source_sha:$PREFIX" | tar -x
  git add -A

  if git diff --cached --quiet; then
    echo "$PREFIX already matches https://github.com/$REPO"
    exit 0
  fi

  git config user.name "$publisher_name"
  git config user.email "$publisher_email"
  git commit -m "publish $(basename "$PREFIX")" >/dev/null
  git push --force origin HEAD:main
fi

echo "published $PREFIX -> https://github.com/$REPO"
