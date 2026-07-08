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
