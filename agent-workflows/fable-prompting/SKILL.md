---
name: fable-prompting
description: How to prompt Fable 5 so it performs like a next-generation model instead of a current one. Give it the goal not the steps, fence it with house rules, hold it to a hard self-checkable bar, loop it against that bar, and never let the builder grade itself. Ships three drop-in files — a CLAUDE.md house-rules block, a /loop prompt template, and a verifier sub-agent prompt. Fable-specific. Source: the "How I Prompt Fable" writeup.
---

# fable-prompting

The whole idea in one line: **prompt Fable like a current-gen model and you get current-gen
results.** The demos that look impossible aren't complicated prompts, they're Fable used
differently. This skill is that difference, packaged.

## the method (why the files are shaped the way they are)

1. **Give Fable the goal, not the steps.** With older models you had to spell out *how*.
   Fable is the opposite: the more room you give it, the better it does. Every step you
   dictate is you overriding its judgment with yours, and yours is usually worse.
2. **Fence the freedom with house rules.** A handful of things that must always be true no
   matter how Fable reaches the goal. This is what makes an underspecified goal safe.
3. **Give it a real bar for "done".** No adjectives. "High quality" just stops at Fable's
   own idea of good enough, which is below yours. Give a concrete, self-checkable test. If
   you can't measure the thing, make Fable invent the measuring stick.
4. **The builder never grades itself.** Whatever built the thing is biased. Verification is
   a separate Fable sub-agent, fresh context, pointed at the real output, told to prove
   it's failing.
5. **Loop it against the bar.** Build, self-check, close the biggest gap, repeat. Fable
   never gets to declare itself finished while a gap remains.
6. **Get out of its way.** Budgets instead of permission-asking, keys/creds in writing,
   "make your own calls". The only stop-and-ask exception is planning a huge build.
7. **Build on prior work.** Point Fable at an earlier high-bar artifact and at old session
   traces so it reuses what already worked instead of re-deriving it.

## the three files, and how to use each (plain version)

### 1. `house-rules.block.md` — paste into a project's CLAUDE.md

**What it is:** the standing rules for one project. Fable reads it every session, so you
set the goal-mode + guardrails once instead of re-typing them.

**When you use it:** once per project, at setup. You're saying "here's how you operate in
this repo, forever."

**How to use it, step by step:**
- Open the project's `CLAUDE.md` (make one if there isn't one).
- Paste the block in and fill the `[brackets]` — the project-specific invariants (schema
  rules, which design tokens, no-new-deps), where keys live, the spend cap.
- That's it. From then on every Fable session in that repo already knows to take goals not
  steps, respects your rules, and self-verifies before shipping.

**Think of it as:** the job's employee handbook. New Fable shows up, reads the handbook,
already knows the rules.

### 2. `loop.template.md` — paste into a Fable chat, then run under `/loop`

**What it is:** the actual instruction for one big piece of work you want Fable to grind on
by itself until it's genuinely done.

**When you use it:** any time you'd otherwise babysit Fable through many rounds — creative
work especially (a scene, a landing page, a component that has to match a reference).

**How to use it, step by step:**
- Copy the template into the chat.
- Fill `GOAL` loosely (the outcome, not the recipe).
- Fill `THE BAR` with something checkable. If you can't, tell Fable to build the measuring
  stick first — that line is already in the template.
- Point `FUEL` at any earlier good artifact or session traces to build on.
- Run it with `/loop`. Now Fable builds, grades itself with a fresh sub-agent, closes the
  biggest gap, and goes again — for hours if needed — while posting progress somewhere you
  can glance at from your phone and steer with comments.

**Think of it as:** setting a machine running toward a finish line it can see, instead of
you hand-cranking each turn. Fable stops when it hits the line or you say stop.

### 3. `verifier.prompt.md` — hand to a fresh Fable sub-agent

**What it is:** the grader. The single most-skipped piece, and the one that makes the loop
trustworthy.

**When you use it:** every time something needs to actually pass, not just look done. It's
baked into the loop template (step 4), but keep it standalone so you can grade any output
on demand.

**How to use it, step by step:**
- Spin up a **new** Fable sub-agent (a fresh context window, not the one that did the
  building).
- Paste this prompt, point it at the **real** artifact — the running app, the actual
  rendered pixels, the real file, never the builder's own summary of its work.
- It tries to break the thing. If it can't, that's your PASS, with evidence.

**Think of it as:** a hostile examiner, not the student's proud parent. The builder wants
to be done; this agent wants to catch it not being done.

## when to spend on ultracode

Almost never. A good `/loop` with an ambitious enough goal gets you there without it. The
one place it earns the cost is **foundations** — a from-scratch system you'll build on for
months (the core of a business or a codebase). A good base makes everything on top easier;
a bad one makes everything harder forever. That's the same reason the writeup threw out
ShadCN before cloning a component library. For foundations, and pretty much only
foundations, pay for ultracode.

## the shortcut

If holding all of this in your head is a lot, don't. Hand this folder to Fable and tell it
to help you write your prompts from here on. It'll know what to do with it.
