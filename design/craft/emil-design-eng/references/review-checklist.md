# Review Checklist

Use this when reviewing UI code or interaction polish.

## Output Format

Always present findings in a markdown table with these columns:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; avoid `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Elements should not appear from nowhere |

Do not write a loose list with separate "Before:" and "After:" lines.

## Common Checks

| Issue | Fix |
| --- | --- |
| `transition: all` | Specify the exact properties |
| `scale(0)` entry animation | Start from `scale(0.95)` with opacity |
| `ease-in` on normal UI | Switch to `ease-out` or a stronger custom curve |
| `transform-origin: center` on popover | Use the trigger-aware origin |
| Animation on keyboard action | Remove it |
| Duration above `300ms` for routine UI | Reduce to the appropriate range |
| Hover animation without media query | Gate it behind hover-capable devices |
| Keyframes on a rapidly toggled element | Use CSS transitions |
| Motion shorthand under load | Prefer a full `transform` string |
| Enter and exit feel equally slow | Make the response path faster |
| Multiple items appear at once | Add a short stagger if it is decorative |

## What to Look For in Practice

- Does the interaction respond instantly enough?
- Does the motion explain the state change?
- Does the element scale or move from the right origin?
- Are multiple animated properties synchronized?
- Will this still feel good on a real touch device?
