---
name: designing-loops
description: Design agent loops — pick the loop primitive that fits a task and define its stop condition. Use when the user wants recurring or automated agent work, wants an agent to keep iterating until done, asks which of /goal, /loop, or /schedule to use, or a running loop needs a turn cap, stop condition, or token budget. For prompting one big Fable build loop, see fable-prompting; for multi-agent review loops, see agent-swarm.
author: Anthropic, Claude Code team (https://claude.com/blog/getting-started-with-loops)
---

# designing loops

A loop is an agent repeating cycles of work until a stop condition is met. Each loop type is
defined by **what you hand off** to the agent. Most tasks need no loop at all: start with the
simplest primitive that fits and escalate only when it stalls.

## pick the loop

| loop | you hand off | use when | primitive |
|---|---|---|---|
| turn-based | the check | you're exploring or deciding | a plain prompt + verification skills |
| goal-based | the stop condition | you know what done looks like | `/goal` |
| time-based | the trigger | the work happens outside the session, on a schedule | `/loop`, `/schedule` |
| proactive | the prompt | the work is recurring and well-defined | all of the above + workflows + auto mode |

Route with the table, then follow the matching section. **Done when:** the task is running on
one primitive with an explicit stop condition and usage bound from its section.

## turn-based: hand off the check

Every prompt already runs one loop: gather context, act, verify, respond. You direct each turn.

- Stops when: the agent judges the task complete or needs input.
- Improve it by encoding your manual checks as a verification skill (with the tools or
  connectors to see, measure, or interact with the result) so the agent closes more of the
  loop itself. The more quantitative the check, the better the agent self-verifies.
- Bound usage by: specific prompts and better verification, reducing turns.

## goal-based: hand off the stop condition

`/goal` keeps the agent iterating: each time it tries to stop, an evaluator checks your
condition and sends it back until the goal is met or a turn cap is hit.

```
/goal get the homepage Lighthouse score to 90 or above, stop after 5 tries.
```

- Deterministic criteria work best: tests passing, a score threshold. A vague criterion lets
  the agent settle for its own idea of good enough. To design a hard self-checkable bar (and
  keep the builder from grading itself), use `fable-prompting`.
- Bound usage by: always naming a turn cap ("stop after 5 tries").

## time-based: hand off the trigger

For recurring work, or an external system you can only poll (a PR receiving reviews, CI, a
queue), re-run a prompt on an interval and react to what changed.

```
/loop 5m check my PR, address review comments, and fix failing CI
```

- `/loop` runs on your machine and dies with it; `/schedule` moves the routine to the cloud.
- Stops when: you cancel it, or the work completes (PR merged, queue empty).
- Bound usage by: matching the interval to how often the watched thing actually changes, or
  reacting to events instead of time.

## proactive: hand off the prompt

Compose the primitives into a standing routine with no human in real time: `/schedule`
triggers it, `/goal` defines done, skills define how to verify, workflows orchestrate the
per-item agents, auto mode removes permission stops.

```
/schedule every hour: check the project-feedback channel for bug reports.
/goal: don't stop until every report found this run is triaged, actioned, and responded to.
When fixing a bug, use a workflow to explore three solutions in parallel worktrees and have
a judge adversarially review them.
```

- Each task exits when its goal is met; the routine runs until you turn it off.
- Bound usage by: routing routine steps to smaller, faster models and saving the most capable
  model for judgment calls.

## keeping quality up

A loop's output quality is the system around it:

- Keep the codebase clean — the agent follows the patterns that already exist.
- Keep framework and library docs reachable.
- Review with a second agent in fresh context (less anchored than the builder): `/code-review`,
  or the review loops in `agent-swarm`.
- When one result misses the standard, don't stop at fixing the instance — encode the fix as a
  skill, rule, or check so every future iteration inherits it.

## managing tokens

- Use the smallest primitive and cheapest model that fits the job.
- Pilot on a small slice before a large run — workflows can spawn hundreds of agents.
- Ship deterministic steps as scripts the agent runs, instead of re-reasoning them each pass.
- Inspect running loops: `/usage` breaks down spend by skills, subagents, and MCPs; `/goal`
  with no arguments shows turns and tokens so far; `/workflows` shows per-agent usage and
  lets you stop any agent.
