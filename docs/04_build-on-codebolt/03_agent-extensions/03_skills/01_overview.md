---
sidebar_position: 1
title: Skills
description: A skill packages reusable instructions for an agent.
---

# Skills

A **skill** packages reusable instructions for an agent in a file named `SKILL.md`.

Skills are the right unit when you want a reusable agent behavior without creating a whole new agent.

## In This Section

- [Creating a skill](./02_creating-a-skill.md)
- [How skills run](./03_handler-types.md)
- [Testing and debugging](./04_testing-and-debugging.md)
- [Publishing](./05_publishing.md)

## When to reach for a skill

- You keep repeating the same prompt pattern across agents.
- One task recurs across projects and needs consistent behavior.
- You want agents composed from named competencies instead of one large prompt.
- You want something lighter than a subagent, but richer than a tool.

## Consuming from an agent

Agents call skills through the `@codebolt/codeboltjs` capability module:

```ts
import codebolt from '@codebolt/codeboltjs';

// Start a skill by name
const response = await codebolt.capability.startSkill("refactor-to-pattern", {
  arguments: "Refactor src/handler.ts to use the adapter pattern",
});

// response.success — whether execution succeeded
// response.result  — the skill's output
// response.executionId — unique ID for tracking
```

Other available methods:

```ts
// List all skills
const skills = await codebolt.capability.listSkills();

// Start any capability by type
const res = await codebolt.capability.startCapability(
  "refactor-to-pattern",  // name
  "skill",                // type
  { arguments: "Refactor src/handler.ts to use the adapter pattern" },  // params
  30000                   // timeout in ms (optional)
);

// Check execution status
const status = await codebolt.capability.getExecutionStatus(res.executionId);

// Stop a running capability
await codebolt.capability.stopCapability(res.executionId);
```

## How skills are loaded

Codebolt discovers skills automatically from the filesystem at multiple locations, checked in priority order (highest priority wins when names collide):

| Priority | Location | Scope |
|---|---|---|
| 1 (highest) | `<project>/.codebolt/capabilities/skill/` | Project |
| 2 | `~/.codebolt/capabilities/skill/` | Global (all projects) |
| 3 (lowest) | `{appRoot}/.codebolt/capabilities/skill/` | Built-in |

Additionally, skills are discovered from these special directories (added if no name conflict exists):

- `<project>/.claude/skills/` — uses `SKILL.md` format
- `<project>/.agents/skills/` — uses `SKILL.md` format
- `~/.gemini/antigravity/skills/` — uses `SKILL.md` format

### Resolution rules

- Skills are keyed by `type:name`. A project-level skill with the same name replaces a global one.
- The capability registry is lazy-initialized on first API call, then can be refreshed on demand via `POST /capability/refresh`.
- Invalid skills (missing directory, unparseable config) are logged as warnings and excluded.

### Configuration formats

The registry uses metadata to discover skills. The built-in executor reads the instructions from `SKILL.md`.

- **`capability.yaml`** — full config with inputs, outputs, author, tags. Used in `.codebolt/capabilities/` paths.
- **`SKILL.md`** — Markdown instructions with optional YAML frontmatter. Also discovered in `.claude/skills/` and `.agents/skills/` paths.

See [Creating a skill](./02_creating-a-skill.md) for details on both formats.

## See also

- [Capabilities](../02_capabilities/01_overview.md)
- [Subagents](../08_subagents.md)
