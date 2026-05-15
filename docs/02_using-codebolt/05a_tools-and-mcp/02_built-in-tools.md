---
sidebar_position: 2
title: Built-in Tools
description: Tools that ship with the Codebolt server. These always exist — no installation needed. Agents can use them subject to their allowlist.
---

# Built-in Tools

Tools that ship with the Codebolt server. These always exist — no installation needed. Agents can use them subject to their allowlist.

For exact schemas and signatures, see [Reference → Built-in Tools](../../05_reference/01_overview.md). This page is the overview.

## Tool families

### `codebolt_fs` — filesystem
- `read_file`, `read_many_files` — read file contents
- `write_file`, `edit_file` — create or modify files
- `list_files`, `list_directory` — directory listing
- `search`, `grep_search`, `fuzzy_file_search` — find text or files
- `list_code_definitions` — symbols in a file

### `codebolt_git` — git
- `status`, `diff`, `logs`, `branch` — read operations
- `add`, `commit`, `checkout`, `init`, `clone`, `pull`, `push` — write operations

Also integrates with shadow git for checkpoint support.

### `codebolt_code` — code analysis
- `analyze_code` — semantic analysis of a file
- `format` — run a formatter
- `list_code_definitions` — symbols (also available under `codebolt_fs`)

### `codebolt_codebase` — project-wide queries
- `codebolt_search` — semantic search across the whole codebase
- `search_mcp_tool` — find relevant MCP tools for a task

### `codebolt_browser` — browser control
- `browser_action` — navigate, click, type, read page content
- `debug_open_browser` — open a debugger in the browser

### `codebolt_chat` — chat integration
- `send_chat_message` — post to the current thread
- `get_chat_history` — read prior turns

### `codebolt_debug` — debugging
- `debug_add_log` — inject a log point
- `debug_open_browser` — browser-based debugging

### `codebolt_memory` — memory access
- `memory_get` — read a memory entry
- `memory_set` — write one

Wraps the memory layers with a single tool-accessible surface.

### `codebolt_state` — run state
- `state_add_agent` — add a sibling agent to the run state
- (and other state-manipulation tools)

### `codebolt_agent` — agent management
- `find` — search for available agents
- `list` — list installed agents
- `get_detail` — inspect an agent's manifest
- `start` — spawn a child agent run

This is how multi-agent orchestration happens at runtime.

### `codebolt_config` — configuration
- `configure_mcp`, `configure_nrcp` — set MCP server config programmatically

## Tool naming conventions

The `codebolt_` prefix identifies built-ins. Within a family, tools are named by verb:

- `codebolt_fs.read_file` — verb is `read_file`
- `codebolt_git.commit` — verb is `commit`

Some families have legacy aliases (`codebolt_basic.*`, `codebolt.*`). The canonical names are the `codebolt_<family>` ones.

## Tool descriptions

Every tool has a description the LLM reads to decide when to call it. For custom agents, you can override these descriptions to steer behaviour — see [Unified Agent → Overriding tool descriptions](../../04_build-on-codebolt/02_creating-agents/06_patterns/unified-agent.md#overriding-tool-descriptions).

## Allowlisting

Agents declare which tools they can use in their `tools.allow` list. Glob patterns work:

```yaml
tools:
  allow:
    - codebolt_fs.*          # all fs tools
    - codebolt_git.read_*    # only read-side git
    - codebolt_browser.browser_action  # just one
  deny:
    - codebolt_fs.write_file # explicit block
```

`deny` wins over `allow`.

## Guardrail restrictions

Even when an agent's allowlist permits a tool, guardrails can block specific calls. Default guardrails include:

- No writes to `.git/`, `.codebolt/shadow-git/`, or `node_modules`.
- No shell commands matching known dangerous patterns.
- No `codebolt_git.push` to protected branches.
- No writes outside the workspace root.

See [Guardrails & Eval (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/09_guardrails-and-eval.md).

## Extending the built-ins

You can't add to the built-in set without modifying the server, but you can:

- **Install an MCP server** that provides additional tools in a new namespace.
- **Install a capability bundle** that bundles tools with prompts.
- **Write a hook** that transparently modifies built-in tool behaviour.

See [MCP Tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md).

## See also

- [Agent Tools Overview](./01_overview.md)
- [Reference → Built-in Tools](../../05_reference/01_overview.md) — full schemas
- [MCP & Tools (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/02_mcp-and-tools.md)
