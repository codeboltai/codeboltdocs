---
sidebar_position: 1
title: Agent Extensions Overview
description: Choose tools, skills, capabilities, and action blocks for a Codebolt agent, or delegate work to a subagent.
---

# Agent Extensions

Choose an extension based on what the agent needs to do and who needs access to it.

| What you want to do | Where to start |
| --- | --- |
| Give one framework agent a function | Define the function with `createTool` and add it to the agent’s `tools` list. [Write a custom agent tool](../02_creating-agents/12_custom-agent-tools.md). |
| Call an available project MCP tool | Expose it through a project MCP server. Discover it with `codebolt.tools.listRuntimeTools()` and pass the returned tool name and arguments to `codebolt.tools.execute(tool.name, args)`. [Create a project tool](./04_mcp-tools/02_quickstart-local-mcp.md). |
| Use Codebolt tools in another MCP client | Configure that client to launch `codebolt mcp start` against the project server. [Connect an external MCP client](./04_mcp-tools/02_quickstart-local-mcp.md#approach-2-mcp-server-via-codeboltjs-api). |
| Give agents reusable instructions | [Create a skill](./03_skills/02_creating-a-skill.md) and invoke it with `codebolt.capability.startSkill(skillName, params)`. |
| Package behavior with an executor | [Define a capability](./02_capabilities/01_overview.md) and start it with `codebolt.capability.startCapability(name, type, params)`. |
| Run a reusable operation with inputs and a result | [Write an action block](./05_action-blocks/03_authoring.md) and invoke it with `codebolt.actionBlock.start(name, params)`. |
| Delegate work during an agent run | [Start a subagent](./08_subagents.md) with `codebolt.agent.startAgent(agentId, task)`, or [use side execution](./07_side-execution.md) to run code or an action block alongside the parent. |

## See also

- [Creating Agents](../02_creating-agents/01_overview.md) — writing the agent that consumes these
- [Plugins](../05_plugins/01_overview.md) — adding features to the Codebolt application
- [MCP Tools](./04_mcp-tools/01_overview.md) — adding and authoring MCP tools
