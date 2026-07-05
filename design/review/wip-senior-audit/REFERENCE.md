# wip-senior-audit reference

The lens for every dimension: does this help or hurt a normal user's ability to **understand**, **trust**, or **finish the core action**. If a problem hurts none of those, it is polish, note it last or skip it.

## The 7 dimensions

### 1. First impressions
What a first-time visitor understands in the first 5 seconds above the fold. Is it clear what this is, who it is for, and what to do next? Flag mystery-meat heroes, jargon, no clear primary action, slow or janky first paint.

### 2. Navigation
Can someone find the core action and move between sections without guessing? Flag unclear labels, buried primary paths, dead ends, no obvious "home," inconsistent nav between pages, missing breadcrumbs where depth needs them.

### 3. Visual hierarchy
Does the eye land on the most important thing first? Flag competing CTAs, everything-the-same-weight layouts, primary actions that look secondary, walls of text with no scannable structure.

### 4. Component consistency
Do the same things look and behave the same way everywhere? Flag button styles that drift page to page, inconsistent spacing rhythm, mismatched input/card/badge treatments, two patterns doing the same job.

### 5. Loading / empty / error states
The states demos skip and real users hit. Flag missing skeletons/spinners, blank empty states with no guidance or next step, raw or unhelpful error messages, no feedback after an action, layout shift on load.

### 6. Trust signals
What makes a stranger believe this is real and safe to act in. Flag missing social proof, no pricing clarity, broken/placeholder content, typos, no security cues at payment, missing footer/contact/legal, anything that reads unfinished.

### 7. Conversion paths
The friction between intent and the completed core action. Flag long or unexplained forms, surprise steps, asking for too much too early, weak or buried CTAs, no clear value reinforcement at the decision point, friction on mobile specifically.

## Priority rubric

| Priority | Meaning |
|---|---|
| **P0** | Blocks the core action or breaks trust outright. A user cannot, or will not, finish. Fix first. |
| **P1** | Serious friction or confusion that loses a meaningful share of users, but a determined user can push through. |
| **P2** | Noticeable rough edge that erodes quality perception or slows users down. |
| **P3** | Polish. Worth doing, hurts none of understand/trust/convert on its own. |

Every finding also carries which axis it hurts (`understanding`, `trust`, `conversion`, or more than one) and a concrete, specific fix.

## Fix-on-the-spot vs recommend-only

| Fix live (safe, reversible) | Recommend only (do not edit) |
|---|---|
| Copy wording and microcopy | Information architecture / nav restructure |
| Spacing and padding values | New components or design-system changes |
| Button hierarchy, labels, variants | Anything touching data, auth, or APIs |
| Obvious contrast and alt-text fixes | Flow/step reordering in the core funnel |
| Empty-state and error message text | Anything needing a product/business decision |

**Never** trigger payment, delete, publish, or any irreversible action while driving the site, regardless of how it is reached.

## Report template

Write to `docs/design-audit/README.md`. Screenshots in `docs/design-audit/assets/`.

```markdown
# Design Audit — <product>, <date>

Audited the live site at <url/local>. Lens: can a normal user understand this, trust it, and finish <core action> without docs.

## Scorecard

| Dimension | Grade | One-line verdict |
|---|---|---|
| First impressions | A–F | … |
| Navigation | | |
| Visual hierarchy | | |
| Component consistency | | |
| Loading / empty / error | | |
| Trust signals | | |
| Conversion paths | | |

## Coverage

Pages and flows audited, viewports captured, and anything **not** covered.

## Findings

| # | Priority | Hurts | Issue | Screenshot | Specific fix |
|---|---|---|---|---|---|
| 1 | P0 | conversion | … | ![](assets/…) | … |

## Per-dimension notes

Short paragraph per dimension with the embedded screenshots that show the issue.

## Fixed live this pass

Bullet list of the safe edits already applied.

## Top 5 conversion killers

Ranked. Each with the fix and rough effort.

## 5 quick wins fixable today

Small, safe, high-leverage. Each with the fix.
```
