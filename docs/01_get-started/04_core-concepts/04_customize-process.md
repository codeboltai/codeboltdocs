---
sidebar_position: 4
title: Customize Process
description: "Shape Codebolt behavior with custom agents, MCP servers, capabilities, skills, hooks, and action blocks."
---

# Customize Process

Once the basic loop works, the next step is making it behave like your team. In Codebolt, process customization usually happens through agents, MCP servers, capabilities, skills, hooks, and action blocks.

## Custom agents

A custom agent packages instructions, model choices, tool permissions, and process assumptions into a reusable worker.

Use a custom agent when you want consistent behavior for a recurring job:

- code review
- test generation
- migration planning
- documentation updates
- support triage
- release preparation

To create a new agent, follow the [Custom Agent Quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md). To adapt an existing agent’s instructions, see [Remix](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-3-remix.md).

## MCP servers

MCP servers expose external tools and resources to agents. They are the standard way to connect Codebolt to systems such as databases, internal APIs, project trackers, source control services, observability systems, or document stores.

Use MCP when the agent needs to do something outside the built-in Codebolt tool set.

## Capabilities

A capability is a named behavior that an executor can run. For example, the built-in skill executor loads instructions from a skill. If your release process needs an issue-tracker tool or protected-branch policy, configure the MCP server and policy profile separately. See [Capabilities](../../02_concepts/03_the-agent/03_capabilities.md).

## Hooks, skills, and action blocks

| Extension point | Use it when |
|---|---|
| **Hooks** | You need to observe, rewrite, block, or approve actions at runtime. |
| **Skills** | You need reusable task knowledge, procedures, or domain guidance. |
| **Action blocks** | You want packaged, reusable actions that agents can execute. |

These mechanisms let you shape how work happens without forcing every user to remember the process manually.

## A useful order of customization

1. Tune the agent prompt and model.
2. Restrict or expand tool access.
3. Add MCP servers for missing systems.
4. Package repeated behavior as capabilities or skills.
5. Add hooks and guardrails where policy must be enforced.
6. Build custom agent code only when configuration is no longer enough.

## See also

- [Build your first agent](../../03_guides/02_first-steps/build-your-first-agent.md)
- [Agent Extensions](../../02_using-codebolt/04b_agent-extensions/01_overview.md)
- [MCP Server](../../02_using-codebolt/04b_agent-extensions/06_mcp-server.md)
- [Capabilities](../../02_using-codebolt/04b_agent-extensions/02_capabilities.md)
