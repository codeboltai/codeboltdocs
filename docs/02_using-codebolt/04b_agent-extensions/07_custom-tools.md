---
sidebar_position: 7
title: Custom Tools
description: Understand built-in tools, create reusable custom tools, and add agent-specific tools for focused workflows.
---

# Custom Tools

Tools are the actions an agent can call while it works. Codebolt gives every agent a built-in tool layer, lets teams add reusable custom tools, and lets framework agents define tools that only exist inside that agent.

Use this page to choose the right tool path:

| Tool type | Use when |
|---|---|
| **Built-in tools** | The agent needs normal Codebolt abilities such as file edits, git, browser control, chat, memory, or agent orchestration. |
| **Custom tools** | You want a reusable typed action that can be shared across agents or exposed through the CodeboltJS tool layer. |
| **Agent-specific tools** | A single framework agent needs private tool logic that does not need to be installed or shared globally. |
| **MCP server** | You need a server-backed integration with install, enable, disable, and tool-cache management. See [MCP Server](./06_mcp-server.md). |

## Built-in tools

Built-in tools ship with the Codebolt server. They require no installation, but agents can only use the tools allowed by their `tools.allow` policy and guardrails.

For exact schemas and signatures, see [Reference -> Built-in Tools](../../05_reference/01_overview.md).

### Built-in tool families

| Family | What it does |
|---|---|
| `codebolt_fs` | Read, write, search, list, and edit files. |
| `codebolt_git` | Git status, diff, logs, branch, add, commit, checkout, clone, pull, and push. |
| `codebolt_code` | Analyze code, format files, and list code definitions. |
| `codebolt_codebase` | Run project-wide semantic search and discover MCP tools for a task. |
| `codebolt_browser` | Navigate, click, type, inspect pages, take screenshots, and open browser debugging. |
| `codebolt_chat` | Send chat messages and read chat history. |
| `codebolt_debug` | Add log points and open browser-based debugging. |
| `codebolt_memory` | Read and write memory entries. |
| `codebolt_state` | Inspect and modify agent run state. |
| `codebolt_agent` | Find, list, inspect, and start other agents. |
| `codebolt_config` | Configure MCP or NRCP settings programmatically. |

### Tool access

Agents declare which tools they can use in `tools.allow`. `deny` rules always win.

```yaml
tools:
  allow:
    - codebolt_fs.*
    - codebolt_git.read_*
    - codebolt_browser.browser_action
  deny:
    - codebolt_fs.write_file
```

Guardrails can still block a tool even when the agent allowlist permits it. Common restrictions include protected git branches, writes outside the workspace root, and writes to protected directories such as `.git/`, `.codebolt/shadow-git/`, or `node_modules/`.

## Create custom tools

Create a custom tool when a workflow needs deterministic code behind a clear tool name and typed input schema. Good custom tools are narrow, explicit, and easy for the model to choose.

Common examples:

- validate a project-specific configuration file
- call an internal API
- generate a standard company artifact
- wrap a frequently used script
- expose a domain-specific lookup

For the full implementation guide, see [Creating Custom Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md).

The builder guide covers:

- defining tool parameters and schemas
- creating the tool invocation
- returning `llmContent` and `returnDisplay`
- registering tools so agents can discover them
- exposing custom tools to MCP clients when needed

## Agent-specific tools

Framework agents can define tools inside the agent implementation itself. Use this when a tool is only useful to that one agent and should not be installed as a shared extension.

Agent-specific tools are useful for:

- private helper actions in a custom agent loop
- one-off workflow steps
- typed wrappers around local agent logic
- tools that depend on the agent's own memory, processors, or runtime state

In framework agents, use the `Tool` class or `createTool` helper with schema validation. See [Framework Agents -> Creating custom tools](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md#creating-custom-tools).

Keep agent-specific tools small. If multiple agents need the same action, promote it to a reusable custom tool or an MCP server.

## Choosing the right extension

| Need | Choose |
|---|---|
| Standard file, git, browser, chat, memory, or agent action | Built-in tool |
| Shared typed function in CodeboltJS | Custom tool |
| Private helper for one framework agent | Agent-specific tool |
| External service integration with install and enable/disable lifecycle | MCP server |
| Prompted reusable behavior with typed inputs | Capability |

## See also

- [MCP Server](./06_mcp-server.md)
- [Capabilities](./02_capabilities.md)
- [Creating Custom Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md)
- [Framework Agents](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md)
- [Reference -> Built-in Tools](../../05_reference/01_overview.md)
