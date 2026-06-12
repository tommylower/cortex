#!/usr/bin/env bash
# validate every cortex skill: must have SKILL.md with frontmatter,
# name field matching the directory name, and a non-empty description.
# exit nonzero if any skill is malformed.

set -euo pipefail

CORTEX_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

CATEGORIES=(
  "agent-workflows"
  "design/foundations"
  "design/color"
  "design/motion"
  "design/systems"
  "design/tools"
  "engineering"
  "marketing/skills"
)

errors=0
seen_names=""

for category in "${CATEGORIES[@]}"; do
  for skill_dir in "$CORTEX_ROOT/$category"/*/; do
    [ -d "$skill_dir" ] || continue
    dir_name="$(basename "$skill_dir")"
    skill_file="$skill_dir/SKILL.md"

    if [ ! -f "$skill_file" ]; then
      echo "FAIL  $category/$dir_name — missing SKILL.md"
      errors=$((errors+1))
      continue
    fi

    first_line="$(head -1 "$skill_file")"
    if [ "$first_line" != "---" ]; then
      echo "FAIL  $category/$dir_name — missing frontmatter (first line is not ---)"
      errors=$((errors+1))
      continue
    fi

    # extract frontmatter block
    fm="$(awk 'NR>1 && /^---$/ {exit} NR>1 {print}' "$skill_file")"

    name="$(printf '%s\n' "$fm" | awk -F': *' '/^name:/ {print $2; exit}' | tr -d '"'"'")"
    desc="$(printf '%s\n' "$fm" | awk -F': *' '/^description:/ {print $2; exit}')"

    if [ -z "$name" ]; then
      echo "FAIL  $category/$dir_name — frontmatter missing name"
      errors=$((errors+1))
      continue
    fi

    if [ "$name" != "$dir_name" ]; then
      echo "FAIL  $category/$dir_name — name '$name' does not match directory '$dir_name'"
      errors=$((errors+1))
      continue
    fi

    if [ -z "$desc" ]; then
      echo "FAIL  $category/$dir_name — frontmatter missing description"
      errors=$((errors+1))
      continue
    fi

    if printf '%s\n' "$seen_names" | grep -qx "$name"; then
      echo "FAIL  $category/$dir_name — duplicate name '$name'"
      errors=$((errors+1))
      continue
    fi
    seen_names="$seen_names
$name"

    echo "OK    $category/$dir_name"
  done
done

echo
if [ $errors -gt 0 ]; then
  echo "$errors skill(s) failed validation"
  exit 1
fi
echo "all skills valid"
