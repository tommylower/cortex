# motion

this file keeps interaction motion practical and consistent.

## principles

- motion should confirm user action, not decorate the interface.
- dense product surfaces should feel immediate.
- avoid large scroll-driven reveals in authenticated workflows.

## timings

| interaction | duration | notes |
| --- | --- | --- |
| hover | `120ms` | color or border only |
| focus | `120ms` | ring appears immediately enough to track keyboard movement |
| menu open | `160ms` | opacity plus small vertical movement |
| dialog open | `180ms` | opacity plus scale no larger than `0.98` to `1` |

## reduced motion

when reduced motion is enabled:

- remove transform-based entrance motion.
- keep opacity changes short.
- preserve focus and state feedback.

open decisions:

- page transition behavior.
- drag and reorder behavior.
- chart animation rules.
