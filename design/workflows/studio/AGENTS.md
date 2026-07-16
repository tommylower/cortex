# studio

this folder is an agent skill in the [Agent Skills](https://agentskills.io/specification.md) format. it is agent-agnostic: any agent that reads markdown can run it, no claude-specific machinery.

if your harness loads skills automatically, nothing to do. otherwise, before any design work in this project:

1. read `SKILL.md`. it is the entry point: the reading order (rules.md, then playbook.md, then the doctrine and inventory files the session pulls for) and the loop to enforce.
2. treat `rules.md` as law. on any conflict with a supplier, a tool default, or your own taste, the law wins.
