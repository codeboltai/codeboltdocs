---
sidebar_position: 3
title: Tool Commands
description: Use action tool commands for authoring tool extensions and command mcp for runtime MCP management.
---

# Tool Commands

Today, tool-related CLI work is split into:

- `codebolt action tool ...` for creating and publishing tool extensions
- `codebolt command mcp ...` for runtime MCP server discovery, install, and management

## Build and publish tool extensions

The implemented tool authoring commands are:

```bash
codebolt action tool create --name my-tool
codebolt action tool publish --path ./my-tool
codebolt action tool list
```

These commands are for extension builders, not for operating installed MCP servers in a workspace.

## Runtime tool management

Use `codebolt command mcp` when you want to operate MCP servers from the CLI:

| Command | Purpose |
|---|---|
| [`codebolt command mcp available`](#available-registry-mcps) | List registry MCP servers available for installation |
| [`codebolt command mcp install --id <mcpId>`](#install-registry-mcp) | Install a registry MCP by ID |
| [`codebolt command mcp install --name <registryName>`](#install-registry-mcp) | Install a registry MCP by name |
| [`codebolt command mcp local`](#local-project-mcps) | List local project MCP tools |
| [`codebolt command mcp install-local --name <uniqueName>`](#install-local-mcp) | Install a local project MCP |
| [`codebolt command mcp list`](#list-installed-mcps) | List installed MCP servers |
| [`codebolt command mcp tools`](#list-mcp-tools) | List cached configured MCP tools |
| [`codebolt command mcp refresh`](#refresh-mcp-tools) | Refresh MCP tool cache |
| [`codebolt command mcp enable --name <serverName>`](#enable-or-disable-mcp) | Enable an installed MCP server |
| [`codebolt command mcp disable --name <serverName>`](#enable-or-disable-mcp) | Disable an installed MCP server |

### Available registry MCPs

```bash
codebolt command mcp available
```

### Install registry MCP

```bash
codebolt command mcp install --id <mcpId>
codebolt command mcp install --name <registryName>
```

### Local project MCPs

```bash
codebolt command mcp local
```

### Install local MCP

```bash
codebolt command mcp install-local --name <uniqueName>
```

### List installed MCPs

```bash
codebolt command mcp list
```

### List MCP tools

```bash
codebolt command mcp tools
```

### Refresh MCP tools

```bash
codebolt command mcp refresh
```

### Enable or disable MCP

```bash
codebolt command mcp enable --name <serverName>
codebolt command mcp disable --name <serverName>
```

## See also

- [MCP Server](../../../04b_agent-extensions/06_mcp-server.md)
