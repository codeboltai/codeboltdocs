---
sidebar_position: 3
title: Tool Commands
description: Run CodeBolt as an MCP server and inspect MCP tools on a running CodeBolt server.
---

# MCP Server Commands

## Run CodeBolt as an MCP server

Start the CodeBolt runtime, then configure your MCP client to run:

```bash
codebolt mcp start --gateway-port 2719
```

This command uses stdio by default. Use `codebolt mcp start --help` for the gateway URL, transport, and port options.

## Runtime tool management

Manage installed integrations from **Settings → MCP Servers** in the desktop app. Use the CLI to inspect the MCP servers and tools visible to a running CodeBolt server:

```bash
codebolt command mcp list-servers
codebolt command mcp get-tools
```

Use `codebolt command mcp --help` to see the currently registered MCP gateway tools.

## Build and publish tool extensions

```bash
codebolt action tool create --name my-tool
codebolt action tool publish --path ./my-tool
codebolt action tool list
```

See [MCP Servers](../../../04b_agent-extensions/06_mcp-server.md) for installing and configuring MCP integrations.
