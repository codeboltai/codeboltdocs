---
sidebar_position: 6
title: MCP Server
description: Install, configure, enable, inspect, and troubleshoot MCP servers in Codebolt.
---

# MCP Server

<!-- ![MCP Server](/productImages/agent_extensions/install_mcp_server.png)

MCP servers extend agents with tools from local binaries, private services, or marketplace integrations. Codebolt stores MCP server configuration in `mcp_servers.json` under the Codebolt config directory and manages installed servers through the product MCP surfaces and the `/mcp` route group. -->
## What is Mcp 
    TODO:add details also add link to know more https://modelcontextprotocol.io/docs/getting-started/intro


# How to install MCP Server

    option 1 : from codebolt registory 
             TODO:add detail about codebolt registery and then specefic structure for each platform in tabs for deskpopt, using command line 
             also lets add link to the refer to the mcp management in cloud includ how to create and upload your custom mcp to codebolt registory
   option 2: custom MCP servers
          TODO: add deattil about custom mcp server and variaous third party places where user can find mcp 

    option 3: using adding to json file and adding to .codebolt/mcp folder 
              link to doucumentation creating custom mcp servers      


  # MCP server management 

       TODO:
       tabs:using desktop ,cli ,api

  # MCP server uses
      
      TODO:

     tabs:from agent code , indirectly using agent tool search , mentioned mcp from chat box     



  # MCP scopes 
      TODO
     global and project level    

       


<!-- ## What you can manage

Codebolt's current server-backed MCP model covers:

- configured MCP server entries
- enabled or disabled state
- available marketplace and local MCP metadata
- cached tools from enabled MCP servers
- browser navigation helpers used by MCP-related flows

It does not expose the older tool lifecycle, log streaming, or update route family described in earlier drafts. -->

 

<!-- ## Install from the product UI

Use the MCP server or Tools install surface exposed by your build. Review the server description and permissions, then install it.

Behind the scenes, Codebolt resolves the marketplace item, asks the MCP installer flow to configure it, writes the result into `mcp_servers.json`, tests that the server returns tools, caches those tools, and enables the server only when the tool check succeeds.

## Install from the MCP API

Install a marketplace MCP server:

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
POST /mcp/refreshIndex
``` -->

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

Update one server:

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

Replace the full configured server map:

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

## Inspect configuration and tools

Use these routes to inspect MCP state:

```http
GET /mcp
GET /mcp/:serverName
GET /mcp/configured/mcps
GET /mcp/getMcpConfig/Path
```

Use `GET /mcp` for the installed server list, `GET /mcp/:serverName` for one stored config, and `GET /mcp/configured/mcps` for the currently cached tools.

## Enable or disable a server

Use the toggle route to add or remove a configured server from the enabled list:

```http
POST /mcp/toggle
Content-Type: application/json

{ "serverName": "my-linter", "enabled": true }
```

Use `enabled: false` to disable it without deleting the configuration.

## Refresh tool cache

After installing or changing configuration, refresh the MCP tools cache:

```http
POST /mcp/tools/update
```

If the server returns tools, those tools become available to agents that are allowed to use them.

## Troubleshooting

If a configured server does not appear as enabled:

1. Confirm the server exists with `GET /mcp/:serverName`.
2. Confirm the command path and args are valid.
3. Run `POST /mcp/tools/update`.
4. Check whether the server returns at least one MCP tool.
5. Confirm the active agent is allowed to use the relevant tool namespace.

If the server is disabled intentionally, re-enable it with `POST /mcp/toggle`.

## Security considerations

An MCP server runs code on your machine or calls a remote service using your credentials. Treat installation like adding any other local developer tool:

- Check the source and maintainer.
- Review the tools it exposes before granting agents broad access.
- Store secrets in environment variables, not in project files.
- Add tools only to agents that need them.

## See also

- [Agent Extensions Overview](./01_overview.md)
- [Custom Tools](./07_custom-tools.md)
- [MCP Tools for Builders](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [MCP and Tools Internals](../../04_build-on-codebolt/07b_subsystems/02_mcp-and-tools.md)
