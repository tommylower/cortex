---
name: google-developer-style
description: Applies an agent-focused adaptation of the Google developer documentation style guide to substantial technical prose. Use when the user asks for Google developer style, clearer or easier-to-read writing, a readability pass, or help drafting or revising technical documentation, explanations, reports, instructions, or long-form agent output. For interface copy, also use better-writing.
author: Google (https://developers.google.com/style)
license: CC-BY-4.0
---

# Google developer style

Use this skill as the default editorial baseline for user-facing technical prose. Apply it to agent messages, documentation, comments, and reports. For product interface copy, also use `better-writing`.

## Set the priority

1. Follow system, safety, explicit user, and project-specific requirements.
2. Follow rules for the specific artifact or opt-in response mode.
3. Follow this skill where higher-priority guidance is silent.
4. Break a guideline when doing so clearly improves the content. Stay consistent after you do.

## Lead with the outcome

- Start with the answer, result, recommendation, or critical fact.
- Give context before an instruction when the context determines whether the instruction applies.
- Put the action before its result or justification.
- Include only the reasoning, evidence, and detail that helps the reader understand, decide, or act.
- End when the response is complete. Add a next action only when the reader must take one.

## Make the response easy to scan

- Put the most important information in the first sentence and the first paragraph.
- Keep one main idea in each paragraph. Split walls of text.
- Prefer sentences shorter than 26 words. Treat this as a review signal, not a hard limit.
- Use descriptive, sentence-case headings only when they help readers navigate a longer response.
- Use numbered lists for sequences. Use bullets for non-sequential items.
- Keep list items parallel. Give each numbered step one bounded action when practical.
- Do not turn one item into a list or stack headings, labels, and bullets in a short answer.

## Use clear language

- Prefer familiar, precise words. Use one term for one concept.
- Use active voice and name the actor. Use passive voice only when the actor is irrelevant or the object matters more.
- Address the reader as `you`. Use `I` for the agent's actions. Use `we` only when it is genuinely shared.
- Use imperative verbs for instructions.
- Define uncommon abbreviations on first use. Replace ambiguous pronouns with the specific noun.
- Avoid double negatives, nested exceptions, and long noun stacks.
- Match the reader's language and dialect. Do not force American English.

## Keep the tone human

- Sound conversational, friendly, respectful, and knowledgeable.
- Be direct without becoming cold, pedantic, pushy, or performatively blunt.
- Avoid filler, fake enthusiasm, buzzwords, slang, clichés, idioms, cultural references, ableist or demeaning language, and forced humor.
- Do not call a task easy, simple, obvious, or quick. Those labels do not help the reader do it.
- Avoid placeholder phrases such as _please note_ and _at this time_. Avoid excess exclamation marks.
- Use contractions when they sound natural. Use _please_ only when it adds real courtesy.

## Adapt the guide to agent messages

- Progress update: state the new fact, current state, or next step. Do not repeat the full plan.
- Error report: state where the error occurred, what caused it, what fixed it, and any real uncertainty.
- Final report: state what now works, how you verified it, and only the unresolved items that matter.
- Explanation: scale detail to the reader and the decision. Do not compress complex reasoning into dense shorthand.
- Choice: recommend one option when the evidence supports it. Present multiple options when the tradeoff is real.
- Clarification: ask the minimum question needed when a wrong assumption would cause material rework.

## Format technical content

- Put code, commands, filenames, paths, identifiers, and literal values in code formatting.
- Use bold sparingly. Reserve it for named interface elements or a small amount of necessary emphasis.
- Use descriptive link text that makes sense without surrounding context.
- Preserve exact code, quotations, errors, and required technical terms.

## Review before sending

Check the response in this order:

1. Can the reader find the outcome immediately?
2. Can the reader scan the structure without decoding a wall of text?
3. Is each actor, condition, term, and next action clear?
4. Can you remove anything without losing meaning, evidence, safety, or humanity?
5. Does the response sound like a capable person wrote it for this reader?

For the source mapping and adaptation decisions, see [references/google-style-map.md](references/google-style-map.md).

This skill adapts the [Google developer documentation style guide](https://developers.google.com/style), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Cortex selected and changed the guidance for cross-agent chat and technical messages.
