#!/usr/bin/env python3
"""Install Cortex session-pickup hooks into a Claude settings file."""

from __future__ import annotations

import argparse
import json
import shlex
from pathlib import Path
from typing import Any


def group(entries: list[Any], matcher: str) -> dict[str, Any]:
    for entry in entries:
        if isinstance(entry, dict) and entry.get("matcher", "") == matcher:
            hooks = entry.get("hooks")
            if isinstance(hooks, list):
                return entry
    created = {"matcher": matcher, "hooks": []}
    entries.append(created)
    return created


def add_command(hooks: list[Any], command: str) -> None:
    if not any(isinstance(item, dict) and item.get("command") == command for item in hooks):
        hooks.append({"type": "command", "command": command})


def configure(settings_path: Path, cortex_root: Path) -> None:
    if settings_path.exists():
        data = json.loads(settings_path.read_text(encoding="utf-8"))
    else:
        data = {}

    hooks = data.setdefault("hooks", {})
    session_start = hooks.setdefault("SessionStart", [])
    start_hooks = group(session_start, "")["hooks"]
    sync_command = (
        f"{shlex.quote(str(cortex_root / 'scripts/sync-claude-agents.sh'))} "
        ">/dev/null 2>&1 || true"
    )
    add_command(start_hooks, sync_command)

    session_end = hooks.setdefault("SessionEnd", [])
    end_hooks = group(session_end, "clear")["hooks"]
    remember_command = (
        f"python3 {shlex.quote(str(cortex_root / 'agent-workflows/pickup/scripts/session_state.py'))} "
        "remember"
    )
    add_command(end_hooks, remember_command)

    overrides = data.setdefault("skillOverrides", {})
    overrides["handoff"] = "user-invocable-only"
    overrides["pickup"] = "user-invocable-only"

    settings_path.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    settings_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--settings", type=Path, required=True)
    parser.add_argument("--cortex-root", type=Path, required=True)
    args = parser.parse_args()
    configure(args.settings.expanduser(), args.cortex_root.expanduser().resolve())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
