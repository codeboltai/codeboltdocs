---
sidebar_position: 6
title: Installing MCP Servers
description: Add marketplace, local, or manually configured MCP servers to Codebolt.
---

# Installing MCP Servers

![Installing MCP Servers](/productImages/agent_extensions/install_mcp_server.png)

Codebolt stores MCP server configuration in `mcp_servers.json` under the Codebolt config directory. The server exposes MCP management through the `/mcp` route group; the current CLI does not expose the older end-user `tools install` command family.

## Install from the product UI

Use the MCP server or Tools install surface exposed by your build. Review the server description and permissions, then install it.

Behind the scenes, Codebolt resolves the marketplace item, asks the MCP installer flow to configure it, writes the result into `mcp_servers.json`, tests that the server returns tools, caches those tools, and enables the server only when the tool check succeeds.

## Install from the MCP API

The current server-backed install route is:

```http
POST /mcp/install
Content-Type: application/json

{ "mcpId": "marketplace-server-id" }
```

For local MCP definitions discovered by the server, pass the local name:

```http
POST /mcp/install
Content-Type: application/json

{ "isLocal": true, "uniqueName": "my-local-server" }
```

Useful discovery routes:

```http
GET /mcp/available/list
GET /mcp/available/list/detail/:mcpId
GET /mcp/available/all
GET /mcp/localMcp/list
GET /mcp/getMcpConfig/Path
```

## Manual configuration

Use manual configuration for private MCP servers, development builds, or local binaries. The stored file shape is JSON:

```json
{
  "mcpServers": {
    "my-linter": {
      "command": "/usr/local/bin/my-linter-mcp",
      "args": ["--config", ".linterrc"],
      "env": {
        "LINTER_MODE": "strict"
      }
    }
  },
  "enabled": ["my-linter"]
}
```

The route-backed way to update one server is:

```http
POST /mcp/configure/:serverName
Content-Type: application/json

{
  "command": "/usr/local/bin/my-linter-mcp",
  "args": ["--config", ".linterrc"],
  "env": {
    "LINTER_MODE": "strict"
  }
}
```

When a named server is configured, Codebolt tests whether it can return MCP tools. If tools are returned, the server is added to the enabled list. If it returns no tools or errors during the check, the config is saved but the server is not enabled.

To replace the full configured server map:

```http
POST /mcp/configure
Content-Type: application/json

{
  "my-linter": {
    "command": "/usr/local/bin/my-linter-mcp",
    "args": ["--config", ".linterrc"]
  }
}
```

## Enable or disable a server

Use the toggle route to add or remove a configured server from the enabled list:

```http
POST /mcp/toggle
Content-Type: application/json

{ "serverName": "my-linter", "enabled": true }
```

Use `enabled: false` to disable it without deleting the configuration.

## Verify an install

After installing or configuring a server:

```http
GET /mcp
GET /mcp/:serverName
GET /mcp/configured/mcps
POST /mcp/tools/update
```

The management surface should show the server and its tools after the tool cache updates. If the server is configured but not enabled, check whether the command exists, the arguments are valid, and the server actually speaks MCP and returns at least one tool.

## Security considerations

An MCP server runs code on your machine or calls a remote service using your credentials. Treat installation like adding any other local developer tool:

- Check the source and maintainer.
- Review the tools it exposes before granting agents broad access.
- Store secrets in environment variables, not in project files.
- Add tools only to agents that need them.

## See also

- [Agent Extensions Overview](./01_overview.md)
- [Managing MCP Servers](./07_managing-mcp-servers.md)
- [MCP Tools for Builders](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [MCP and Tools Internals](../../04_build-on-codebolt/07b_subsystems/02_mcp-and-tools.md)
