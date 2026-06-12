# tokens

this file holds reusable foundation values and semantic roles.

## color roles

stable draft roles:

| role | value | use |
| --- | --- | --- |
| `background` | `#f7f7f2` | app background and empty page canvas |
| `surface` | `#ffffff` | panels, inputs, rows, and simple cards |
| `surface-raised` | `#fbfbf7` | toolbars and persistent chrome |
| `border-subtle` | `#deded4` | panel boundaries and table separators |
| `border-strong` | `#b9baad` | focused regions and selected surfaces |
| `text` | `#1d1e1a` | primary text |
| `text-muted` | `#66695d` | secondary labels and metadata |
| `accent` | `#2357d6` | primary action, active state, key links |
| `accent-muted` | `#dce6ff` | selected row, active tab background |
| `success` | `#157f3b` | positive state and verified status |
| `warning` | `#9a6200` | warning state |
| `danger` | `#b62d2d` | destructive state |
| `info` | `#286782` | neutral informational state |

open decisions:

- dark mode is not defined.
- disabled state needs contrast testing.
- inverse surfaces need real usage before values are final.

## typography

draft stack:

```css
font-family: Inter, ui-sans-serif, system-ui, sans-serif;
```

usage:

- page titles are concise and functional.
- panel titles stay small enough for dense layouts.
- metadata uses the same family with muted color, not a separate display style.

## spacing

base scale:

| token | value | use |
| --- | --- | --- |
| `space-1` | `4px` | tight icon and label gaps |
| `space-2` | `8px` | compact control spacing |
| `space-3` | `12px` | row padding |
| `space-4` | `16px` | panel padding |
| `space-6` | `24px` | section gaps |
| `space-8` | `32px` | page-level gaps |

## shape and borders

- radius: `6px` for cards, panels, and inputs.
- icon buttons can use `8px` radius when square.
- borders should do most of the separation work.
- shadows are reserved for menus, dialogs, and drag states.

## motion values

- hover response: `120ms`.
- menu/dialog entrance: `160ms`.
- large layout transition: unresolved.
