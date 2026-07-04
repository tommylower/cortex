---
name: merge-quiz
description: Before merging or deploying a diff the user didn't watch being written (delegated to Codex, parallel chats, long autonomous runs), build an HTML report explaining the change with context and intuition, plus a quiz the user must pass before merge. Prevents the user's mental model from drifting away from the codebase. Triggers on "quiz me", "merge quiz", "do i understand this diff".
---

delegated work creates a gap between what the codebase does and what the user thinks it does. close the gap before merge, not after the next incident.

## process

1. **read beyond the diff.** read the full diff, then the existing code paths it plugs into. much of the behavior lives in how new code interacts with old paths, which the diff alone doesn't show.

2. **build one html report** (render as an artifact or a local file the user can open). sections:
   - what changed and why, in prose, for someone who didn't watch it happen
   - how it interacts with existing behavior, the part invisible in the diff
   - risk surfaces: data flow, edge cases, deploy or migration implications
   - the quiz at the bottom

3. **write the quiz to bite.** 5 to 8 questions targeting what would actually hurt later: where data flows, what happens on the edge case, what breaks if a dependency changes, what the deploy implications are. no trivia, no "what file was edited".

4. **grade honestly.** wrong or fuzzy answers get an explanation plus a pointer into the code (file:line). merge only after a clean pass. a failed quiz is signal the report was insufficient, so improve the report and requiz on the missed areas.

## notes

- complement to grill-me: grill-me interviews the user about their plan before work. merge-quiz tests the user on the agent's work after.
- scale to the diff. a small delegated fix gets 3 questions inline, no html.
