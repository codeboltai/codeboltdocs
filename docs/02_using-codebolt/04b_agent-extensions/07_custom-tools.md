---
sidebar_position: 7
title: Custom Tools
description: Understand built-in tools, create reusable custom tools, and add agent-specific tools for focused workflows.
---

# Custom Tools

Tools are actions an agent can call while it works. Codebolt includes built-in tools for common tasks, supports reusable custom tools for shared workflows, and lets framework agents define private tools for their own logic.

Use this page to understand which tool path to use. For implementation details, follow the linked builder guides.

| Tool type | Use when |
|---|---|
| **Built-in tools** | The agent needs normal Codebolt abilities such as file edits, git, browser control, chat, memory, or agent orchestration. |
| **Reusable custom tools** | You want a typed action that can be shared across agents or exposed through the CodeboltJS tool layer. |
| **Agent-specific tools** | A single framework agent needs private tool logic that does not need to be installed or shared globally. |
| **MCP server** | You need a server-backed integration with install, enable, disable, and tool-cache management. See [MCP Server](./06_mcp-server.md). |

## Tool types

### Built-in Tools

Built-in tools ship with the Codebolt server. The selected agent and active [Policy Profile](../05b_guardrails-and-settings/01_guardrails.md#policy-profiles) determine which tools the agent can use. To see a tool in action, ask your agent to summarize the README in Chat and inspect the recorded file-read activity.

For exact schemas and signatures, see [Reference -> Built-in Tools](../../05_reference/01_overview.md).

Common built-in tool families include:

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

<details>
<summary><strong>Reusable Custom Tools</strong></summary>

Create a reusable custom tool when a workflow needs deterministic code behind a clear tool name and typed input schema. Good custom tools are narrow, explicit, and easy for the model to choose.

Common examples:

- validate a project-specific configuration file
- call an internal API
- generate a standard company artifact
- wrap a frequently used script
- expose a domain-specific lookup

Reusable custom tools are defined in the CodeboltJS tool framework and can be registered so agents can discover and call them.

For the full implementation guide, see [Creating Custom Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md). The builder guide covers:

- defining tool parameters and schemas
- creating the tool invocation
- returning `llmContent` and `returnDisplay`
- registering tools so agents can discover them
- exposing custom tools to MCP clients when needed

</details>

<details>
<summary><strong>Agent-Specific Tools</strong></summary>

Framework agents can define tools inside the agent implementation itself. Use this when a tool is only useful to that one agent and should not be installed as a shared extension.

Agent-specific tools are useful for:

- private helper actions in a custom agent loop
- one-off workflow steps
- typed wrappers around local agent logic
- tools that depend on the agent's own memory, processors, or runtime state

In framework agents, use the `Tool` class or `createTool` helper with schema validation. See [Write a custom agent tool](../../04_build-on-codebolt/02_creating-agents/12_custom-agent-tools.md).

Keep agent-specific tools small. If multiple agents need the same action, promote it to a reusable custom tool or an MCP server.

</details>

<details>
<summary><strong>MCP-Backed Tools</strong></summary>

Use an MCP server when a tool should be installed, configured, enabled, disabled, refreshed, or shared as a server-backed integration. MCP-backed tools are better for external services, local binaries, third-party integrations, and project-local servers that should be managed through the MCP lifecycle.

For MCP installation, local MCP servers, custom server configuration, and tool cache management, see [MCP Server](./06_mcp-server.md).

</details>

## How tools are used

Agents can access tools in several ways:

- **Allowed tool policy** controls which built-in or registered tools an agent may call.
- **Tool search** helps agents discover relevant tools for a task.
- **Framework agent code** can provide agent-specific tools directly.
- **MCP selection** can expose tools from installed or mentioned MCP servers.

## Tool access and guardrails

For a framework agent, set `allowedTools` in `createAgent` to choose which tools to offer the model. Use the exact tool names. A nonempty list filters both the agent’s own tools and the Codebolt tools available to it.

For example, after defining the [word-count tool](../../04_build-on-codebolt/02_creating-agents/12_custom-agent-tools.md), you can offer just that tool:

```ts
import { createAgent } from '@codebolt/agent/unified';
import { countWords } from './count-words';

const agent = createAgent({
  systemPrompt: 'Use the word counter when asked for a count.',
  tools: [countWords],
  allowedTools: ['count_words'],
});
```

To offer the word counter alongside the default tools available to the agent, omit `allowedTools`. The active policy profile can still deny a tool request or require approval. For example, a profile can deny file writes even when a file tool is available to the agent. See [Guardrails](../05b_guardrails-and-settings/01_guardrails.md).

## Choosing the right tool type

| Need | Choose |
|---|---|
| Standard file, git, browser, chat, memory, or agent action | Built-in tool |
| Shared typed function in CodeboltJS | Custom tool |
| Private helper for one framework agent | Agent-specific tool |
| External service integration with install and enable/disable lifecycle | MCP server |
| Prompted reusable behavior with typed inputs | Capability |

## Create or learn more

- To create a reusable custom tool, see [Creating Custom Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md).
- To create a custom MCP server, see [Build Your First MCP Server](../../03_guides/05_mcp-and-tools/build-your-first-mcp-server.md).
- To define private tools inside a framework agent, see [Write a custom agent tool](../../04_build-on-codebolt/02_creating-agents/12_custom-agent-tools.md).
- For built-in tool schemas and signatures, see [Reference -> Built-in Tools](../../05_reference/01_overview.md).

## See also

- [MCP Server](./06_mcp-server.md)
- [Capabilities](./02_capabilities.md)
- [Creating Custom Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md)
- [Write a custom agent tool](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md)
- [Reference -> Built-in Tools](../../05_reference/01_overview.md)
