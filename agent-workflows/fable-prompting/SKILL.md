---
name: fable-prompting
description: Router for prompting Fable 5 so it performs like a next-generation model instead of a current one — give it the goal not the steps, hold it to a hard self-checkable bar, loop against that bar, and never let the builder grade itself. On invocation, ask which job the user wants and run that branch: set up house rules in a project, start a /loop on a goal, grade an artifact, or draft a Fable prompt. Fable-specific. Source: the "How I Prompt Fable" writeup.
---

# fable-prompting

Prompt Fable like a current-gen model and you get current-gen results. The impressive demos
aren't complicated prompts, they're Fable used differently. This skill is that difference,
and it routes you to the piece you need.

## start here

When this skill fires, route before doing anything else:

1. **If the user already named the job** (a goal to loop on, a project to set rules in, an
   artifact to grade, a prompt to draft), skip the ask and run that branch.
2. **Otherwise ask** (AskUserQuestion) which job they want, offering exactly these:
   - **Set up house rules** — install the guardrails into a project's `CLAUDE.md`
   - **Start a loop** — set Fable grinding on one goal toward a checkable bar
   - **Grade something** — a fresh sub-agent tries to prove an artifact is failing
   - **Draft a prompt** — write a Fable prompt for a task using the method below
3. Run the chosen branch to its completion criterion.

The method below is the shared context every branch draws on. Read it, then execute the branch.

## the method

1. **Give Fable the goal, not the steps.** The more room you give it, the better it does.
   Every step you dictate is you overriding its judgment with yours, and yours is usually worse.
2. **Fence the freedom with house rules.** A handful of things that must always be true no
   matter how Fable reaches the goal. This is what makes an underspecified goal safe.
3. **Give it a real bar for "done".** No adjectives. "High quality" stops at Fable's own idea
   of good enough, below yours. Give a concrete, self-checkable test. If you can't measure the
   thing, make Fable invent the measuring stick.
4. **The builder never grades itself.** Verification is a separate Fable sub-agent, fresh
   context, pointed at the real output, told to prove it's failing.
5. **Loop it against the bar.** Build, self-check, close the biggest gap, repeat. Fable never
   gets to declare itself finished while a gap remains.
6. **Get out of its way.** Budgets instead of permission-asking, keys/creds in writing, "make
   your own calls". The only stop-and-ask exception is planning a huge build.
7. **Build on prior work.** Point Fable at an earlier high-bar artifact and old session traces
   so it reuses what worked instead of re-deriving it.

## branch: set up house rules

The standing rules for one project. Fable reads them every session, so the guardrails are set
once instead of re-typed. Think of it as the repo's employee handbook.

- Open the project's `CLAUDE.md` (create one if absent).
- Paste `house-rules.block.md` and fill the `[brackets]` with this project's invariants (schema
  rules, which tokens, no-new-deps), where keys live, the spend cap.

**Done when:** the project's `CLAUDE.md` contains the filled block with every bracket resolved.

## branch: start a loop

The instruction for one big build you want Fable to grind on until it's genuinely done.
Think of it as a machine running toward a finish line it can see.

- Copy `loop.template.md` into the Fable chat.
- Fill `GOAL` loosely (outcome, not recipe), `THE BAR` with something checkable (if you can't,
  the template already tells Fable to build the measuring stick as iteration one), and `FUEL`
  with any prior artifact or traces to build on.
- Run it under `/goal` when THE BAR fits in a sentence the evaluator can check (add a turn
  cap), otherwise under `/loop`. For choosing between loop primitives, see `designing-loops`.

**Done when:** the filled template is running under `/goal` or `/loop` against a checkable
bar, posting progress somewhere the user can glance at and steer.

## branch: grade something

The grader, and the piece that makes the loop trustworthy. Think of it as a hostile examiner,
not the student's proud parent. Baked into the loop (step 4), kept standalone so you can grade
any output on demand.

- Spin up a **new** Fable sub-agent, fresh context, not the one that built the thing.
- Give it `verifier.prompt.md`, pointed at the **real** artifact (running app, actual pixels,
  real file), never the builder's own summary.

**Done when:** the sub-agent returns PASS-with-evidence or a ranked, biggest-first gap list.

## branch: draft a prompt

Write the user a Fable prompt for their task using the method above: goal not steps, a hard
self-checkable bar (invent the measuring stick if needed), house rules, and a separate grader.
For a loopable build, draft it straight into `loop.template.md`.

**Done when:** the user has a ready-to-paste prompt that carries a checkable bar.

## when to spend on ultracode

Almost never. A good `/loop` with an ambitious goal gets you there without it. The one place it
earns its cost is **foundations** — a from-scratch system you'll build on for months (the core
of a business or codebase). A good base makes everything on top easier; a bad one makes
everything harder forever. That's why the writeup threw out ShadCN before cloning a component
library. For foundations, and pretty much only foundations, pay for ultracode.
