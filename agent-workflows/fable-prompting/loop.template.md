<!--
DROP-IN TEMPLATE for launching Fable on a self-checking loop.
Fill the [brackets], then run it under /loop so Fable keeps going until it hits the bar.
Written to be read BY Fable.
-->

GOAL
[One or two sentences. The outcome you want, not the method. Underspecified is fine and
preferred: hand it to Fable the way you'd hand a goal to someone brilliant you trust.]

THE BAR (how we both know it's actually done)
[Concrete and self-checkable. e.g. "a stranger can't tell our render from the reference
photo at ./photo.png" or "the heat map of motion matches ./reference.mov within X%".]
[If you can't measure it yet: Fable's FIRST task is to build the measuring stick, then use
it. Don't skip this. No measuring stick = no real bar.]

HOUSE RULES (do not cross, however you get to the goal)
- Don't hard-code special cases; describe the behavior and let the system reason.
- [invariant 1]
- [invariant 2]

FUEL (build on prior work instead of starting cold)
- Prior artifact to match and exceed: [path or url, or "none"]
- Traces / notes to read for what already worked: [path, or "none"]

THE LOOP (repeat until the bar is met, or you genuinely can't find a gap left)
1. Build / improve toward the goal.
2. Find the single biggest gap between where you are and THE BAR.
3. Close it.
4. Verify with a FRESH Fable sub-agent: separate context, pointed at the real output,
   told to PROVE the work is not yet passing. The builder never grades its own work.
5. Before any ship/merge, a sub-agent checks the work against HOUSE RULES.
6. Go again. You do not get to declare yourself finished while any gap remains.

PROGRESS (so I can watch from my phone and steer)
After each pass, update [Simple Markdown Editor doc url / progress file] with a screenshot
plus a one-line note: what gap you just closed, what's next. I'll drop comments in there
when I want to change direction.

AUTONOMY
Make your own calls. Budget: [x]. Keys / creds live at: [where]. Only stop if you're truly
blocked or the decision is mine to make.
