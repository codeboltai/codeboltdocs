---
sidebar_position: 3
title: Tool Commands
description: The current CLI exposes tool extension authoring commands, but not the older end-user MCP lifecycle command set.
---

# Tool Commands

The current CLI does not expose the older end-user runtime tool-management command family.

Today, tool-related CLI work is split into:

- `codebolt action tool ...` for creating and publishing tool extensions
- desktop or TUI surfaces for installing and managing MCP servers at runtime

## Build and publish tool extensions

The implemented tool authoring commands are:

```bash
codebolt action tool create --name my-tool
codebolt action tool publish --path ./my-tool
codebolt action tool list
```

These commands are for extension builders, not for operating installed MCP servers in a workspace.

## Runtime tool management

The current `packages/cli` code does not expose dedicated runtime commands for:

- installing an MCP server
- uninstalling an MCP server
- starting or stopping a server
- tailing MCP server logs
- directly invoking a tool from the CLI

Use the desktop or TUI product surfaces for runtime MCP installation and management.

## See also

- [Installing MCP Servers](../../04b_agent-extensions/06_installing-mcp-servers.md)
- [Managing MCP Servers](../../04b_agent-extensions/07_managing-mcp-servers.md)
