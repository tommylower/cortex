#!/usr/bin/env python3
"""Record cleared Claude sessions and recover compact handoff capsules."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import tempfile
from pathlib import Path
from typing import Any


START_MARKER = "<!-- cortex-handoff:start -->"
END_MARKER = "<!-- cortex-handoff:end -->"
SAFE_ID = re.compile(r"^[A-Za-z0-9._-]+$")


def config_dir() -> Path:
    configured = os.environ.get("CLAUDE_CONFIG_DIR")
    return Path(configured).expanduser() if configured else Path.home() / ".claude"


def state_dir() -> Path:
    path = config_dir() / "session-pickup" / "cleared"
    path.mkdir(mode=0o700, parents=True, exist_ok=True)
    return path


def atomic_write_json(path: Path, payload: dict[str, Any]) -> None:
    with tempfile.NamedTemporaryFile(
        mode="w", encoding="utf-8", dir=path.parent, delete=False
    ) as handle:
        json.dump(payload, handle, indent=2)
        handle.write("\n")
        temp_path = Path(handle.name)
    temp_path.chmod(0o600)
    temp_path.replace(path)


def record_name(session_id: str) -> str:
    if not SAFE_ID.fullmatch(session_id):
        raise ValueError("session_id contains unsupported characters")
    return f"{session_id}.json"


def remember() -> int:
    try:
        event = json.load(sys.stdin)
    except (json.JSONDecodeError, OSError) as exc:
        print(f"invalid hook input: {exc}", file=sys.stderr)
        return 2

    if event.get("reason") != "clear":
        return 0

    required = ("session_id", "transcript_path", "cwd")
    if any(not isinstance(event.get(key), str) or not event[key] for key in required):
        print("hook input is missing session_id, transcript_path, or cwd", file=sys.stderr)
        return 2

    try:
        destination = state_dir() / record_name(event["session_id"])
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    record = {
        "session_id": event["session_id"],
        "transcript_path": str(Path(event["transcript_path"]).expanduser()),
        "cwd": str(Path(event["cwd"]).expanduser().resolve()),
        "cleared_at": dt.datetime.now(dt.timezone.utc).isoformat(),
    }
    atomic_write_json(destination, record)
    return 0


def load_records() -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for path in state_dir().glob("*.json"):
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        if isinstance(payload, dict):
            records.append(payload)
    return records


def choose_record(cwd: str | None, session_id: str | None) -> dict[str, Any] | None:
    records = load_records()
    if session_id:
        matches = [record for record in records if record.get("session_id") == session_id]
    else:
        target_cwd = str(Path(cwd or os.getcwd()).expanduser().resolve())
        matches = [record for record in records if record.get("cwd") == target_cwd]
    return max(matches, key=lambda item: item.get("cleared_at", ""), default=None)


def text_blocks(payload: dict[str, Any]) -> list[str]:
    if payload.get("type") != "assistant":
        return []
    message = payload.get("message")
    if not isinstance(message, dict):
        return []
    content = message.get("content")
    if isinstance(content, str):
        return [content]
    if not isinstance(content, list):
        return []
    return [
        block["text"]
        for block in content
        if isinstance(block, dict)
        and block.get("type") == "text"
        and isinstance(block.get("text"), str)
    ]


def extract_capsule(transcript_path: str) -> str | None:
    path = Path(transcript_path).expanduser()
    try:
        lines = path.open(encoding="utf-8")
    except OSError:
        return None

    latest: str | None = None
    with lines:
        for line in lines:
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                continue
            if not isinstance(payload, dict):
                continue
            for text in text_blocks(payload):
                start = text.find(START_MARKER)
                end = text.find(END_MARKER, start + len(START_MARKER))
                if start >= 0 and end >= 0:
                    latest = text[start + len(START_MARKER) : end].strip()
    return latest


def pickup(cwd: str | None, session_id: str | None) -> int:
    record = choose_record(cwd, session_id)
    if record is None:
        print(json.dumps({"status": "not-found"}))
        return 0

    capsule = extract_capsule(str(record.get("transcript_path", "")))
    result = {"status": "capsule" if capsule else "needs-summary", "session": record}
    if capsule:
        result["capsule"] = capsule
    print(json.dumps(result, indent=2))
    return 0


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    commands = root.add_subparsers(dest="command", required=True)
    commands.add_parser("remember", help="record a SessionEnd hook event from stdin")
    pickup_parser = commands.add_parser("pickup", help="find a cleared session")
    pickup_parser.add_argument("--cwd")
    pickup_parser.add_argument("--session-id")
    return root


def main() -> int:
    args = parser().parse_args()
    if args.command == "remember":
        return remember()
    return pickup(args.cwd, args.session_id)


if __name__ == "__main__":
    raise SystemExit(main())
