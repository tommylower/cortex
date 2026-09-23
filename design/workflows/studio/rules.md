# rules

the law for design and front-end product work: how rules are graded, and
every house rule in force. suppliers (other skills, library defaults,
references, tool defaults) never override it. tool mechanics live in
`practices/`, graded the same way.

## grades

every rule has a strength, and only evidence changes it.

- **experiment**: seen once, or borrowed. free to kill.
- **default**: held for two real uses, or adopted by the operator's call.
  its evidence says which. used unless there's a reason not to, and cheap
  to swap.
- **invariant**: law. held across two real projects, or adopted by the
  operator's review. ten slots, never more.

rules about boundaries (names, contracts, vocabularies) make the strongest
invariants. rules about implementations (which library, which css
strategy) stay defaults, because implementations keep getting ripped out.

demote, don't demolish: a rule that fails in one context gets narrowed or
moved down a grade before it is deleted.

## keeping rows current

- **add** a row when a mistake costs real time and one line would have
  prevented it, or when a session finds a tool behavior that would have
  cost real time (say so in the evidence). write it at that moment, as an
  experiment, in the file it
  belongs to: this file for how we work, the matching `practices/` file
  for a tool's mechanics. if no practices file fits the tool, create
  `practices/<tool>.md` with the same sections and list it in `SKILL.md`.
  process rules about deriving or conforming an existing codebase belong
  to the `asbuilt` skill's own rule grades. most sessions add nothing, and
  zero is the right number.
- **update** a row when a session exercises it. add the use to its
  evidence, promote an experiment after its second real use, and narrow or
  kill a row that proved wrong. delete killed rows; git keeps the history.
- **evidence** is a date and what the mistake cost. never a client name,
  a project name, or a client alias.
- **design decisions** never go in these files. they live in the artifact
  (the codebase or the canvas file) and reach a record only by being
  derived from it.

## invariants

adopted by operator review on 2026-07-04.

1. code is the source of truth. canvas tools and design files are spec surfaces.
2. a component is a state machine. no component ships from the happy frame alone.
3. one token vocabulary everywhere. semantic names are shared; values may differ by brand.
4. never rebuild behavior that already exists. keyboard, focus, and aria come from a proven engine.
5. the system trails the work. build nothing the current screen does not pull.
6. rules are earned. borrowed rules enter as experiments.
7. attention is scarce. one loud visual event per screen.
8. the skin is always ours. anatomy may be borrowed; look and feel never is.

## defaults

| topic | rule | evidence |
|---|---|---|
| motion numbers | durations: fast 100–120ms, base 180–220ms, slow 280–320ms. ease-out on enter, ease-in on exit. day-one token values are the midpoints (`--dur-fast` 110ms, `--dur-base` 200ms, `--dur-slow` 300ms), `--ease-enter` is ease-out, and `--ease-exit` is the tuned curve (`rules.md`, exit ease). a project's own motion tokens always win. where a project has none, these are the only source of motion values: write them in the margins of every state graph and into the project's motion tokens. when deriving from or conforming an existing codebase (the `asbuilt` skill), these numbers only seed proposals labeled as proposals. the durations have not been tuned by hand; when tuning finds better numbers, update this row | adopted by operator review, 2026-07-04; exit curve tuned 2026-07-06 |
| behavior engine | base ui via shadcn for new react projects. an existing project's engine wins | operator's call, 2026-07-29 |
| per-project choices | css strategy, type, chart library, and canvas tool are per project, and studio holds no house default for them. declare the engine and css strategy in the project's `design.config.ts`; its keys and values are in (`doctrine/enforcement.md`, profiles). always declare `css`, because a config without it runs as `single-skin` | operator's call in the 2026-07 defaults, which set each of these per project; implementations stay defaults, per the grades above |
| ambiguous session opener | no stated task ("picking back up", "working on this") means scout and report only: read, give a short report of what is there, then stop. no canvas or file changes; exports and side files count as changes. pending items wait for the operator to point | 2026-08-19 unasked edits; clean use 2026-08-21; bit again 2026-09-08 when a scout ran on into exports |

## experiments

