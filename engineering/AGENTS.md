# engineering

process-discipline skills for coding agents. small, composable, agent-agnostic.

most of this category is vendored from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). his engineering + productivity sets, installed 2026-06-11; misc/deprecated/in-progress sets intentionally skipped. each vendored skill carries an `author:` line in its frontmatter.

this is a snapshot, not a submodule: it only updates when re-vendored by hand. to refresh, diff against upstream, copy over what's wanted, and re-add the `author:` lines.

## in-session skills, not hand-off skills

everything here runs while you're at the keyboard with the user. grill-me, tdd, diagnose make the live session better. the async counterpart is [agent-workflows/improve](../agent-workflows/improve/), which audits what's already built and writes self-contained plans for cheaper models to execute later.

routing rule:

- building something new? start with **grill-with-docs**.
- don't know what to work on next? run **improve**.

they stack. grill-with-docs maintains the `CONTEXT.md` glossary and ADRs that improve's recon reads as constraints. improve writes plans that an in-session agent then executes with **tdd** and debugs with **diagnose**.

## alignment (use before building)

- **grill-me** — relentless interview about a plan until every branch of the decision tree is resolved. non-code friendly.
- **grill-with-docs** — grill-me plus living docs: sharpens domain terminology and updates `CONTEXT.md` and ADRs inline as decisions crystallise.

## building

- **tdd** — red-green-refactor loop, one vertical slice at a time. references on deep modules, interface design, mocking, refactoring, what makes good tests.
- **prototype** — throwaway prototype to flesh out a design: terminal app for state/logic questions, or multiple UI variations on one route.
- **diagnose** — disciplined debugging loop: reproduce → minimise → hypothesise → instrument → fix → regression-test.

## planning and tickets

- **to-prd** — turn current conversation context into a PRD on the project issue tracker.
- **to-issues** — break a plan/spec/PRD into independently-grabbable issues using vertical slices.
- **triage** — triage issues through a state machine of triage roles.
- **setup-matt-pocock-skills** — one-time per-repo config (issue tracker, triage labels, docs location) consumed by to-prd, to-issues, triage. run it once in a repo before using those three.

## architecture

- **improve-codebase-architecture** — find module-deepening opportunities, informed by `CONTEXT.md` and `docs/adr/`.
- **zoom-out** — explain unfamiliar code in the context of the whole system.

## cleanup

- **deadcode** — find and remove unused files, exports, dependencies, and types with knip. lists findings with reasoning before deleting. (original to cortex)

## productivity

- **handoff** — compact the current conversation into a handoff doc for another agent.
- **caveman** — ultra-compressed communication mode, ~75% fewer tokens.
- **teach** — multi-session teaching workspace in the current directory.
- **write-a-skill** — author new skills with proper structure and progressive disclosure.
