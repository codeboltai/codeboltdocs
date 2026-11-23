---
sidebar_position: 1
title: Agent Extensions Overview
description: Agent extensions are the shared primitives that any Codebolt agent can use without the agent author having to build them
---

# Agent Extensions

Agent extensions are the **shared primitives** that any Codebolt agent can use without the agent author having to build them. You author the extension once, register it with the server, and every agent — remixed, framework, `codeboltjs`, third-party — can discover and invoke it.

The test: *can you change this without rewriting the agent?* If yes, it belongs here. If no, it belongs in [Creating Agents](../02_creating-agents/01_overview.md).

## The extension primitives

| Extension | What it is | When to use | Reference |
|---|---|---|---|
| **Capabilities** | Downloadable bundles — prompt snippets, skills, tools, config, grouped and versioned | Ship a unit of agent behaviour across projects or the marketplace | [Capabilities](./02_capabilities/01_overview.md) |
| **Skills** | Specialised sub-handlers an agent can delegate to for a specific task | Narrow, reusable competencies ("refactor-to-pattern", "write-adr", "summarise-pr") | [Skills](./03_skills/01_overview.md) |
| **MCP tools** | Tools exposed over the Model Context Protocol | Add MCP tools to a project or build new MCP servers for agents | [MCP Tools](./04_mcp-tools/01_overview.md) |
| **Action blocks** | Reusable, parameterised step templates registered with the server | Structured multi-step operations (run tests, deploy, open PR) | [Action Blocks](./05_action-blocks/01_overview.md) |
| **Side execution** | Fire-and-forget / background work spawned alongside a main run | Long-running analyses, parallel scouts, async enrichment | [Side Execution](./07_side-execution.md) |
| **Subagents** | Delegated child agents called synchronously | Decomposing a large task into typed child tasks with their own loops | [Subagents](./08_subagents.md) |

## Why "extensions" and not "plugins"

Extensions run *inside the agent loop* — they're pulled in when an agent needs them. Plugins (covered in the top-level [Plugins](../05_plugins/01_overview.md) section) extend the **application** — they add new server behaviours, UI panels, hooks, providers, etc. You can build a plugin that registers new extensions (e.g. a plugin that publishes a new skill pack); the plugin is the delivery mechanism, the skills are the extensions.

## A mental model

```
┌───────── agent runtime ─────────┐
│  your agent's code              │
│  ↓                              │
│  ctx.skills.call("refactor")    │ ← skill (extension)
│  ctx.capabilities.activate(...) │ ← capability (extension)
│  ctx.tools.call("db.query")     │ ← MCP tool (extension)
│  ctx.blocks.run("deploy-flow")  │ ← action block (extension)
│  ctx.side.spawn(...)            │ ← side execution (extension)
│  ctx.children.start(...)        │ ← subagent (extension)
└─────────────────────────────────┘
```

All of these are resolved at runtime from the server's registry. The agent doesn't hard-code implementations — it asks for an extension by name and gets whatever's registered today.

## Authoring vs. consuming

Every page in this section has two sides:

- **Consuming** — how your agent uses the primitive (usually one-line call on `ctx.*`).
- **Authoring** — how you register a new instance of it (metadata, entry point, schema, packaging).

Read the consuming half first even if you're planning to author. Knowing how agents call an extension shapes what shape you should give it.

## See also

- [Creating Agents](../02_creating-agents/01_overview.md) — writing the agent that consumes these
- [Plugins](../05_plugins/01_overview.md) — packaging and distributing extensions
- [MCP Tools](./04_mcp-tools/01_overview.md) — adding and authoring MCP tools
