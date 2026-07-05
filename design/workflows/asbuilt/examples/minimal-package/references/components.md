# Components

## Component Intake Rule

Classify every new idea before building:

- `composition`: arrangement of existing parts
- `headless-floor`: behavior exists in a proven floor; skin it with project tokens
- `novel`: no floor exists; write the full state machine

## Button

bucket: composition
floor: native button
source: `components/ui/Button.tsx:1`
slots: root, icon, label
axes: variant: primary | secondary; size: sm | md
states: default, hover, focus-visible, active, disabled, loading
motion: 150ms ease-out on color and border
tokens: `--color-surface`, `--color-text`, `--radius-control`, `--motion-duration-control`
status: partial

### Anatomy

The root owns layout, state attributes, and disabled behavior. Icon and label are optional slots.

### State Graph

Default can move to hover, focus-visible, active, disabled, or loading. Disabled blocks pointer and keyboard activation.

### Usage Rules

- Use `variant="primary"` once per decision surface.
- Use `size="sm"` only inside dense toolbars.

### Anti-Patterns

- Do not create `SaveButton`, `DeleteButton`, or `ToolbarButton`; extend Button axes.

### Evidence

- `components/ui/Button.tsx:21` - transition duration
- `components/ui/Button.tsx:33` - loading state
