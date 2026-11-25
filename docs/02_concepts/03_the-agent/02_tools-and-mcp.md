---
displayed_sidebar: getStartedSidebar
sidebar_position: 4
title: Tools and MCP
description: "Agents can only think. Tools are how they act on the world: read a file, run a command, call an API, query a database."
---

import McpTopology from '@site/src/components/diagrams/McpTopology';

# Tools and MCP

Agents can only think. **Tools** are how they act on the world: read a file, run a command, call an API, query a database.

<McpTopology />

## What a tool is

A tool is a named function with a typed input schema and a typed output. The agent's LLM picks tools by name and fills in their arguments; the tool runtime executes them and returns the result.

Tools come from three sources:

1. **Built-in tools** — `codebolt_fs`, `codebolt_terminal`, `codebolt_git`, `codebolt_browser`, etc. Shipped with Codebolt.
2. **MCP servers** — external tool providers speaking the Model Context Protocol. Installed from the marketplace or pointed at directly.
3. **Agent-specific tools** — define a local function with `createTool` and register it in the framework agent’s `tools` array.

## What MCP provides

An MCP server supplies named tools and their input schemas. Configure the server in Codebolt to make its tools available. See [MCP Server](../../02_using-codebolt/04b_agent-extensions/06_mcp-server.md) for setup.

## Choose which tools the model sees

The framework combines available Codebolt tools with the local tools registered on the agent. A nonempty `allowedTools` list filters those tools by their exact function names. For example, after defining the word counter in [Write a Custom Agent Tool](../../04_build-on-codebolt/02_creating-agents/12_custom-agent-tools.md), configure the agent like this:

```ts
const agent = createAgent({
  tools: [countWords],
  allowedTools: ['count_words'],
});
```

Omit the list to offer the local word counter alongside the other available tools. When an agent requests a runtime tool, the active policy profile governs execution. See [Guardrails](../06_quality/01_guardrails.md).

## See also

- [Custom Tools in Using Codebolt](../../02_using-codebolt/04b_agent-extensions/07_custom-tools.md)
- [MCP Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [Built-in tools](../../02_using-codebolt/04b_agent-extensions/07_custom-tools.md#built-in-tools)
