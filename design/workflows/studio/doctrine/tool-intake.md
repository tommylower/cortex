# tool intake

how a new tool, system, library, or guide enters studio without colliding
with what is already here. every section here is a default, graded by
`rules.md`.

## one owner per job — DEFAULT

every job in the practice has exactly one owner: a row in `rules.md`, a
`practices/` file, a doctrine file, or an entry in `inventory.md`. a
newcomer does one of three things:

- takes a job nobody owns yet,
- replaces the current owner, which is always the operator's call,
- or becomes a supplier under the owner, narrowed to the gap the owner
  misses.

two owners for one job is a collision, and intake is not done until it is
resolved.

## the intake path — DEFAULT

1. **log it.** in cortex, add an entry to the resource inbox
   (`catalog/inbox.md`) at `evaluating`. a saved bookmark is not an
   evaluation; an entry starts when the operator asks how it fits.
2. **read the source, not the pitch.** check the license, the runtime
   (documentation only, dev dependency, runtime dependency, or external
   service), the maintenance record, and every number or rule it states
   in an imperative voice.
3. **name its job, then find the owner.** search `rules.md`, `practices/`,
   `doctrine/`, and `inventory.md` for whatever does that job today. list
   what the newcomer adds and what it repeats.
4. **pick its home by kind.**
   - a rule about how we work: an experiment row in `rules.md`.
   - mechanics of a tool we drive: its `practices/` file.
   - a check that runs inside projects: a section in
     `doctrine/enforcement.md`.
   - a skill, mcp, package, library, or reference: a verdict in
     `inventory.md`.
   - a full visual system: an `opt-in` verdict in `inventory.md`, never a
     default.
5. **resolve collisions.** narrow it to the gap, replace the owner on the
   operator's say-so, or reject it. a supplier whose numbers or rules
   conflict with `rules.md` enters as `watch`; `rules.md` wins.
6. **enter at the lowest grade.** a rule or gate enters as an experiment
   and a skill enters as a supplier. trial it in one real project before
   it touches the scaffold.
7. **validate.** the cortex skill validator must pass. green is part of
   intake, not a later chore.
8. **promote or retire on evidence.** after two real uses, promote it and
   set the inbox entry to `promoted`. if it fails, narrow it or retire it,
   and set the entry to `retired`.

## what intake never does — DEFAULT

- lets a supplier's defaults become rules by arriving.
- adds a second index of skills or tools. `inventory.md` is the one
  index; any other router points to it and defers to it.
- copies a tool's documentation into studio. link the source and write
  down only the decision and its evidence.
- changes a design decision. intake adds tools and rules; decisions still
  live in the artifact.
