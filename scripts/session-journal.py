#!/usr/bin/env python3
"""Runtime-aware session journal helpers for Claude and Codex."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


CORTEX_ROOT = Path(__file__).resolve().parents[1]
NOTES_ROOT = CORTEX_ROOT / "notes" / "agent-journal"
SESSIONS_ROOT = NOTES_ROOT / "sessions"
STATE_DIR = Path(os.environ.get("TMPDIR", "/tmp")) / "cortex-session-journal"
AUTO_START = "<!-- session-journal:auto:start -->"
AUTO_END = "<!-- session-journal:auto:end -->"
PLACEHOLDER_SUMMARIES = {
    "",
    "one-line summary not filled in yet",
    "Auto-captured session",
    "Auto-captured session in /",
}


@dataclass
class RuntimeCandidate:
    agent: str
    session_id: str
    workspace_hint: str
    updated_ts: float


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return re.sub(r"-{2,}", "-", value)


def now_local() -> datetime:
    return datetime.now().astimezone()


def format_timestamp(value: datetime | None = None) -> str:
    return (value or now_local()).strftime("%Y-%m-%d %H:%M:%S %Z")


def run_capture(args: list[str], cwd: Path | None = None) -> str:
    completed = subprocess.run(
        args,
        cwd=str(cwd) if cwd else None,
        capture_output=True,
        text=True,
        check=False,
    )
    return completed.stdout.strip() if completed.returncode == 0 else ""


def ancestor_pids() -> set[int]:
    pids: set[int] = set()
    current = os.getppid()
    while current > 1 and current not in pids:
        pids.add(current)
        try:
            parent = run_capture(["ps", "-o", "ppid=", "-p", str(current)])
        except PermissionError:
            break
        try:
            current = int(parent)
        except ValueError:
            break
    return pids


def normalize_path(raw: str | None) -> Path | None:
    if not raw:
        return None
    try:
        path = Path(raw).expanduser().resolve()
    except OSError:
        return None
    return path if path.exists() else None


def git_toplevel(path: Path) -> Path:
    if not path.exists():
        return path
    target = path if path.is_dir() else path.parent
    root = run_capture(["git", "-C", str(target), "rev-parse", "--show-toplevel"])
    return Path(root) if root else target


def select_workspace_root(*hints: str | None) -> Path:
    fallback_root: Path | None = None
    for raw in hints:
        path = normalize_path(raw)
        if path is None:
            continue
        root = git_toplevel(path)
        if root != Path("/"):
            return root
        fallback_root = root

    cwd_root = git_toplevel(Path.cwd())
    if cwd_root != Path("/"):
        return cwd_root

    return fallback_root or cwd_root


def read_claude_candidate() -> RuntimeCandidate | None:
    sessions_dir = Path.home() / ".claude" / "sessions"
    if not sessions_dir.exists():
        return None

    ancestors = ancestor_pids()
    best: tuple[int, float, RuntimeCandidate] | None = None
    for path in sessions_dir.glob("*.json"):
        try:
            data = json.loads(path.read_text())
        except (OSError, json.JSONDecodeError):
            continue
        session_id = str(data.get("sessionId") or "").strip()
        cwd = str(data.get("cwd") or "").strip()
        if not session_id:
            continue
        updated_ms = float(data.get("updatedAt") or path.stat().st_mtime * 1000)
        rank = 0 if int(data.get("pid") or 0) in ancestors else 1
        candidate = RuntimeCandidate(
            agent="Claude",
            session_id=session_id,
            workspace_hint=cwd,
            updated_ts=updated_ms / 1000,
        )
        marker = (rank, -candidate.updated_ts, candidate)
        if best is None or marker < best:
            best = marker
    return best[2] if best else None


def parse_codex_session(path: Path) -> RuntimeCandidate | None:
    session_id = ""
    cwd = ""
    try:
        with path.open() as handle:
            for index, line in enumerate(handle):
                if index > 40:
                    break
                try:
                    item = json.loads(line)
                except json.JSONDecodeError:
                    continue
                payload = item.get("payload", {})
                item_type = item.get("type")
                if item_type == "session_meta":
                    session_id = str(payload.get("id") or session_id).strip()
                    cwd = str(payload.get("cwd") or cwd).strip()
                elif item_type == "turn_context":
                    cwd = str(payload.get("cwd") or cwd).strip()
                if session_id and cwd:
                    break
    except OSError:
        return None

    if not session_id:
        return None

    return RuntimeCandidate(
        agent="Codex",
        session_id=session_id,
        workspace_hint=cwd,
        updated_ts=path.stat().st_mtime,
    )


def read_codex_candidate(thread_id: str | None) -> RuntimeCandidate | None:
    sessions_dir = Path.home() / ".codex" / "sessions"
    if not sessions_dir.exists():
        return None

    candidates: list[Path] = []
    if thread_id:
        candidates = list(sessions_dir.rglob(f"*{thread_id}*.jsonl"))
    if not candidates:
        all_paths = list(sessions_dir.rglob("*.jsonl"))
        candidates = sorted(all_paths, key=lambda path: path.stat().st_mtime, reverse=True)[:12]

    best: RuntimeCandidate | None = None
    for path in candidates:
        candidate = parse_codex_session(path)
        if candidate is None:
            continue
        if thread_id and candidate.session_id == thread_id:
            return candidate
        if best is None or candidate.updated_ts > best.updated_ts:
            best = candidate
    return best


def resolve_runtime(workspace_hint: str | None) -> dict[str, object]:
    explicit_session = os.environ.get("SESSION_JOURNAL_SESSION_ID", "").strip()
    explicit_agent = os.environ.get("SESSION_JOURNAL_AGENT", "").strip()
    claude_session = os.environ.get("CLAUDE_SESSION_ID", "").strip()
    codex_thread = os.environ.get("CODEX_THREAD_ID", "").strip()

    claude_candidate = read_claude_candidate()
    codex_candidate = read_codex_candidate(codex_thread or None)
    candidate: RuntimeCandidate | None = None

    if explicit_session:
        candidate = RuntimeCandidate(
            agent=explicit_agent or "Unknown",
            session_id=explicit_session,
            workspace_hint="",
            updated_ts=now_local().timestamp(),
        )
    elif claude_session:
        if claude_candidate and claude_candidate.session_id == claude_session:
            candidate = claude_candidate
        else:
            candidate = RuntimeCandidate(
                agent="Claude",
                session_id=claude_session,
                workspace_hint="",
                updated_ts=now_local().timestamp(),
            )
    elif codex_thread:
        if codex_candidate and codex_candidate.session_id == codex_thread:
            candidate = codex_candidate
        else:
            candidate = RuntimeCandidate(
                agent="Codex",
                session_id=codex_thread,
                workspace_hint="",
                updated_ts=now_local().timestamp(),
            )
    else:
        options = [item for item in (claude_candidate, codex_candidate) if item is not None]
        if options:
            candidate = max(options, key=lambda item: item.updated_ts)

    workspace_root = select_workspace_root(
        workspace_hint,
        os.environ.get("CLAUDE_PROJECT_DIR"),
        os.environ.get("CLAUDE_CWD"),
        os.environ.get("CODEX_PROJECT_ROOT"),
        os.environ.get("CODEX_CWD"),
        candidate.workspace_hint if candidate else None,
    )

    agent_name = candidate.agent if candidate else "Unknown"
    session_id = candidate.session_id if candidate else ""
    if not session_id:
        session_id = hashlib.sha1(str(workspace_root).encode()).hexdigest()

    return {
        "agent_name": agent_name,
        "session_id": session_id,
        "workspace_root": workspace_root,
        "workspace_name": workspace_root.name or "/",
        "workspace_slug": slugify(workspace_root.name or "root"),
        "updated_ts": candidate.updated_ts if candidate else now_local().timestamp(),
    }


def git_branch(workspace_root: Path) -> str:
    branch = run_capture(["git", "-C", str(workspace_root), "branch", "--show-current"])
    return branch or "no-git-branch"


def default_work_summary(workspace_name: str) -> str:
    if workspace_name and workspace_name != "/":
        return f"Auto-captured session in {workspace_name}"
    return "Auto-captured session"


def state_key_for_session(agent_name: str, session_id: str) -> str:
    return f"session:{agent_name.lower()}:{session_id}"


def state_key_for_workspace(workspace_root: Path) -> str:
    return f"workspace:{workspace_root}"


def state_path_for_key(key: str) -> Path:
    digest = hashlib.sha1(key.encode()).hexdigest()
    return STATE_DIR / f"{digest}.json"


def candidate_state_keys(context: dict[str, object], workspace_hint: str | None) -> list[str]:
    workspace_root = context["workspace_root"]
    agent_name = str(context["agent_name"])
    session_id = str(context["session_id"])
    keys = [state_key_for_session(agent_name, session_id), state_key_for_workspace(workspace_root)]
    raw_hint = normalize_path(workspace_hint) if workspace_hint else None
    if raw_hint is not None:
        keys.append(state_key_for_workspace(git_toplevel(raw_hint)))

    deduped: list[str] = []
    for key in keys:
        if key not in deduped:
            deduped.append(key)
    return deduped


def load_state(context: dict[str, object], workspace_hint: str | None) -> tuple[Path | None, dict[str, object] | None]:
    for key in candidate_state_keys(context, workspace_hint):
        path = state_path_for_key(key)
        if not path.exists():
            continue
        try:
            return path, json.loads(path.read_text())
        except (OSError, json.JSONDecodeError):
            continue
    return None, None


def write_state(path: Path, data: dict[str, object]) -> None:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n")


def default_auto_block(context: dict[str, object], status: str, branch: str, last_updated: str, changed_files: list[str]) -> str:
    workspace_root = context["workspace_root"]
    lines = [
        AUTO_START,
        f"- Status: {status}",
        f"- Last updated: {last_updated}",
        f"- Workspace: `{workspace_root}`",
        f"- Git branch: `{branch}`",
    ]
    if status == "session started":
        lines.append("- Git status snapshot: not captured yet")
    else:
        git_status = "clean" if changed_files == ["None at stop time."] else f"dirty ({len(changed_files)} path(s))"
        lines.append(f"- Git status snapshot: {git_status}")
    lines.append("- Changed files:")
    for item in changed_files:
        lines.append(f"  - {item}")
    lines.append(AUTO_END)
    return "\n".join(lines)


def render_note(context: dict[str, object], started_at: str) -> str:
    branch = git_branch(context["workspace_root"])
    work_summary = default_work_summary(str(context["workspace_name"]))
    auto_block = default_auto_block(
        context=context,
        status="session started",
        branch=branch,
        last_updated=started_at,
        changed_files=["None yet."],
    )
    date_ymd = started_at.split(" ", 1)[0]
    return "\n".join(
        [
            f"# Session: {context['workspace_name']}",
            "",
            f"- Date: {date_ymd}",
            f"- Agent: {context['agent_name']}",
            f"- Session ID: `{context['session_id']}`",
            f"- Started: {started_at}",
            f"- Workspace: `{context['workspace_root']}`",
            f"- Git branch: `{branch}`",
            f"- Work summary: {work_summary}",
            "",
            "## Summary",
            "",
            "Auto-created from the active runtime session. Ask the agent to finalize this note with `session-journal` if you want a narrative summary, decisions, and lessons learned.",
            "",
            "## Auto Capture",
            "",
            auto_block,
            "",
            "## Decisions",
            "",
            "- None recorded yet.",
            "",
            "## Reusable Lessons",
            "",
            "- None recorded yet.",
            "",
            "## Open Loops",
            "",
            "- None recorded yet.",
            "",
            "## Related Files",
            "",
            "- None recorded yet.",
            "",
        ]
    )


def replace_line(text: str, prefix: str, replacement: str) -> str:
    pattern = re.compile(rf"(?m)^{re.escape(prefix)}.*$")
    if pattern.search(text):
        return pattern.sub(replacement, text, count=1)
    return text.rstrip() + "\n" + replacement + "\n"


def maybe_rename_note(note_path: Path, workspace_slug: str) -> Path:
    match = re.match(r"^(\d{4}-\d{2}-\d{2}-\d{6})-(.*)\.md$", note_path.name)
    if not match or not workspace_slug or match.group(2):
        return note_path

    target = note_path.with_name(f"{match.group(1)}-{workspace_slug}.md")
    if target.exists():
        return note_path
    note_path.rename(target)
    return target


def update_note_metadata(note_path: Path, context: dict[str, object], started_at: str) -> Path:
    note_path = maybe_rename_note(note_path, str(context["workspace_slug"]))
    text = note_path.read_text()
    branch = git_branch(context["workspace_root"])

    text = replace_line(text, "# Session: ", f"# Session: {context['workspace_name']}")
    text = replace_line(text, "- Date: ", f"- Date: {started_at.split(' ', 1)[0]}")
    text = replace_line(text, "- Agent: ", f"- Agent: {context['agent_name']}")
    text = replace_line(text, "- Session ID: ", f"- Session ID: `{context['session_id']}`")
    text = replace_line(text, "- Started: ", f"- Started: {started_at}")
    text = replace_line(text, "- Workspace: ", f"- Workspace: `{context['workspace_root']}`")
    text = replace_line(text, "- Git branch: ", f"- Git branch: `{branch}`")

    summary_match = re.search(r"(?m)^- Work summary: (.*)$", text)
    current_summary = summary_match.group(1).strip() if summary_match else ""
    if current_summary in PLACEHOLDER_SUMMARIES or current_summary.startswith("Auto-captured session"):
        text = replace_line(
            text,
            "- Work summary: ",
            f"- Work summary: {default_work_summary(str(context['workspace_name']))}",
        )

    note_path.write_text(text)
    return note_path


def git_changed_files(workspace_root: Path) -> list[str]:
    if not run_capture(["git", "-C", str(workspace_root), "rev-parse", "--show-toplevel"]):
        return ["None at stop time."]

    status_output = run_capture(
        ["git", "-C", str(workspace_root), "status", "--short", "--untracked-files=normal"]
    )
    if not status_output:
        return ["None at stop time."]
    return [f"`{line}`" for line in status_output.splitlines() if line.strip()]


def replace_auto_block(text: str, new_block: str) -> str:
    pattern = re.compile(rf"{re.escape(AUTO_START)}.*?{re.escape(AUTO_END)}", re.S)
    if pattern.search(text):
        return pattern.sub(new_block, text, count=1)
    return text.rstrip() + "\n\n## Auto Capture\n\n" + new_block + "\n"


def refresh_auto_capture(note_path: Path, context: dict[str, object], started_at: str) -> Path:
    note_path = update_note_metadata(note_path, context, started_at)
    branch = git_branch(context["workspace_root"])
    changed_files = git_changed_files(context["workspace_root"])
    auto_block = default_auto_block(
        context=context,
        status="auto-updated",
        branch=branch,
        last_updated=format_timestamp(),
        changed_files=changed_files,
    )
    text = note_path.read_text()
    note_path.write_text(replace_auto_block(text, auto_block))
    return note_path


def parse_note(path: Path) -> dict[str, object]:
    text = path.read_text()

    def pick(pattern: str, default: str = "") -> str:
        match = re.search(pattern, text, re.M)
        return match.group(1).strip() if match else default

    session_id = pick(r"^- Session ID: `?(.*?)`?$")
    agent = pick(r"^- Agent: (.*)$", "Unknown").title()
    workspace = pick(r"^- Workspace: `?(.*?)`?$", "")
    work_summary = pick(r"^- Work summary: (.*)$", "")
    started = pick(r"^- Started: (.*)$", "")
    date_value = pick(r"^- Date: (.*)$", "")
    note_type = "auto-capture" if re.match(r"^\d{4}-\d{2}-\d{2}-\d{6}-", path.name) else "curated"
    workspace_name = Path(workspace).name or workspace or "/"
    return {
        "path": path,
        "relative_path": path.relative_to(NOTES_ROOT).as_posix(),
        "session_key": session_id or path.stem,
        "agent": agent,
        "workspace": workspace,
        "workspace_name": workspace_name,
        "work_summary": work_summary,
        "started": started,
        "date": date_value,
        "note_type": note_type,
        "resolved": agent.lower() != "unknown" and workspace not in {"", "/"},
        "sort_ts": path.stat().st_mtime,
    }


def rebuild_index() -> None:
    NOTES_ROOT.mkdir(parents=True, exist_ok=True)
    SESSIONS_ROOT.mkdir(parents=True, exist_ok=True)

    note_files = sorted(
        path
        for path in SESSIONS_ROOT.glob("*/*.md")
        if path.name != "README.md"
    )
    notes = [parse_note(path) for path in note_files]

    unique_sessions: dict[str, dict[str, object]] = {}
    for note in notes:
        current = unique_sessions.get(note["session_key"])
        if current is None or note["sort_ts"] > current["sort_ts"]:
            unique_sessions[note["session_key"]] = note

    unique_list = sorted(unique_sessions.values(), key=lambda note: note["sort_ts"], reverse=True)
    today = now_local().strftime("%Y-%m-%d")
    auto_count = sum(1 for note in notes if note["note_type"] == "auto-capture")
    curated_count = len(notes) - auto_count
    resolved_count = sum(1 for note in unique_list if note["resolved"])
    today_count = sum(1 for note in unique_list if str(note["date"]) == today)
    agent_counts: dict[str, int] = {}
    workspaces = set()
    for note in unique_list:
        agent = str(note["agent"])
        agent_counts[agent] = agent_counts.get(agent, 0) + 1
        if note["workspace"] not in {"", "/"}:
            workspaces.add(str(note["workspace"]))

    resolved_notes = [note for note in unique_list if note["resolved"]]
    unresolved_notes = [note for note in unique_list if not note["resolved"]]

    latest_lines = []
    for note in resolved_notes[:20]:
        summary = str(note["work_summary"]).strip() or "No summary yet"
        if summary in PLACEHOLDER_SUMMARIES:
            summary = "No summary yet"
        latest_lines.append(
            f"- {note['started'] or note['date']} | {note['agent']} | {note['workspace_name']} | {summary} | [{note['path'].name}]({note['relative_path']})"
        )

    unresolved_lines = []
    for note in unresolved_notes[:10]:
        summary = str(note["work_summary"]).strip() or "No summary yet"
        if summary in PLACEHOLDER_SUMMARIES:
            summary = "No summary yet"
        unresolved_lines.append(
            f"- {note['started'] or note['date']} | {note['agent']} | {note['workspace_name']} | {summary} | [{note['path'].name}]({note['relative_path']})"
        )

    agent_stats = ", ".join(
        f"{agent} {count}" for agent, count in sorted(agent_counts.items(), key=lambda item: item[0].lower())
    ) or "None yet"

    lines = [
        "# Agent Journal",
        "",
        "> Auto-generated local session index. See `OVERVIEW.md` for the stable workflow docs.",
        "",
        f"- Last rebuilt: {format_timestamp()}",
        f"- Unique sessions: {len(unique_list)}",
        f"- Note files: {len(notes)}",
        f"- Sessions today ({today}): {today_count}",
        f"- Resolved sessions: {resolved_count}",
        f"- Unresolved legacy sessions: {len(unique_list) - resolved_count}",
        f"- Auto-capture note files: {auto_count}",
        f"- Curated note files: {curated_count}",
        f"- Agents: {agent_stats}",
        f"- Unique workspaces: {len(workspaces)}",
        "",
        "## Latest Sessions",
        "",
    ]

    if latest_lines:
        lines.extend(latest_lines)
    else:
        lines.append("- No resolved sessions yet.")

    if unresolved_lines:
        lines.extend(
            [
                "",
                "## Unresolved Legacy Sessions",
                "",
            ]
        )
        lines.extend(unresolved_lines)

    lines.extend(
        [
            "",
            "## Notes",
            "",
        ]
    )

    if unresolved_notes:
        lines.append("- `Unknown` or `/` entries are older low-signal captures from before the runtime-resolution fix.")
    lines.append("- Timestamped notes are auto-capture scratch notes. Curated notes omit the `HHMMSS` segment.")
    lines.append("")

    (NOTES_ROOT / "README.md").write_text("\n".join(lines))


def command_start(workspace_hint: str | None) -> int:
    context = resolve_runtime(workspace_hint)
    state_path, state = load_state(context, workspace_hint)

    if state is not None:
        note_path = Path(str(state["note_path"]))
        if note_path.exists():
            note_path = update_note_metadata(note_path, context, str(state["started_at"]))
            state["note_path"] = str(note_path)
            primary_key = state_key_for_session(str(context["agent_name"]), str(context["session_id"]))
            target_state_path = state_path_for_key(primary_key)
            write_state(target_state_path, state)
            if state_path and state_path != target_state_path and state_path.exists():
                state_path.unlink()
            rebuild_index()
            print(note_path)
            return 0

    started_at = format_timestamp()
    year = started_at[:4]
    time_slug = now_local().strftime("%H%M%S")
    note_dir = SESSIONS_ROOT / year
    note_dir.mkdir(parents=True, exist_ok=True)
    note_path = note_dir / f"{started_at.split(' ', 1)[0]}-{time_slug}-{context['workspace_slug']}.md"
    note_path.write_text(render_note(context, started_at))

    state = {
        "note_path": str(note_path),
        "started_at": started_at,
    }
    write_state(state_path_for_key(state_key_for_session(str(context["agent_name"]), str(context["session_id"]))), state)
    rebuild_index()
    print(note_path)
    return 0


def command_stop(workspace_hint: str | None) -> int:
    context = resolve_runtime(workspace_hint)
    state_path, state = load_state(context, workspace_hint)
    if state is None:
        rebuild_index()
        return 0

    note_path = Path(str(state["note_path"]))
    if not note_path.exists():
        rebuild_index()
        return 0

    note_path = refresh_auto_capture(note_path, context, str(state["started_at"]))
    state["note_path"] = str(note_path)
    primary_key = state_key_for_session(str(context["agent_name"]), str(context["session_id"]))
    target_state_path = state_path_for_key(primary_key)
    write_state(target_state_path, state)
    if state_path and state_path != target_state_path and state_path.exists():
        state_path.unlink()
    rebuild_index()
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Maintain cortex session journal notes.")
    parser.add_argument("command", choices=["start", "stop", "index"])
    parser.add_argument("workspace_hint", nargs="?", default=None)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if args.command == "start":
        return command_start(args.workspace_hint)
    if args.command == "stop":
        return command_stop(args.workspace_hint)
    rebuild_index()
    return 0


if __name__ == "__main__":
    sys.exit(main())
