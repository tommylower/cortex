# emil

Emil Kowalski's skills, vendored from
[emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT, license in
`catalog/licenses/emilkowalski-skills-MIT.txt`). Every skill here is a supplier
under Studio: the active project's tokens and Studio's rules win, and the
numbers in these skills are examples for when the project has no answer.

## which one to use

| You want to | Skill |
| --- | --- |
| audit every animation in a codebase and get fix plans | `improve-animations` |
| review the motion in one diff, component, or page | `review-animations` |
| find places that should animate but don't | `find-animation-opportunities` |
| build a new animation or transition | `animate` |
| make a web app feel native on a phone | `mobile-native` |
| name a motion effect you can only describe | `animation-vocabulary` |
| talk through taste, polish, or why something feels off | `emil-design-eng` |
| borrow Apple's fluid, physical interaction model (opt-in only) | `apple-design` |

`improve-animations` and `find-animation-opportunities` are read-only: they
write plans, not code. `review-animations` only runs when you call it by name.

## Emil skills that live elsewhere

- `pick-ui-library` is merged into `design/kits/component-libraries`.
- `ask-sonner` is merged into the Sonner entry in
  `design/kits/component-libraries/references/catalog.md`.
- `prototype` (the variant picker) is merged into the UI branch of
  `engineering/prototype`, together with Matt Pocock's prototype skill.
- `animate-expo` (React Native) and `write-swift` are not vendored. Add them
  here if Cortex takes on native work.

## updating

Upstream is reviewed at `d16ebe6`. To update, diff each upstream
`skills/<name>/` against the folder here. Keep the upstream files as they are.
Cortex changes only three things: the `author:` line, the one-line source note
under the title, and the dropped "Initial Response" greeting. The descriptions
of `emil-design-eng`, `review-animations`, and `apple-design` are also
rewritten so agents can route to them. Then bump the commit here, in each
source note, and in `catalog/inbox.md`.
