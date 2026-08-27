#!/usr/bin/env bash
# Sync the bundled agent writing profile, or a local override, into agent guidance files.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_HOME="${HOME}"
PROJECT_ROOT=""
PROFILE_OVERRIDE=""
SYNC_GLOBAL=1
OPTIONAL=0
EXTRA_TARGETS=()

START_MARKER="<!-- cortex-reporting-profile:start -->"
END_MARKER="<!-- cortex-reporting-profile:end -->"

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Options:
  --home PATH       Use an alternate home directory
  --profile PATH    Use PATH instead of the bundled or user profile
  --project PATH    Also sync the profile into PATH/AGENTS.md
  --target PATH     Also sync into PATH; repeat for other agent guidance files
  --project-only    Skip global Codex and Claude files
  --optional        Exit successfully when no usable profile exists
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
    --profile)
      [ $# -ge 2 ] || { echo "--profile requires a path" >&2; exit 1; }
      PROFILE_OVERRIDE="$2"
      shift 2
      ;;
    --target)
      [ $# -ge 2 ] || { echo "--target requires a path" >&2; exit 1; }
      EXTRA_TARGETS+=("$2")
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

BUNDLED_PROFILE_PATH="$CORTEX_ROOT/agent-workflows/google-developer-style/assets/agent-guidance.md"
LOCAL_PROFILE_PATH="$TARGET_HOME/.agents/REPORTING.md"

if [ -n "$PROFILE_OVERRIDE" ]; then
  PROFILE_PATH="$PROFILE_OVERRIDE"
elif [ -s "$LOCAL_PROFILE_PATH" ]; then
  PROFILE_PATH="$LOCAL_PROFILE_PATH"
else
  PROFILE_PATH="$BUNDLED_PROFILE_PATH"
fi

if [ ! -s "$PROFILE_PATH" ]; then
  if [ "$OPTIONAL" -eq 1 ]; then
    exit 0
  fi
  echo "Agent writing profile not found: $PROFILE_PATH" >&2
  exit 1
fi

if awk -v start="$START_MARKER" -v end="$END_MARKER" '
  $0 == start || $0 == end { found = 1 }
  END { exit(found ? 0 : 1) }
' "$PROFILE_PATH"; then
  echo "Agent writing profile must not contain managed markers: $PROFILE_PATH" >&2
  exit 1
fi

resolve_symlink_target() {
  local path="$1"
  local link_dir
  local link_value
  local depth=0

  while [ -L "$path" ]; do
    if [ "$depth" -ge 40 ]; then
      return 1
    fi

    link_value="$(readlink "$path")" || return 1
    case "$link_value" in
      /*)
        path="$link_value"
        ;;
      *)
        link_dir="$(cd -P "$(dirname "$path")" && pwd)" || return 1
        path="$link_dir/$link_value"
        ;;
    esac
    depth=$((depth + 1))
  done

  [ -e "$path" ] || return 1
  link_dir="$(cd -P "$(dirname "$path")" && pwd)" || return 1
  printf '%s/%s\n' "$link_dir" "$(basename "$path")"
}

sync_target() {
  local requested_path="$1"
  local target_path="$requested_path"
  local target_dir
  local temp_path
  local trimmed_path
  local block_path
  local start_count=0
  local marker_state

  if [ -L "$requested_path" ]; then
    if [ ! -e "$requested_path" ]; then
      echo "Cannot sync a broken symlink: $requested_path" >&2
      return 1
    fi

    if ! target_path="$(resolve_symlink_target "$requested_path")"; then
      echo "Cannot resolve symlink target: $requested_path" >&2
      return 1
    fi
  fi

  if [ -e "$target_path" ] && [ ! -f "$target_path" ]; then
    echo "Agent guidance target is not a regular file: $requested_path" >&2
    return 1
  fi

  if [ -e "$target_path" ] && [ "$target_path" -ef "$PROFILE_PATH" ]; then
    echo "Agent guidance target cannot also be the profile source: $requested_path" >&2
    return 1
  fi

  target_dir="$(dirname "$target_path")"
  mkdir -p "$target_dir"
  temp_path="$(mktemp)"
  trimmed_path="$(mktemp)"
  block_path="$(mktemp)"

  printf '%s\n' "$START_MARKER" > "$block_path"
  while IFS= read -r line || [ -n "$line" ]; do
    printf '%s\n' "$line" >> "$block_path"
  done < "$PROFILE_PATH"
  printf '%s\n' "$END_MARKER" >> "$block_path"

  if [ -f "$target_path" ]; then
    marker_state="$(awk -v start="$START_MARKER" -v end="$END_MARKER" '
      $0 == start {
        if (inside) invalid = 1
        inside = 1
        starts++
        next
      }
      $0 == end {
        if (!inside) invalid = 1
        inside = 0
        next
      }
      END {
        if (inside) invalid = 1
        if (invalid) print "invalid"
        else print starts + 0
      }
    ' "$target_path")"

    if [ "$marker_state" = "invalid" ]; then
      echo "Malformed reporting profile markers in $target_path" >&2
      rm "$temp_path" "$trimmed_path" "$block_path"
      return 1
    fi

    start_count="$marker_state"
  fi

  if [ "$start_count" -gt 0 ]; then
    awk -v start="$START_MARKER" -v end="$END_MARKER" -v block="$block_path" '
      function emit_block(line) {
        while ((getline line < block) > 0) print line
        close(block)
      }
      $0 == start {
        if (!inserted) {
          emit_block()
          inserted = 1
        }
        inside = 1
        next
      }
      $0 == end && inside { inside = 0; next }
      !inside { print }
    ' "$target_path" > "$temp_path"
    rm "$trimmed_path"
  else
    if [ -f "$target_path" ]; then
      cp "$target_path" "$temp_path"
    fi

    awk '
      /^[[:space:]]*$/ { trailing = trailing $0 ORS; next }
      { printf "%s", trailing; trailing = ""; print }
    ' "$temp_path" > "$trimmed_path"
    mv "$trimmed_path" "$temp_path"

    if [ -s "$temp_path" ]; then
      printf '\n' >> "$temp_path"
    fi

    while IFS= read -r line || [ -n "$line" ]; do
      printf '%s\n' "$line" >> "$temp_path"
    done < "$block_path"
  fi

  if [ -f "$target_path" ] && cmp -s "$temp_path" "$target_path"; then
    rm "$temp_path" "$block_path"
    return
  fi

  rm "$block_path"

  if [ -f "$target_path" ]; then
    if ! cp -X "$temp_path" "$target_path" 2>/dev/null; then
      cp "$temp_path" "$target_path"
    fi
    rm "$temp_path"
  else
    chmod 644 "$temp_path"
    mv "$temp_path" "$target_path"
  fi
}

if [ "$SYNC_GLOBAL" -eq 1 ]; then
  sync_target "$TARGET_HOME/.codex/AGENTS.md"
  sync_target "$TARGET_HOME/.claude/CLAUDE.md"
fi

if [ -n "$PROJECT_ROOT" ]; then
  sync_target "$PROJECT_ROOT/AGENTS.md"
fi

if [ "${#EXTRA_TARGETS[@]}" -gt 0 ]; then
  for target_path in "${EXTRA_TARGETS[@]}"; do
    sync_target "$target_path"
  done
fi

echo "Synced agent writing profile from $PROFILE_PATH"
