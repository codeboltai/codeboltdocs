---
sidebar_position: 4
title: Customize Process
description: "Shape Codebolt behavior with custom agents, MCP servers, capabilities, skills, hooks, and action blocks."
---

# Customize Process

Once the basic loop works, the next step is making it behave like your team. In Codebolt, process customization usually happens through agents, MCP servers, capabilities, skills, hooks, and action blocks.

## Custom agents

A custom agent packages instructions, model choices, tool permissions, budgets, and process assumptions into a reusable worker.

Use a custom agent when you want consistent behavior for a recurring job:

- code review
- test generation
- migration planning
- documentation updates
- support triage
- release preparation

Start by remixing an existing agent when the behavior is mostly prompt and permission changes. Build a deeper custom agent when you need custom runtime logic.

## MCP servers

MCP servers expose external tools and resources to agents. They are the standard way to connect Codebolt to systems such as databases, internal APIs, project trackers, source control services, observability systems, or document stores.

Use MCP when the agent needs to do something outside the built-in Codebolt tool set.

## Capabilities

A **capability** is a packaged ability that can combine tools, prompts, skills, and configuration. Capabilities are useful when you want to grant a coherent behavior rather than a loose list of tools.

For example, a "release management" capability might include:

- access to the git and terminal tools
- an MCP server for the issue tracker
- release-note writing instructions
- guardrails around protected branches
- a checklist skill for versioning and verification

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
- [Installing MCP servers](../../02_using-codebolt/04b_agent-extensions/06_installing-mcp-servers.md)
- [Capabilities](../../02_using-codebolt/04b_agent-extensions/02_capabilities.md)
