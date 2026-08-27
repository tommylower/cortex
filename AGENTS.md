# cortex

shared library of skills, workflows, tools, and references for AI-assisted development. designed to be agent-agnostic. consumed by claude code, codex, cursor, and any agent that can read markdown.

## this repo is public. no client names, ever

never commit a client's name, domain, or any identifying detail anywhere in this repo: file contents, commit messages, branch names. refer to client projects only by their neutral aliases (project-a, project-b, ...). the alias map lives outside this repo. client material goes in `local/` (gitignored) or the client's own repo. check before every commit that touches provenance notes, deposits, or journal-derived text. this rule was earned: a client name slipped into the initial commit and cost a full history rewrite on 2026-07-16.

## how to use this repo

cortex is mounted into projects as a symlink at the project root: `<project>/cortex -> /path/to/cortex`. agents working inside a project can read anything in `cortex/` directly. cortex is not a dependency, package, or runtime. it's content.

if you are an agent and the user asks for design help, marketing help, workflow guidance, or tooling, look here first before generating from scratch.

<!-- cortex-reporting-profile:start -->
# Agent writing profile

This profile adapts the [Google developer documentation style guide](https://developers.google.com/style) for agent messages. Apply it to user-facing commentary, progress updates, explanations, reports, instructions, and technical documents.

## Priority

1. Follow system, safety, explicit user, and project-specific requirements first.
2. Follow artifact-specific rules and explicit opt-in response modes next.
3. Follow this profile where higher-priority guidance is silent.
4. Break a guideline when doing so clearly improves the content. Stay consistent after you do.

## Write for the reader

- Start with the answer, result, recommendation, or critical fact.
- Use only the detail that helps the reader understand, decide, or act. Expand when reasoning, evidence, safety, or teaching requires it.
- Put conditions and goals before instructions. Put results and justifications after actions.
- Address the reader as `you`. Use `I` for the agent's actions. Use `we` only when it is genuinely shared.
- Use active voice and name the actor. Use familiar, precise words and one term for one concept.
- Define uncommon abbreviations. Replace ambiguous pronouns with the specific noun.
- Match the reader's language and dialect. Do not force American English.

## Make responses easy to scan

- Put the most important information in the first sentence and paragraph.
- Keep one main idea in each paragraph. Split walls of text.
- Prefer sentences shorter than 26 words. This is a review signal, not a hard limit.
- Use descriptive, sentence-case headings only when they help with a longer response.
- Use numbered lists for sequences and bullets for non-sequential items. Keep items parallel.
- Give each numbered step one bounded action when practical.
- Do not stack headings, labels, and bullets in a short answer.

## Keep the tone human

- Sound conversational, friendly, respectful, and knowledgeable.
- Be direct without becoming cold, pedantic, pushy, or performatively blunt.
- Avoid filler, fake enthusiasm, buzzwords, slang, clichés, idioms, cultural references, ableist or demeaning language, and forced humor.
- Do not call a task easy, simple, obvious, or quick.
- Avoid placeholder phrases such as _please note_ and _at this time_. Avoid excess exclamation marks.
- Use contractions when natural. Use _please_ only when it adds real courtesy.

## Adapt to agent work

- Progress update: state the new fact, current state, or next step. Do not repeat the full plan.
- Error report: state where the error occurred, its cause, the fix, and any real uncertainty.
- Final report: state what now works, how you verified it, and only unresolved items that matter.
- End when the response is complete. Add a next action only when the reader must take one.
- Preserve exact code, commands, errors, quotations, filenames, paths, and required technical terms.
- Format technical literals as code. Use bold and other emphasis sparingly. Use descriptive link text.

The source guide is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Cortex selected and changed its guidance for cross-agent chat and technical messages.
<!-- cortex-reporting-profile:end -->

## layout

```
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design/            everything visual, indexed by shelf
│   ├── foundations/   principles, patterns, responsive, loading states
│   ├── color/         oklch, gradients, cmyk print proofing
│   ├── motion/        animation, transitions, interaction feel, sound
│   ├── craft/         interaction craft, taste, animation critique, UI polish
│   ├── review/        static and live UI/UX review workflows
│   ├── systems/       opt-in reference design systems, never auto-applied
│   ├── workflows/     design-system extraction and design operations
│   ├── kits/          component kits and registry-backed UI systems
│   └── tools/         installable tools and integrations (figma, wireframes, shaders, overlays)
├── engineering/       process-discipline skills (mostly vendored from mattpocock/skills)
├── local/             gitignored. client work and material not licensed for redistribution
├── marketing/         marketing skills and tooling (git submodule of coreyhaines31/marketingskills)
├── catalog/           shelf registry used by docs, validation, and sync scripts
└── scripts/           agent adapters and validation
```

each category folder contains an `AGENTS.md` indexing its skills. start there when scoping a category. shelf paths live in `catalog/shelves.json`; update that before changing sync or validation behavior.

external resources without a proven permanent home go in `catalog/inbox.md`. saving an entry does not endorse or install it. promote it only after its license, runtime behavior, maintenance status, and shelf fit are verified.

## skill format

skills follow the [Agent Skills specification](https://agentskills.io/specification.md). every skill lives in its own directory containing a `SKILL.md`:

```
<category>/<skill-name>/
├── SKILL.md       required, main instructions
├── examples/      optional
├── presets/       optional
├── references/    optional, loaded on demand
├── scripts/       optional, executable code
└── assets/        optional, templates and data
```

### required frontmatter

```yaml
---
name: skill-name
description: what the skill does and when to use it. include trigger phrases.
---
```

constraints:
- `name`: 1 to 64 chars, lowercase letters, numbers, hyphens. must match the directory name. no leading/trailing hyphen, no `--`.
- `description`: 1 to 1024 chars. cover what it does, when to use it, and related skills.
- `author`: required for any skill that is not original to this repo. credit the source by name with a link. original skills omit it.

### body

- `SKILL.md` should usually stay under 500 lines. if an execution-critical skill needs more room, keep the operational core in `SKILL.md` and move supporting detail into `references/`.
- second person, direct, instructional.
- short paragraphs, bullet lists, code blocks for templates.
- no agent-specific syntax in `SKILL.md`. nothing that only one agent can parse. (skills *about* a specific agent, like claude-workflow, are fine. the format stays plain markdown.)

## attribution

credit where credit's due is a hard rule here:

- vendored or adapted skills carry an `author:` line in frontmatter and keep source links in the body.
- the `marketing/` submodule points straight at its upstream, [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills).
- third-party material that is not clearly licensed for redistribution does not ship publicly. it lives in `local/`, which is gitignored.
- client work never ships publicly. it lives in `local/`.

## how skills reach agents

cortex is the source of truth. agents see cortex skills via thin adapters in `scripts/`. nothing inside a skill folder is allowed to know about a specific agent.

**first-time setup on a new machine:**

1. clone cortex somewhere and set `CORTEX_HOME` to that path.
2. run the local setup script once:
   ```bash
   "$CORTEX_HOME/scripts/setup-local-agents.sh"
   ```
3. or run the per-agent syncs directly:
   ```bash
   "$CORTEX_HOME/scripts/sync-agent-reporting.sh"
   "$CORTEX_HOME/scripts/sync-claude-skills.sh"
   "$CORTEX_HOME/scripts/sync-claude-commands.sh"
   "$CORTEX_HOME/scripts/sync-claude-agents.sh"
   "$CORTEX_HOME/scripts/sync-codex-skills.sh"
   ```
   the setup script also installs the bundled `google-developer-style` agent writing profile into global Claude and Codex guidance. it updates existing Gemini and Clawdbot guidance too. `~/.agents/REPORTING.md` can override the bundled profile for one user. use `sync-agent-reporting.sh --target /path/to/guidance.md` for another agent.
4. (optional) for manual control, add a `SessionStart` hook to `~/.claude/settings.json` so the Claude sync runs every session:
   ```json
   "hooks": {
     "SessionStart": [
       {
         "hooks": [
           {
             "type": "command",
             "command": "/path/to/cortex/scripts/sync-claude-skills.sh >/dev/null 2>&1 || true"
           },
           {
             "type": "command",
             "command": "/path/to/cortex/scripts/sync-claude-commands.sh >/dev/null 2>&1 || true"
           },
           {
             "type": "command",
             "command": "/path/to/cortex/scripts/sync-claude-agents.sh >/dev/null 2>&1 || true"
           }
         ]
       }
     ]
   }
   ```

**claude code adapter:**

- `scripts/sync-claude-skills.sh` walks every category folder, finds every `<category>/<skill>/SKILL.md`, and symlinks `~/.claude/skills/<skill-name>` back to the cortex folder. idempotent, removes stale links, safe to re-run.
- `scripts/sync-claude-commands.sh` installs cortex-owned slash commands such as `/asbuilt` and `/studio-audit`, and removes retired command adapters on each run. `/handoff` and `/pickup` load directly as skills.
- `scripts/sync-claude-agents.sh` installs Claude-only subagents such as the read-only pickup summarizer into the active Claude config directory.
- `scripts/configure-claude-session-pickup.py` adds the zero-token `SessionEnd(clear)` bookmark hook and keeps `/handoff` and `/pickup` user-invoked in Claude Code.

**codex adapter:**

- `scripts/sync-codex-skills.sh` populates `~/.codex/skills/` with symlinks to each cortex skill directory. rerun only when adding, deleting, or renaming skills.

**other agents:**

- if an agent can read markdown from the project workspace, the `cortex/` symlink is already enough.
- if an agent needs a dedicated skills directory, add a new adapter script alongside the existing ones rather than embedding agent-specific files in a skill folder.
- `scripts/validate-skills.sh` checks every skill has frontmatter, a `name` matching its directory, a non-empty description, and no duplicate names across cortex. run it before committing skill changes.

**rules for adding a new skill:**

1. create `<category>/<skill-name>/SKILL.md` with valid frontmatter (`name` must equal the directory name).
2. if the skill is not original, add the `author:` line and source links.
3. if it names a client or is not licensed for redistribution, it goes in `local/`.
4. add the skill to its category `AGENTS.md` index and the public menu in the root `README.md`.
5. run `scripts/validate-skills.sh` and fix anything it complains about.
6. run the relevant sync script to mirror it into agent skill directories immediately.

**rules for agents (you, reading this):**

- never put agent-specific files inside a skill folder (no `.claude/`, no claude-only commands in `SKILL.md`). skills are agent-agnostic markdown.
- never bypass the sync scripts by hand-symlinking skills into `~/.claude/skills/` or `~/.codex/skills/`. the adapter scripts own those directories.
- never add a new category folder without updating `catalog/shelves.json`.
- never rename a skill directory without also updating its `name:` frontmatter.
- never move anything out of `local/` into a public category without explicit user approval.

## adding cortex to a new project

```bash
ln -s "$CORTEX_HOME" <project>/cortex
echo cortex >> <project>/.gitignore
```
