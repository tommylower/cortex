# Components

## Component Intake Rule

Classify every new idea before building:

- `composition`: arrangement of existing parts
- `headless-floor`: behavior exists in a proven floor; skin it with project tokens
- `novel`: no floor exists; write the full state machine

## {{ComponentName}}

bucket: composition | headless-floor | novel
floor: {{engine primitive + doc link}} | none - state machine described below
source: `{{file:line}}`
slots: {{named parts, in order}}
axes: {{closed variant axes and values}}
states: {{default, hover, focus-visible, active, disabled, loading, success, error, empty, open, closed}}
motion: {{transition numbers from code}}
tokens: {{semantic token names; no raw values}}
status: draft | partial | ready

### Anatomy

{{slot structure and ownership}}

### State Graph

{{state transitions, keyboard behavior, focus behavior, aria behavior}}

### Usage Rules

- {{rule}}

### Anti-Patterns

- {{anti_pattern_seen_in_code}}

### Evidence

- `{{file:line}}` - {{evidence}}
