#!/usr/bin/env python3
"""Nightly journal sweep.

Reads recent Claude Code and Codex transcripts, skips trivial sessions, and
writes one narrative journal entry per substantial session to
notes/journal/YYYY/. Each entry: date, agent, link back to the chat, and a
first-person summary written in Tommy's voice via `claude -p` (haiku).

Run manually any time: scripts/journal-sweep.py [--days N] [--limit N] [--dry-run]
State lives in notes/journal/.state.json so sessions are only journaled once.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

CORTEX_ROOT = Path(__file__).resolve().parents[1]
JOURNAL_ROOT = CORTEX_ROOT / "notes" / "journal"
STATE_PATH = JOURNAL_ROOT / ".state.json"
CLAUDE_PROJECTS = Path.home() / ".claude" / "projects"
CODEX_SESSIONS = Path.home() / ".codex" / "sessions"
CLAUDE_BIN = str(Path.home() / ".local" / "bin" / "claude")
SUMMARY_MODEL = "haiku"
SENTINEL = "JOURNAL-SWEEP-SUMMARIZER"

# condensation budgets
USER_TRUNC = 700
ASSISTANT_TRUNC = 400
TOTAL_BUDGET = 24000

# substance thresholds: skip one-shot/trivial sessions
MIN_USER_MSGS = 2
MIN_USER_CHARS = 200
SOLO_MSG_MIN_CHARS = 1500

CLAUDE_NOISE_PREFIXES = (
    "<command-name>",
    "<local-command",
    "<bash-input>",
    "<bash-stdout>",
    "Caveat: The messages below",
    "[Request interrupted",
    "<system-reminder>",
    SENTINEL,
)
CODEX_NOISE_PREFIXES = (
    "<user_instructions>",
    "<environment_context>",
    "<permissions instructions>",
    "<turn_aborted>",
    "<AGENTS.md",
    SENTINEL,
)


def now_local() -> datetime:
    return datetime.now().astimezone()


def parse_iso(ts: str) -> datetime | None:
    if not ts:
        return None
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone()
    except ValueError:
        return None


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return re.sub(r"-{2,}", "-", value)[:48] or "session"


def truncate(text: str, limit: int) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + " […]"


def load_state() -> dict:
    if STATE_PATH.exists():
        try:
            return json.loads(STATE_PATH.read_text())
        except (OSError, json.JSONDecodeError):
            pass
    return {"sessions": {}}


def save_state(state: dict) -> None:
    JOURNAL_ROOT.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=1) + "\n")


# ---------------------------------------------------------------- transcripts


class Session:
    def __init__(self, agent: str, session_id: str, path: Path):
        self.agent = agent  # "Claude Code" | "Codex"
        self.session_id = session_id
        self.path = path
        self.cwd = ""
        self.title = ""
        self.model = ""
        self.messages: list[tuple[str, str]] = []  # (role, text)
        self.started: datetime | None = None
        self.ended: datetime | None = None

    @property
    def project(self) -> str:
        return Path(self.cwd).name if self.cwd else "unknown"

    @property
    def user_chars(self) -> int:
        return sum(len(t) for r, t in self.messages if r == "user")

    @property
    def user_msgs(self) -> int:
        return sum(1 for r, t in self.messages if r == "user")

    def substantial(self) -> bool:
        if self.user_msgs >= MIN_USER_MSGS and self.user_chars >= MIN_USER_CHARS:
            return True
        return self.user_msgs >= 1 and self.user_chars >= SOLO_MSG_MIN_CHARS

    def resume_hint(self) -> str:
        if self.agent == "Codex":
            return f"codex resume {self.session_id}"
        return f"claude --resume {self.session_id}  (from {self.cwd or '?'})"


def claude_text_blocks(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = [b.get("text", "") for b in content if isinstance(b, dict) and b.get("type") == "text"]
        return "\n".join(p for p in parts if p)
    return ""


def parse_claude_session(path: Path) -> Session | None:
    session = Session("Claude Code", path.stem, path)
    try:
        with path.open() as handle:
            for line in handle:
                try:
                    d = json.loads(line)
                except json.JSONDecodeError:
                    continue
                kind = d.get("type")
                if kind == "ai-title":
                    session.title = str(d.get("aiTitle") or session.title)
                    continue
                if kind not in ("user", "assistant") or d.get("isSidechain"):
                    continue
                ts = parse_iso(str(d.get("timestamp") or ""))
                if ts:
                    session.started = session.started or ts
                    session.ended = ts
                session.cwd = session.cwd or str(d.get("cwd") or "")
                msg = d.get("message") or {}
                text = claude_text_blocks(msg.get("content"))
                if not text or not text.strip():
                    continue
                text = text.strip()
                if kind == "user":
                    if text.startswith(CLAUDE_NOISE_PREFIXES):
                        continue
                    session.messages.append(("user", text))
                else:
                    session.model = str(msg.get("model") or session.model)
                    session.messages.append(("assistant", text))
    except OSError:
        return None
    return session if session.messages else None


def parse_codex_session(path: Path) -> Session | None:
    session = Session("Codex", path.stem, path)
    try:
        with path.open() as handle:
            for line in handle:
                try:
                    d = json.loads(line)
                except json.JSONDecodeError:
                    continue
                kind = d.get("type")
                payload = d.get("payload") or {}
                ts = parse_iso(str(d.get("timestamp") or ""))
                if kind == "session_meta":
                    session.session_id = str(payload.get("id") or session.session_id)
                    session.cwd = str(payload.get("cwd") or session.cwd)
                    if ts:
                        session.started = ts
                    continue
                if kind == "turn_context":
                    session.cwd = session.cwd or str(payload.get("cwd") or "")
                    session.model = str(payload.get("model") or session.model)
                    continue
                if kind != "response_item" or payload.get("type") != "message":
                    continue
                role = payload.get("role")
                if role not in ("user", "assistant"):
                    continue
                parts = [
                    c.get("text", "")
                    for c in payload.get("content") or []
                    if isinstance(c, dict) and c.get("type") in ("input_text", "output_text")
                ]
                text = "\n".join(p for p in parts if p).strip()
                if not text:
                    continue
                if role == "user" and text.startswith(CODEX_NOISE_PREFIXES):
                    continue
                if ts:
                    session.started = session.started or ts
                    session.ended = ts
                session.messages.append((role, text))
    except OSError:
        return None
    return session if session.messages else None


def discover(cutoff_ts: float) -> list[Session]:
    sessions: list[Session] = []
    if CLAUDE_PROJECTS.exists():
        for path in CLAUDE_PROJECTS.glob("*/*.jsonl"):
            if path.name.startswith("agent-"):
                continue  # subagent transcripts
            if path.stat().st_mtime < cutoff_ts:
                continue
            parsed = parse_claude_session(path)
            if parsed:
                sessions.append(parsed)
    if CODEX_SESSIONS.exists():
        for path in CODEX_SESSIONS.rglob("rollout-*.jsonl"):
            if path.stat().st_mtime < cutoff_ts:
                continue
            parsed = parse_codex_session(path)
            if parsed:
                sessions.append(parsed)
    sessions.sort(key=lambda s: s.started or now_local())
    return sessions


# --------------------------------------------------------------- summarizing


def condense(session: Session) -> str:
    lines: list[str] = []
    for role, text in session.messages:
        if role == "user":
            lines.append(f"TOMMY: {truncate(text, USER_TRUNC)}")
        else:
            lines.append(f"{session.agent.upper()}: {truncate(text, ASSISTANT_TRUNC)}")
    text = "\n\n".join(lines)
    if len(text) > TOTAL_BUDGET:
        head = text[: int(TOTAL_BUDGET * 0.6)]
        tail = text[-int(TOTAL_BUDGET * 0.35) :]
        text = head + "\n\n[… middle of session trimmed …]\n\n" + tail
    return text


def summarize(session: Session) -> str | None:
    prompt = f"""{SENTINEL}

