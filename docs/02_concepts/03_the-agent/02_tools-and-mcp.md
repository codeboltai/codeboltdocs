---
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
3. **Custom tools** — your own MCP server or a local tool plugin.

## What MCP is

The **Model Context Protocol** is a standard for letting LLM agents talk to external tool providers. An MCP server is a process that exposes a set of tools (and optionally resources and prompts) over a small JSON-RPC protocol.

Why it matters:
- One tool, many runtimes — write a GitHub MCP server once, use it from any MCP-aware agent.
- Sandboxed — tool servers run in their own process, can be killed, restarted, sandboxed.
- Versionable — install `marketplace/github-mcp@1.2.3` like a package.

Codebolt is MCP-native: built-in tools are exposed as MCP tools internally, and external MCP servers are first-class.

## How tools get to agents

```
Agent manifest declares:    tools.allow: [codebolt_fs.*, github.create_pr]
                                       │
                                       ▼
Tool runtime resolves:      built-in fs + github MCP server
                                       │
                                       ▼
Agent's LLM sees:           an OpenAI-style tools array
                                       │
                                       ▼
LLM calls:                  github.create_pr({...})
                                       │
                                       ▼
Guardrails vet, runtime executes, result returned
```

## Allowlists, not blocklists

Agents declare which tools they're allowed to call. The default is **deny**. This is the single most important safety property — an agent can't call a tool you didn't grant it.

## See also

- [Custom Tools in Using Codebolt](../../02_using-codebolt/04b_agent-extensions/07_custom-tools.md)
- [MCP Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [Built-in tools](../../02_using-codebolt/04b_agent-extensions/07_custom-tools.md#built-in-tools)
