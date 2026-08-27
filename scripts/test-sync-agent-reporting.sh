#!/usr/bin/env bash

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SYNC_SCRIPT="$CORTEX_ROOT/scripts/sync-agent-reporting.sh"
TEST_ROOT="$(mktemp -d)"
TEST_HOME="$TEST_ROOT/home"
START_MARKER="<!-- cortex-reporting-profile:start -->"
END_MARKER="<!-- cortex-reporting-profile:end -->"

cleanup() {
  local cleanup_root="${TEST_ROOT:?}"
  rm -rf "$cleanup_root"
}
trap cleanup EXIT

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

assert_contains() {
  local path="$1"
  local text="$2"
  grep -Fq "$text" "$path" || fail "$path does not contain: $text"
}

assert_not_contains() {
  local path="$1"
  local text="$2"
  if grep -Fq "$text" "$path"; then
    fail "$path unexpectedly contains: $text"
  fi
}

assert_marker_count() {
  local path="$1"
  local expected="$2"
  local starts
  local ends
  starts="$(grep -Fxc "$START_MARKER" "$path" || true)"
  ends="$(grep -Fxc "$END_MARKER" "$path" || true)"
  [ "$starts" = "$expected" ] || fail "$path has $starts start markers, expected $expected"
  [ "$ends" = "$expected" ] || fail "$path has $ends end markers, expected $expected"
}

file_mode() {
  local path="$1"
  stat -f '%Lp' "$path" 2>/dev/null || stat -c '%a' "$path"
}

mkdir -p "$TEST_HOME/.codex" "$TEST_HOME/.claude"
printf '%s\n' '# Existing Codex guidance' > "$TEST_HOME/.codex/AGENTS.md"
printf '%s\n' '# Existing Claude guidance' > "$TEST_HOME/.claude/CLAUDE.md"
chmod 600 "$TEST_HOME/.codex/AGENTS.md"

"$SYNC_SCRIPT" --home "$TEST_HOME" >/dev/null

assert_contains "$TEST_HOME/.codex/AGENTS.md" '# Existing Codex guidance'
assert_contains "$TEST_HOME/.codex/AGENTS.md" '# Agent writing profile'
assert_marker_count "$TEST_HOME/.codex/AGENTS.md" 1
[ "$(file_mode "$TEST_HOME/.codex/AGENTS.md")" = "600" ] || fail "existing file mode changed"

cp "$TEST_HOME/.codex/AGENTS.md" "$TEST_ROOT/first-sync.md"
"$SYNC_SCRIPT" --home "$TEST_HOME" >/dev/null
cmp -s "$TEST_ROOT/first-sync.md" "$TEST_HOME/.codex/AGENTS.md" || fail "sync is not idempotent"

mkdir -p "$TEST_HOME/.agents"
printf '%s\n' '# Local override' '' 'Use the local profile.' > "$TEST_HOME/.agents/REPORTING.md"
"$SYNC_SCRIPT" --home "$TEST_HOME" >/dev/null

assert_contains "$TEST_HOME/.codex/AGENTS.md" '# Local override'
assert_not_contains "$TEST_HOME/.codex/AGENTS.md" '# Agent writing profile'
assert_marker_count "$TEST_HOME/.codex/AGENTS.md" 1

REAL_TARGET="$TEST_ROOT/real-guidance.md"
LINK_TARGET="$TEST_ROOT/linked-guidance.md"
printf '%s\n' '# Linked target' > "$REAL_TARGET"
chmod 640 "$REAL_TARGET"
ln -s "$REAL_TARGET" "$LINK_TARGET"

"$SYNC_SCRIPT" \
  --profile "$TEST_HOME/.agents/REPORTING.md" \
  --project-only \
  --target "$LINK_TARGET" >/dev/null

[ -L "$LINK_TARGET" ] || fail "target symlink was replaced"
assert_contains "$REAL_TARGET" '# Local override'
[ "$(file_mode "$REAL_TARGET")" = "640" ] || fail "symlink target mode changed"

MALFORMED_TARGET="$TEST_ROOT/malformed.md"
printf '%s\n' '# Keep me' "$START_MARKER" 'unfinished block' > "$MALFORMED_TARGET"
cp "$MALFORMED_TARGET" "$TEST_ROOT/malformed-before.md"

if "$SYNC_SCRIPT" \
  --profile "$TEST_HOME/.agents/REPORTING.md" \
  --project-only \
  --target "$MALFORMED_TARGET" >/dev/null 2>&1; then
  fail "malformed markers were accepted"
fi
cmp -s "$TEST_ROOT/malformed-before.md" "$MALFORMED_TARGET" || fail "malformed target was modified"

DUPLICATE_TARGET="$TEST_ROOT/duplicate.md"
printf '%s\n' \
  '# Before' \
  "$START_MARKER" \
  'old profile one' \
  "$END_MARKER" \
  '# Between' \
  "$START_MARKER" \
  'old profile two' \
  "$END_MARKER" \
  '# After' > "$DUPLICATE_TARGET"

"$SYNC_SCRIPT" \
  --profile "$TEST_HOME/.agents/REPORTING.md" \
  --project-only \
  --target "$DUPLICATE_TARGET" >/dev/null

assert_marker_count "$DUPLICATE_TARGET" 1
assert_contains "$DUPLICATE_TARGET" '# Before'
assert_contains "$DUPLICATE_TARGET" '# Between'
assert_contains "$DUPLICATE_TARGET" '# After'
assert_not_contains "$DUPLICATE_TARGET" 'old profile one'
assert_not_contains "$DUPLICATE_TARGET" 'old profile two'

echo "sync-agent-reporting tests passed"
