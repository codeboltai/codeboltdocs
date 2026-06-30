---
sidebar_position: 7
title: Managing MCP Servers
description: Inspect configured MCP servers, toggle them on or off, refresh tool caches, and troubleshoot configuration.
---

# Managing MCP Servers

Once an MCP server is installed or configured, Codebolt manages it through the `/mcp` route group and the product MCP management surfaces. The current CLI does not expose the older runtime `tools start`, `tools logs`, or `tools update` command family.

## What you can manage

The current server-backed management model covers:

- configured MCP server entries
- enabled or disabled state
- available marketplace/local MCP metadata
- cached tools from enabled MCP servers
- browser navigation helper used by MCP-related flows

It does not expose the older tool lifecycle, log streaming, or update route family described in earlier drafts.

## Inspect configuration and tools

Use these routes to inspect MCP state:

```http
GET /mcp
GET /mcp/:serverName
GET /mcp/configured/mcps
GET /mcp/getMcpConfig/Path
```

Use `GET /mcp` for the installed server list, `GET /mcp/:serverName` for one stored config, and `GET /mcp/configured/mcps` for the currently cached tools.

## Enable and disable

Enable or disable a configured MCP server with:

```http
POST /mcp/toggle
Content-Type: application/json

{ "serverName": "my-linter", "enabled": false }
```

Disabling removes the server name from the enabled list but keeps its configuration in `mcp_servers.json`.

## Update configuration

Update a single server config:

```http
POST /mcp/configure/:serverName
Content-Type: application/json

{
  "command": "/usr/local/bin/my-linter-mcp",
  "args": ["--config", ".linterrc"]
}
```

Replace the full configured server map:

```http
POST /mcp/configure
Content-Type: application/json

{
  "my-linter": {
    "command": "/usr/local/bin/my-linter-mcp"
  }
}
```

For named configuration updates, Codebolt checks whether the server returns tools before enabling it.

## Refresh tool cache

After changing configuration, refresh the MCP tools cache:

```http
POST /mcp/tools/update
```

If the server returns tools, those tools become available to agents that are allowed to use them.

## Available and local MCP servers

Use these routes when browsing what can be installed:

```http
GET /mcp/available/list
GET /mcp/available/list/detail/:mcpId
GET /mcp/available/all
GET /mcp/localMcp/list
POST /mcp/refreshIndex
```

Use `POST /mcp/install` to install an available or local MCP entry, as described in [Installing MCP Servers](./06_installing-mcp-servers.md).

## Troubleshooting

If a configured server does not appear as enabled:

1. Confirm the server exists with `GET /mcp/:serverName`.
2. Confirm the command path and args are valid.
3. Run `POST /mcp/tools/update`.
4. Check whether the server returns at least one MCP tool.
5. Confirm the active agent is allowed to use the relevant tool namespace.

If the server is disabled intentionally, re-enable it with `POST /mcp/toggle`.

## See also

- [Agent Extensions Overview](./01_overview.md)
- [Installing MCP Servers](./06_installing-mcp-servers.md)
- [Agent Tools](../05a_tools-and-mcp/01_overview.md)
- [MCP and Tools Internals](../../04_build-on-codebolt/07b_subsystems/02_mcp-and-tools.md)
