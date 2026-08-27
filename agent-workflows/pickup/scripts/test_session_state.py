#!/usr/bin/env python3

from __future__ import annotations

import io
import json
import os
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch

import session_state


class SessionStateTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.config = Path(self.temporary.name) / "config"
        self.repo = Path(self.temporary.name) / "repo"
        self.repo.mkdir()
        self.transcript = Path(self.temporary.name) / "session.jsonl"

    def event(self, session_id: str = "session-1") -> dict[str, str]:
        return {
            "session_id": session_id,
            "transcript_path": str(self.transcript),
            "cwd": str(self.repo),
            "reason": "clear",
        }

    def remember(self, event: dict[str, str]) -> None:
        with patch.dict(os.environ, {"CLAUDE_CONFIG_DIR": str(self.config)}):
            with patch("sys.stdin", io.StringIO(json.dumps(event))):
                self.assertEqual(session_state.remember(), 0)

    def pickup(self) -> dict[str, object]:
        output = io.StringIO()
        with patch.dict(os.environ, {"CLAUDE_CONFIG_DIR": str(self.config)}):
            with redirect_stdout(output):
                self.assertEqual(session_state.pickup(str(self.repo), None), 0)
        return json.loads(output.getvalue())

    def test_recovers_latest_capsule_for_current_directory(self) -> None:
        capsule = "Continue in repo.\n\nNext:\n1. Run the tests."
        text = (
            f"Closeout: none\n{session_state.START_MARKER}\n"
            f"{capsule}\n{session_state.END_MARKER}"
        )
        payload = {
            "type": "assistant",
            "message": {"role": "assistant", "content": [{"type": "text", "text": text}]},
        }
        self.transcript.write_text(json.dumps(payload) + "\n", encoding="utf-8")
        self.remember(self.event())

        result = self.pickup()

        self.assertEqual(result["status"], "capsule")
        self.assertEqual(result["capsule"], capsule)

    def test_requests_summary_when_capsule_is_missing(self) -> None:
        self.transcript.write_text("", encoding="utf-8")
        self.remember(self.event())

        result = self.pickup()

        self.assertEqual(result["status"], "needs-summary")
        self.assertNotIn("capsule", result)

    def test_ignores_non_clear_session_end(self) -> None:
        event = self.event()
        event["reason"] = "other"
        self.remember(event)

        result = self.pickup()

        self.assertEqual(result["status"], "not-found")


if __name__ == "__main__":
    unittest.main()