| topic | rule | evidence | recheck when |
|---|---|---|---|
| exit ease | `--ease-exit` is `cubic-bezier(0.32, 0, 0.67, 0)`, an ease-in curve and the first exit curve tuned by hand | 2026-07-06, first real dismissal tuning | next real dismissal or overlay |
| motion tiers | fast for press, hover, and toggle feedback; base for menus, popovers, tooltips, and in-place state changes; slow for sheets, dialogs, and large surfaces. a change that neither enters nor exits (a hover color, a toggle) uses ease-out | borrowed convention, 2026-09-23; no real use yet | next component with several transitions |
| proven pipelines | once a recipe is proven (it is a row here or in `practices/`), batch every independent tool call per message and verify only at the known silent-failure points, not after every step | 2026-08-24, operator called out slowness | next multi-asset canvas session |
| match to a template | when told "match the others to this", the named node is the spec: copy its computed styles onto the siblings and never restyle the template itself | 2026-09-16, one revert round | next match-to-template request |
| reference-driven passes | "the skin is always ours" covers every visual register: radius, shadow recipe, spacing scale, type sizes and weights, not only color and font. re-read the token board before translating a reference, and conform values as you write, never after. when the operator objects to a value, confirm which nodes they mean before any sweep; relaxed line-heights on 13–14px secondary text were fine | 2026-08-26: drift cost a ~120-node conformance pass, then an unasked sweep cost a full revert | next reference-driven build |
| fan-out briefs | before handing parallel builders fixed slots, compute the widest content first (mono text ≈ 0.6 × font-size × characters; stacked copy = the sum of its line heights) and give every builder the same budget. in copy docs, say which lines are structure and which are visible copy (for example, "### lines are structure, not copy"), and name the visible fields for each section: heading, sub-heading, body, link. give each type style as its full spec (size, weight, case), never as a set of allowed values, and audit builder weights with get_computed_styles before showing the operator | 2026-09-07 and 2026-09-08: builders each solved the same overflow differently, costing normalization passes; 2026-09-16: 3 of 7 builders rendered section labels as titles, one retext round; 2026-09-23: 3 of 3 builders set the headline to medium when the brief listed "weights: regular, medium" | next multi-agent build |
| placeholders the operator owns | a slot marked as waiting on a designed asset (a diagram pending in paper or figma) is the operator's design decision. answer "why is this empty" with that fact; never invent the asset. an approved artifact set stays closed until the operator reopens it | 2026-07-10, an invented diagram (twice) cost two build rounds and cleanup | next placeholder in an operator-designed set |
| states in every mount | a reused component's non-happy states (success, error) inherit alignment from each mount context: a block-level status row hugs left inside a centered parent. check every state in every mount (invariant 2), and make status and confirmation rows self-sized (inline-flex) by default | 2026-07-14, a success message shipped left-hugging under a centered heading | next multi-context state pass |
| brand tokens on structure | when replacing a framework's grey structure colors (borders, rules, surfaces) with brand tokens, keep the grey's volume: the token at low alpha through `color-mix`, never the raw token. raw tokens on structural elements read as content and outshout it | 2026-07-09, full-strength table rules and card slabs in dark mode cost a re-style round | next theme skin pass |
| canvas token mirror | a canvas file's token mirror drifts from code silently. verify the file's tokens against the code token file before drawing or importing. convert mock px only through the fluid-unit cap (px ÷ cap, for artboards 1440 and wider), and match named type voices before deriving new multiples. spec-sheet specimens carry the full shipped style (weight, leading, tracking); a partial specimen invites tuning against wrong values | 2026-07-26, a stale mirror shipped text sizing that was far off and cost a rework round | next canvas import |
| canvas token binding | on any canvas (paper or figma), bind every fill and stroke to a token, never to a hex that happens to match, and read the binding back before building on it. if a value isn't in the palette, create the token instead of inlining it. the one exception is where a tool can't resolve a token, such as svg marker defs in paper (`practices/paper.md`, svg markers): use the literal value there, and only there. the tool mechanics are in (`practices/figma.md`, token binding) and (`practices/paper.md`, tokens) | 2026-07-27, every fill shipped raw and couldn't be fixed once the image was posted | next canvas build against a token palette |
| supplier engine defaults | never trust a supplier's default engine to match the project's. shadcn v4 and later resolve to base ui by default, and older registries and templates still resolve to radix. declare the engine in `design.config.ts` and let preflight enforce it in both directions | 2026-07-06, a radix profile was a silent no-op | next engine pull in a real project |
| live source of truth | before auditing or deriving from a repo, confirm it is the live source: look for org copies and forks, compare pushed dates, and check ancestry | 2026-07-05, an audit ran on a snapshot 96 commits behind and cost a full conform re-run | next audit or derivation |