you are writing a journal entry for Tommy Lower, in his own voice, about one work session he had with {session.agent} in the project "{session.project}".

below is a condensed transcript. write 1 to 3 short paragraphs, first person as Tommy, past tense, narrative storytelling, like he handwrote it at the end of the day. strictly lowercase except proper nouns and project names. the pronoun "i" stays lowercase. never start a sentence with a capital letter unless it begins with a proper noun. never use em dashes, use periods or commas instead. no headers, no lists, no preamble, no sign-off.

cover, woven together naturally, not as a checklist:
- his tone and energy in the session
- the type of thinking he was doing (debugging, designing, planning, exploring, deciding)
- what he was actually thinking about and trying to get done
- what kind of work he and {session.agent} did together and how the agent helped, e.g. "{session.agent} helped me think through..."

extrapolate the arc of the conversation but never invent specifics that are not in the transcript. output only the journal entry text.

--- transcript ---
{condense(session)}
--- end transcript ---"""

    try:
        completed = subprocess.run(
            [CLAUDE_BIN, "-p", "--model", SUMMARY_MODEL],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=300,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    if completed.returncode != 0:
        sys.stderr.write(f"summarizer failed for {session.session_id}: {completed.stderr[:300]}\n")
        return None
    summary = completed.stdout.strip()
    return summary or None


# -------------------------------------------------------------------- output


def write_entry(session: Session, summary: str) -> Path:
    started = session.started or now_local()
    ended = session.ended or started
    day = started.strftime("%Y-%m-%d")
    year_dir = JOURNAL_ROOT / started.strftime("%Y")
    year_dir.mkdir(parents=True, exist_ok=True)

    agent_slug = "claude" if session.agent == "Claude Code" else "codex"
    name = f"{day}-{started.strftime('%H%M')}-{agent_slug}-{slugify(session.project)}.md"
    path = year_dir / name

    title = session.title or session.project
    span = f"{started.strftime('%H:%M')} to {ended.strftime('%H:%M')}"
    agent_line = session.agent + (f" ({session.model})" if session.model else "")

    body = "\n".join(
        [
            f"# {day} — {title}",
            "",
            f"- date: {day}, {span}",
            f"- agent: {agent_line}",
            f"- project: `{session.cwd or 'unknown'}`",
            f"- chat: `{session.resume_hint()}`",
            f"- transcript: `{session.path}`",
            "",
            summary,
            "",
        ]
    )
    path.write_text(body)
    return path


# ---------------------------------------------------------------------- main


def main() -> int:
    parser = argparse.ArgumentParser(description="Summarize recent agent sessions into journal entries.")
    parser.add_argument("--days", type=float, default=3.0, help="look back this many days (default 3)")
    parser.add_argument("--limit", type=int, default=0, help="max entries to write this run (0 = no limit)")
    parser.add_argument("--dry-run", action="store_true", help="list what would be journaled, write nothing")
    args = parser.parse_args()

    cutoff_ts = now_local().timestamp() - args.days * 86400
    state = load_state()
    seen = state.setdefault("sessions", {})

    candidates = [
        s
        for s in discover(cutoff_ts)
        if s.session_id not in seen and s.substantial()
    ]
    if args.limit:
        candidates = candidates[: args.limit]

    if args.dry_run:
        for s in candidates:
            when = s.started.strftime("%Y-%m-%d %H:%M") if s.started else "?"
            print(f"would journal: {when}  {s.agent:<11}  {s.project:<32}  msgs={s.user_msgs}  {s.path.name}")
        print(f"{len(candidates)} session(s) pending")
        return 0

    written = 0
    for s in candidates:
        summary = summarize(s)
        if summary is None:
            continue  # retry on the next sweep
        entry = write_entry(s, summary)
        seen[s.session_id] = str(entry.relative_to(JOURNAL_ROOT))
        save_state(state)
        written += 1
        print(entry)

    state["last_sweep"] = now_local().isoformat()
    save_state(state)
    print(f"journaled {written}/{len(candidates)} session(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
