# Social Asset Handoff

## Purpose

Create a simple client handoff board of correctly sized editable asset frames.

This template saves the content contract, not a fixed visual layout. Do not over-design it. The output should be plain frames that a person can edit manually.

## Target surfaces

- Figma first.
- Paper acceptable for quick drafts.
- Markdown outline acceptable when no design surface is available.

## Required inputs

- client or project name
- target Figma/Paper file and page
- approved artwork frames or asset files
- repo path when article/CMS behavior or image dimensions are code-backed

## Naming contract

Every generated frame and section uses lowercase kebab-case:

```text
client-artwork
client-social-templates
client-twitter-header
client-twitter-square
client-twitter-horizontal
client-article-templates
client-article-feature
client-article-body
client-notion-code-note
```

Replace `client` with the selected client slug. Never use spaces around dashes in frame or section names.

## Content contract

Create three top-level frames or sections.

### Artwork

Frame name:

```text
client-artwork
```

Content:

- approved artwork only
- ordered in a clean grid or rows
- one note at the top:

```text
Artwork template for future artwork templates. Feel free to request waveinprogress.com
```

Do not describe the artwork. Do not add styling guidance.

### Social templates

Frame name:

```text
client-social-templates
```

Top note:

```text
These are our frames that we use for this.
```

Default child frames:

| Frame name | Dimensions | Use |
| --- | --- | --- |
| `client-twitter-header` | `1500 x 500` | X/Twitter profile header |
| `client-twitter-square` | `1080 x 1080` | X/Twitter square post |
| `client-twitter-horizontal` | `1600 x 900` | X/Twitter landscape post |
| `client-website-social-share` | `1200 x 630` | Website Open Graph / link preview image, only when requested or code-backed |

Use a simple blue background for empty template frames unless the user provides an existing styled source frame to duplicate.

### Article / CMS templates

Frame name:

```text
client-article-templates
```

Default child frames:

| Frame name | Dimensions | Use |
| --- | --- | --- |
| `client-article-feature` | existing source size or repo-backed cover size | Article feature / cover image |
| `client-article-body` | existing source size or repo-backed inline image size | Article body image |
| `client-notion-code-note` | any readable size | Note explaining how images enter Notion and the codebase |

When a source Figma/Paper file already has article template frames, duplicate those frames instead of recreating them.

When the repo defines behavior, summarize that behavior plainly in the note. Example: first image block becomes the cover/hero/listing image; later image blocks render inline.

## Rules

- Keep output editable.
- Do not flatten to screenshots.
- Do not invent copy, graphics, logo variants, or decorative content.
- Do not apply a design-system deck treatment.
- Do not add extra explanation inside export frames unless the user asks.
- Add more child frames when the user asks for more formats, but keep the same naming convention.

## Done criteria

- Top-level frames exist for artwork, social templates, and article/CMS templates.
- Child frames use the correct dimensions or duplicate the approved source dimensions.
- Frame names follow `client-whatever-this-is`.
- Notes explain use only where needed.
- No extra styling or generated visual content was added.
