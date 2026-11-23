---
sidebar_position: 1
title: Skills
description: A skill is a named, reusable competency an agent can call for a narrow task. A tool does one mechanical thing. A skill does one cognitive thing.
---

# Skills

A **skill** is a named, reusable competency an agent can call for a narrow task. A tool does one mechanical thing. A skill does one cognitive thing.

Skills are the right unit when you want a reusable agent behavior without creating a whole new agent.

## In This Section

- [Creating a skill](./02_creating-a-skill.md)
- [Handler types](./03_handler-types.md)
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
  file: "src/handler.ts",
  pattern: "adapter",
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
  { file: "src/handler.ts", pattern: "adapter" },  // params
  30000                   // timeout in ms (optional)
);

// Check execution status
const status = await codebolt.capability.getExecutionStatus(res.executionId);

// Stop a running capability
await codebolt.capability.stopCapability(res.executionId);
```

## Skill vs. tool vs. subagent

| Axis | Tool | Skill | Subagent |
|---|---|---|---|
| **Granularity** | Atomic operation | Cognitive task | Full task |
| **LLM involved** | No | Maybe | Yes |
| **Own reasoning loop** | No | No unless implemented that way | Yes |
| **Cost** | Low | Low-moderate | High |

When in doubt, start with a skill. Promote to a subagent only when separate reasoning state is worth the cost.

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

Skills support two configuration formats depending on where they live:

- **`capability.yaml`** — full config with inputs, outputs, author, tags. Used in `.codebolt/capabilities/` paths.
- **`SKILL.md`** — YAML frontmatter with optional markdown body. Used in `.claude/skills/` and `.agents/skills/` paths.

See [Creating a skill](./02_creating-a-skill.md) for details on both formats.

## See also

- [Capabilities](../02_capabilities/01_overview.md)
- [Subagents](../08_subagents.md)
