# rules

every rule has a strength. only evidence promotes it. demote, don't demolish.

- **experiment**: trying it on one surface in one project. free to kill.
- **default**: current preference, used unless there's a reason not to. cheap to swap.
- **invariant**: law. earned only by surviving two real projects. keep under ten, forever.

the line, learned the hard way: rules about **boundaries** (names, contracts,
vocabularies) survive migrations. rules about **implementations** (which library,
which css strategy) are the ones that keep getting ripped out. boundaries can
become law. implementations stay defaults.

## invariants — v1, eight of ten slots used (reviewed by tommy 2026-07-04)

v0 was claude's draft; tommy's pen merged and adopted it. these eight are
grandfathered by that review. everything new from here earns promotion
through the tables below, two real uses, no exceptions.

1. code is the source of truth. figma and paper are spec surfaces, interchangeable.
2. a component is a state machine. no surface ships from the happy frame alone.
3. one token vocabulary everywhere. semantic names shared across canvas and code;
   values free to differ per brand.
4. never rebuild behavior that already exists. keyboard, focus, and aria come
   from a proven engine, whichever engine that is.
5. the system trails the work. build nothing the current screen doesn't pull.
6. rules are earned. nothing reaches law without surviving two real uses. borrowed
   rules enter as experiments.
7. attention is salt. one loud thing per screen: trail, glow, shader, or none.
8. the skin is always ours. anatomy may be borrowed from references; look and
   feel never.

## defaults — current, swappable, no shame in changing

| area | current default | why / provenance |
|---|---|---|
| behavior engine | radix via shadcn (project-a) · base-ui (project-b) | per-project profile. not converged, deliberately |
| css strategy | cva + tailwind (project-a) · single .brand-* class (project-b) | per-project profile. the project-b invariants doc explains the single-class case |
| type | geist mono (project-a/graphite) | brand-level taste, not universal |
| motion numbers | 100-120 fast / 180-220 base / 280-320 slow, ease-out enters, ease-in exits | from the field manual. UNTUNED. hands revise in workbench, then these update. first tuned exit curve is an experiment below, not yet promoted |
| chart lib | recharts (project-a, code-split) | works, perf pass staged |
| canvas tool | figma (project-a) · paper (earlier mocks) | whichever fits; invariant 1 makes them interchangeable |

## experiments — running, free to kill

