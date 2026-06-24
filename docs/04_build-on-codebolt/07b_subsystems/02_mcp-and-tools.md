---
sidebar_position: 2
title: MCP & Tools
description: "Source code: packages/server/src/MCPServers/, controllers/{mcpServer,capability,extension,hooks}Controller,."
---

# MCP & Tools Subsystem

This subsystem is how agents *do* anything: read files, run shells, call APIs, control browsers, query databases. It unifies three families of capability under a single tool-call interface.

> **Source code:** `packages/server/src/MCPServers/`, `controllers/{mcpServer,capability,extension,hooks}Controller`, `services/{mcp,tool,capabilityRegistry,providerRegistry,extension,plugin}Service`, `services/hooks/`, `managers/{Capability,PluginProcess}Manager`.

## The three flavours of "tool"

| Kind | Lives where | Used for |
|---|---|---|
| **Built-in tools** | Inside the server (`toolService`) | Filesystem, git, browser, chat, debug, memory, state — the things every agent needs. |
| **MCP servers** | External processes, supervised by `PluginProcessManager` | Anything community/3rd-party. Standard MCP protocol. |
| **Capabilities** | Downloaded bundles, registered via `capabilityRegistry` | Larger units — e.g. a "Stripe integration" that bundles tools + prompts + UI. |

From an agent's point of view all three look identical: a typed function that the LLM can call.

## Components

### `mcpService`
Speaks MCP to external servers, multiplexes connections, handles handshake/list/call/cancel.

### `toolService`
The single entry point used by the agent loop. Resolves a tool name to whichever family it belongs to, validates parameters, runs the call, returns a structured result. Streaming results are supported.

### `capabilityRegistry` + `CapabilityManager` + `capabilityDownloadHandler`
Discover, install, version, and update capability bundles. Bundles can declare tools, prompts, hooks, and UI panels in one package.

### `providerRegistryService`
Tracks which MCP servers / capabilities are available in the current workspace and which are healthy.

### `extensionService` + `extensionController`
Long-form extensions (richer than capabilities) — used for things that need their own UI.

### `pluginService` + `PluginProcessManager`
Process supervision for everything external. Restarts crashed plugins, enforces resource limits, captures logs.

### Hooks pipeline (`services/hooks/`, `hooksController`)
Lets extensions intercept events at well-defined points: before tool call, after tool call, before LLM, on file save, on commit, etc. Hooks are how extensions add behavior without owning the whole loop.

## What an agent sees

```ts
// inside the agent loop
const result = await toolService.call({
  tool: "codebolt_fs.read_file",
  args: { path: "src/index.ts" },
});
```

The agent doesn't know — and shouldn't care — whether `codebolt_fs.read_file` is a built-in, a remote MCP server, or part of a downloaded capability.

## Built-in tool families

These ship with the server. Each gets a reference page under [Build Tools → Reference](../../02_using-codebolt/05_tools-and-mcp/04_built-in-tools.md).

- `codebolt_fs` — filesystem read/write/search/grep
- `codebolt_git` — full git surface plus shadow git
- `codebolt_browser` — headless browser control
- `codebolt_chat` — read history, send messages
- `codebolt_code` — analyse, format, list definitions
- `codebolt_debug` — open browser debugger, add log points
- `codebolt_memory` — get/set across the memory layers
- `codebolt_state` — manipulate run state (e.g. add a peer agent)
- `codebolt_agent` — find / start / inspect other agents

## Hooks

Hooks are the extension point most teams use first. They're cheap to write and don't require building a full agent or MCP server.

```yaml
# example: forbid writes to /infra outside of business hours
hook: before_tool_call
match: { tool: "codebolt_fs.write_file", path_prefix: "infra/" }
action: deny_outside_hours
```

See [Hooks](../05_plugins/01_overview.md) for the full hook lifecycle.

## See also

- [Build Tools / MCP](../03_agent-extensions/04_mcp-tools/01_overview.md) — how to author your own.
- [Tool call end-to-end](../02_architecture/04_data-flow-walkthroughs/tool-call-end-to-end.md) — annotated trace.
- [Guardrails](./09_guardrails-and-eval.md) — why a tool call may be blocked.
