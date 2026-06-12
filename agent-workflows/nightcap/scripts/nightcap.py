#!/usr/bin/env python3
"""nightcap: a nightly journal of your agent sessions.

Reads recent Claude Code and Codex transcripts off disk, skips trivial
sessions, and writes one narrative first-person journal entry per substantial
session, like a handwritten end-of-day journal. Summaries are generated with
`claude -p` (haiku by default).

Run manually any time: nightcap.py [--days N] [--limit N] [--dry-run]

Personalization (name, voice, journal location, model) lives in a JSON config
at ~/.config/nightcap/config.json (override with --config or the
NIGHTCAP_CONFIG env var). Without a config you get a neutral first-person
voice and entries under ~/notes/agent-journal/.

State lives in <journal_dir>/.state.json so sessions are only journaled once;
failed summaries stay pending and retry on the next run.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

CLAUDE_PROJECTS = Path.home() / ".claude" / "projects"
CODEX_SESSIONS = Path.home() / ".codex" / "sessions"
DEFAULT_CONFIG_PATH = Path.home() / ".config" / "nightcap" / "config.json"
SENTINEL = "NIGHTCAP-SUMMARIZER"
LEGACY_SENTINEL = "JOURNAL-SWEEP-SUMMARIZER"  # pre-rename headless runs, keep filtered

DEFAULTS = {
    # where entries land: <journal_dir>/YYYY/YYYY-MM-DD-HHMM-<agent>-<project>.md
    "journal_dir": str(Path.home() / "notes" / "agent-journal"),
    # who the journal belongs to; used in the summarizer prompt
    "name": "the user",
    # label for the user's lines in the condensed transcript (e.g. your first name)
    "speaker_label": "USER",
    # stylistic voice rules appended to the summarizer prompt. structural rules
    # (first person, past tense, no headers/lists) are fixed; this is tone/style.
    "voice": "plain, understated prose. write the way someone jots a journal at the end of the day, not the way a report is written.",
    # model passed to `claude -p --model`
    "model": "haiku",
    # path to the claude CLI; empty string means: find it on PATH
    "claude_bin": "",
}

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
    LEGACY_SENTINEL,
)
CODEX_NOISE_PREFIXES = (
    "<user_instructions>",
    "<environment_context>",
    "<permissions instructions>",
    "<turn_aborted>",
    "<AGENTS.md",
    SENTINEL,
    LEGACY_SENTINEL,
)


def load_config(path: Path | None) -> dict:
    config = dict(DEFAULTS)
    env_path = os.environ.get("NIGHTCAP_CONFIG", "").strip()
    candidate = path or (Path(env_path) if env_path else DEFAULT_CONFIG_PATH)
    candidate = Path(candidate).expanduser()
    if candidate.is_file():
        try:
            loaded = json.loads(candidate.read_text())
            if isinstance(loaded, dict):
                config.update({k: v for k, v in loaded.items() if k in DEFAULTS and v})
        except (OSError, json.JSONDecodeError) as exc:
            sys.stderr.write(f"warning: could not read config {candidate}: {exc}\n")
    if not config["claude_bin"]:
        config["claude_bin"] = (
            shutil.which("claude") or str(Path.home() / ".local" / "bin" / "claude")
        )
    return config


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


def load_state(state_path: Path) -> dict:
    if state_path.exists():
        try:
            return json.loads(state_path.read_text())
        except (OSError, json.JSONDecodeError):
            pass
    return {"sessions": {}}


def save_state(state_path: Path, state: dict) -> None:
    state_path.parent.mkdir(parents=True, exist_ok=True)
    state_path.write_text(json.dumps(state, indent=1) + "\n")


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


def condense(session: Session, speaker_label: str) -> str:
    lines: list[str] = []
    for role, text in session.messages:
        if role == "user":
            lines.append(f"{speaker_label}: {truncate(text, USER_TRUNC)}")
        else:
            lines.append(f"{session.agent.upper()}: {truncate(text, ASSISTANT_TRUNC)}")
    text = "\n\n".join(lines)
    if len(text) > TOTAL_BUDGET:
        head = text[: int(TOTAL_BUDGET * 0.6)]
        tail = text[-int(TOTAL_BUDGET * 0.35) :]
        text = head + "\n\n[… middle of session trimmed …]\n\n" + tail
    return text


def summarize(session: Session, config: dict) -> str | None:
    name = config["name"]
    prompt = f"""{SENTINEL}

you are writing a journal entry for {name}, in their own voice, about one work session they had with {session.agent} in the project "{session.project}".

below is a condensed transcript. write 1 to 3 short paragraphs, first person as {name}, past tense, narrative storytelling, like they handwrote it at the end of the day. no headers, no lists, no preamble, no sign-off.

voice: {config["voice"]}

cover, woven together naturally, not as a checklist:
- their tone and energy in the session
- the type of thinking they were doing (debugging, designing, planning, exploring, deciding)
- what they were actually thinking about and trying to get done
- what kind of work they and {session.agent} did together and how the agent helped, e.g. "{session.agent} helped me think through..."

extrapolate the arc of the conversation but never invent specifics that are not in the transcript. output only the journal entry text.

--- transcript ---
{condense(session, config["speaker_label"])}
--- end transcript ---"""

    try:
        completed = subprocess.run(
            [config["claude_bin"], "-p", "--model", config["model"]],
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


def write_entry(session: Session, summary: str, journal_root: Path) -> Path:
    started = session.started or now_local()
    ended = session.ended or started
    day = started.strftime("%Y-%m-%d")
    year_dir = journal_root / started.strftime("%Y")
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
    parser.add_argument("--config", type=Path, default=None, help=f"config file (default {DEFAULT_CONFIG_PATH})")
    args = parser.parse_args()

    config = load_config(args.config)
    journal_root = Path(config["journal_dir"]).expanduser()
    state_path = journal_root / ".state.json"

    cutoff_ts = now_local().timestamp() - args.days * 86400
    state = load_state(state_path)
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
        summary = summarize(s, config)
        if summary is None:
            continue  # retry on the next sweep
        entry = write_entry(s, summary, journal_root)
        seen[s.session_id] = str(entry.relative_to(journal_root))
        save_state(state_path, state)
        written += 1
        print(entry)

    state["last_sweep"] = now_local().isoformat()
    save_state(state_path, state)
    print(f"journaled {written}/{len(candidates)} session(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