| experiment | where | verdict due |
|---|---|---|
| border trail as attention pattern | field manual demo only | after first real use in project-a |
| rule-grading itself (this file) | studio skill (groundwork retired 2026-07-06) | after project-a design pass ends |
| figma plugin api: wrapping TEXT in auto-layout gets textAutoResize='HEIGHT' + FIXED width via resize(), never FILL alone (FILL can resolve w=0 → node explodes to a 4000px vertical thread) | 2026-07-04 project-a gap-pass, cost two debug rounds | after next figma build session |
| before auditing or deriving from any repo, verify it is the live source of truth: search for org copies/forks, compare pushed dates, check ancestry | 2026-07-05 project-c audit ran on a snapshot 96 commits behind the org repo, cost a full conform re-run | after next asbuilt run |
| shadcn v4+ resolves to base-ui by default (init prompts Base vs Radix, recommends Base); the radix-default era is over. never trust a supplier default to match an engine profile, enforce the profile symmetrically | 2026-07-06 workbench hardening, alt-profile grader found engine=radix was a silent no-op | after next engine pull in a real project |
| the day-one token NAME set needs spacing/size roles and an exit ease, not just color/radius/type/enter-motion: three independent workbench graders could not bind component spacing to any name and had to improvise | 2026-07-06 workbench hardening, paper-mock + package-consumer graders | after next fresh scaffold |
| exit ease cubic-bezier(0.32, 0, 0.67, 0) (ease-in), first tuned exit curve; the seed copies it as its --ease-exit value | 2026-07-06 waves build, first real dismissal tuning | after next real dismissal/overlay use |
| figma plugin api: createComponent() AND createFrame() keep their default 100px counter axis FIXED even after layoutMode + children are set, silently clipping content — use createAutoLayout() for containers, or set counterAxisSizingMode='AUTO' immediately; sweep-check for stuck-at-100 frames before shipping | 2026-07-06 project-a figma backport, 6 component sets + 131 screen frames shipped clipped, two fix sweeps | after next figma library build |
| when replacing a framework's grey structure colors (borders, rules, surfaces) with brand tokens, keep the grey's VOLUME: token at low alpha via color-mix, never the raw token. raw tokens on structural elements read as content and outshout the actual content | 2026-07-09 project-d docs, full-strength cream table rules + solid cream card slabs in dark mode, cost a re-style round + operator complaint | after next docs/theme skin pass |
| paper write_html: CSS vars do not resolve inside svg `<marker>` defs — marker fills silently render default black (invisible on dark grounds, wrong color for accent arrows) while strokes on the paths resolve fine. use literal hex inside marker defs | 2026-07-09 project-d docs diagrams, all dark-mode + flame arrowheads shipped black, cost a 10-svg rewrite round | after next paper diagram session |
| paper write_html: CSS rotation on a frame does not propagate to children (border tilts, contents stay axis-aligned = reads broken) and repeating-gradient backgrounds can render empty — build tilt/overlay effects (straddling numbers, perforation, captions) as artboard-level absolute elements and textures as explicit SVG | 2026-07-09 project-d one-pager fan-out, v2 agent burned a rebuild round on a 1.2° card tilt + a dropped scanline pattern | after next paper build session |
| structural layout (stacking direction, wrapping) must come from markup, never from a CSS rule alone — turbopack dev can serve a stale css chunk after many hot edits in one long session, and a decoration whose vertical stacking lived only in `display:block` blew out horizontally and broke the live page. verify the SERVED css (curl the chunk), not the file on disk; restart the dev server after heavy css-edit sessions. ESCALATION 2026-07-10: the stale chunk can SURVIVE a dev-server restart (turbopack persistent cache) — if the served chunk still mismatches disk after a restart, `rm -rf .next` and restart again | 2026-07-09 project-d binary-rail refactor, tommy hit the broken page live; 2026-07-10 engine-run lab, restart didn't refresh the chunk, .next wipe did | after next long dev-server session with css edits |
| paper write_html: replacing a `<g>` INSIDE an existing SVG node with a bare svg fragment parses as a Frame (invisible), not an SVGVisualElement — to edit any svg sub-element STRUCTURALLY, rewrite the ENTIRE `<svg>` via replace on the svg root. SCOPED 2026-07-12: this is for geometry/structure only — a pure RESTYLE (fill, stroke) takes update_styles directly on the SVGVisualElement path node, no rewrite | 2026-07-09 project-d diagram edge test, derived-edge comb vanished, cost a delete + full-svg rewrite round; scope found 2026-07-12 docs dark-mode pass | after next paper svg edit |
| X-Frame-Options: DENY blanks SAME-ORIGIN iframes too — any workbench that previews the site through iframes needs SAMEORIGIN. after any headers/security change, verify the workbench renders, not just that routes curl 200 (the failure is browser-only and invisible to curl) | 2026-07-10 project-d SEO pass set DENY site-wide; every workbench stage showed "localhost refused to connect", cost tommy a blocked morning review | after next headers/security pass |
| paper artifacts the operator will HAND-EDIT must be built from native elements: rectangular shapes as plain divs (become Rectangle nodes), never svg rects (svg internals can't be moved/ungrouped in the editor); no full-canvas invisible wrapper frames (they capture selection/marquee); groups placed flat in the artboard; whitespace between tags in write_html becomes junk empty Text nodes — write single-line. svg only for genuinely non-rectangular shapes (arrowheads, curves) | 2026-07-10 project-d docs diagrams, tommy blocked twice trying to hand-move edge pieces (svg groups, then svg-wrapped rects + wrapper frame), cost three rebuild rounds of 10 frames | after next paper build meant for operator editing |
| any PORTALED popup (menu, tooltip, dialog positioner) must take an explicit slot on the project's z scale — portals land at the end of body at z-auto and paint BEHIND every positive-z layer (hero canvases at z 1-2 beat them), so the popup "opens" but is invisible; SSR/curl markup checks cannot catch paint-order bugs, only eyes can | 2026-07-12 project-d nav services dropdown, shipped invisible behind the hero, cost tommy a review round | after next portaled overlay build |
| when a slot is an explicit placeholder pointing at a designed-asset pipeline (paper/figma "pending the real diagram"), the missing asset is the OPERATOR'S design decision — answer "why is this empty" with the fact, never by inventing the asset; the approved artifact set is closed until the operator opens it | 2026-07-10 project-d docs surface-map, invented a diagram twice (svg then paper frames on the approved artboard), tommy: "those are final, I've approved them" — cost two build rounds + cleanup | after next placeholder encounter in any operator-designed set |
| a reused component's non-happy states (success/error) inherit ALIGNMENT from each mount context — a block-level flex status row hugs left inside a text-center parent while looking fine in left-aligned mounts; invariant 2 means checking every state in EVERY mount context, and self-sized rows (inline-flex) are the default for status/confirmation lines | 2026-07-14 project-e blog subscribe success message shipped left-hugging under a centered heading, tommy caught it in prod: "this should have been caught w studio" | after next multi-context component state pass |

## resolved 2026-07-04

both invariant candidates from the project-a chat entered law: "never rebuild
behavior that already exists" merged into invariant 4 (broad statement as the
rule, the a11y floor as its named instance); "the skin is always ours" became
invariant 8.

## deposits (revised 2026-07-04: ritual killed, event-driven now)

no close-step, no schedule. the trigger is pain: a mistake costs real time
and a one-line rule would have prevented it. write it HERE, at that moment,
as an experiment, with a date and one line of provenance. process rules only
(how we work). design decisions are never hand-written anywhere — they live
in the artifact and enter records only via derivation. most sessions deposit
nothing, and zero is the correct number, not a failure.
