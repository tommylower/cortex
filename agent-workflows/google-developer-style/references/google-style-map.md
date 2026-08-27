# Google style source map

This reference records where the operational rules come from and how Cortex adapted them for agent messages.

## Attribution

- Title: _Google developer documentation style guide_
- Creator: Google
- Source: [developers.google.com/style](https://developers.google.com/style)
- License: [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)
- Changes: Cortex selected, condensed, reorganized, and adapted the guidance for cross-agent chat, progress updates, explanations, and technical reports.

## Rule mapping

| Operational rule | Official source | Agent adaptation |
| --- | --- | --- |
| Let project guidance take priority and break rules for clarity. | [About this guide](https://developers.google.com/style) | System, safety, explicit user, and project rules take priority. |
| Be conversational, friendly, respectful, direct, and useful. | [Voice and tone](https://developers.google.com/style/tone) | Keep personality, but avoid agent filler, fake enthusiasm, and forced entertainment. |
| Put critical information first and keep one idea per paragraph. | [Paragraph structure](https://developers.google.com/style/paragraph-structure) | Lead chat responses and status updates with the outcome or new fact. |
| Break walls of text and prefer sentences under 26 words. | [Write accessible documentation](https://developers.google.com/style/accessibility) | Use the sentence length as a review signal, never a hard quota. |
| Use active voice and make the actor clear. | [Active voice](https://developers.google.com/style/voice) | Name the agent, reader, software, or service when responsibility could be unclear. |
| Address the reader as `you` and use imperatives for instructions. | [Second person and first person](https://developers.google.com/style/person) | Use `I` for agent actions and `we` only for genuinely shared work. |
| Put conditions or goals before instructions. | [Sentence structure](https://developers.google.com/style/sentence-structure) | Let readers skip steps that do not apply to them. |
| Put the action before command details, results, and justifications. | [Procedures](https://developers.google.com/style/procedures) | Use the same order in implementation reports and troubleshooting steps. |
| Use numbered lists for sequences and bullets for other sets. Keep items parallel. | [Lists](https://developers.google.com/style/lists) | Prefer one bounded action per numbered step and avoid one-item lists. |
| Use descriptive, sentence-case headings in a logical hierarchy. | [Headings and titles](https://developers.google.com/style/headings) | Omit headings in short replies. Add them only when they improve scanning. |
| Use consistent terms, short unambiguous sentences, and direct address. | [Write for a global audience](https://developers.google.com/style/translation) | Match the user's language and dialect instead of forcing US English. |
| Avoid idioms, culturally specific references, jargon, and ableist language. | [Voice and tone](https://developers.google.com/style/tone), [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation) | Prefer literal language that works across cultures and ability levels. |
| Format code elements as code and use visual emphasis sparingly. | [Text-formatting summary](https://developers.google.com/style/text-formatting) | Apply the target medium's semantic formatting rather than decorative emphasis. |
| Use descriptive link text. | [Cross-references and linking](https://developers.google.com/style/cross-references) | Put essential context in the response and link only when the destination adds value. |

## Guidance not applied universally

- Do not force American English. Match the reader and the project.
- Do not import Google product naming, branding, legal, SEO, HTML, or image-production rules into general chat.
- Do not ban progress pre-announcements when the agent must keep the user informed. Make each update useful.
- Do not ban all questions, humor, phrasal verbs, keyboard shortcuts, `please`, or collaborative `we`. Avoid them only when they reduce clarity or access.
- Do not replace an explicit artifact voice. Product copy, marketing copy, journals, and opt-in modes can add narrower rules.
