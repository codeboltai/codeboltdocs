---
sidebar_position: 6
title: MCP Server
description: Install, configure, enable, inspect, and troubleshoot MCP servers in Codebolt.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



# What is MCP

Model Context Protocol (MCP) is a standard way for an AI application to connect to external tools and data sources. An MCP server exposes one or more tools with structured input schemas, and Codebolt agents can call those tools during a task.

An MCP server can expose tools for:

- source control systems
- issue trackers
- databases
- local project automation
- browser automation
- internal APIs
- vendor services

Learn more in the official MCP introduction: [Model Context Protocol docs](https://modelcontextprotocol.io/docs/getting-started/intro).

## How to install MCP Server

<details open>
<summary><strong>From Codebolt Registry</strong></summary>

Use the Codebolt registry when you want to install an MCP server that is already listed in Codebolt. The registry has an **All** view for discovering public items and a **My** view for managing items you have published. For MCP publishing and broader registry management, see [Cloud Portal](../02_surfaces/06_cloud/02_cloud-portal.md) and [Marketplace Publishing](../02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md).

<Tabs groupId="mcp-registry-install">
<TabItem value="desktop" label="Desktop App" default>

1. Open **Settings → MCP Servers**.
2. Open the **Available** tab.
3. Search for a server by name, description, or category.
4. Review the server README and metadata.
5. Click **Install MCP**.
6. Provide any required configuration such as keys, paths, or URLs.

During installation, Codebolt reads the registry entry, uses the server README to build the config, writes the server to `mcp_servers.json`, tests whether the server returns tools, caches the discovered tools, and enables the server only when discovery succeeds.

</TabItem>
<TabItem value="cli" label="CLI">

Install a registry MCP server from a running Codebolt server:

```bash
codebolt command mcp install --id <mcpId>
codebolt command mcp install --name <registryName>
```

Command reference: [`install --id`](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#install-registry-mcp), [`install --name`](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#install-registry-mcp)

</TabItem>
<TabItem value="api" label="API">

List registry MCPs:

```http
GET /mcp/available/list
```

Read one registry entry:

```http
GET /mcp/available/list/detail/:mcpId
```

Install a registry MCP:

```http
POST /mcp/install
Content-Type: application/json

{ "mcpId": "registry-mcp-id" }
```

Refresh the registry index:

```http
POST /mcp/refreshIndex
```

</TabItem>
</Tabs>

</details>

<details>
<summary><strong>Third-party MCP Servers</strong></summary>

Use a custom MCP server when the server is not listed in Codebolt's registry or when it belongs to your team, product, or internal infrastructure.

A custom MCP server is any MCP-compatible server that you configure manually instead of installing from the Codebolt registry. This can be a public third-party server, a vendor-maintained server, a server you run locally during development, or an internal server maintained by your team.

You can find third-party MCP servers in several places:

- **Vendor documentation** for products such as databases, issue trackers, source control systems, cloud platforms, and SaaS APIs.
- **GitHub repositories** that publish MCP servers with setup instructions and example configs.
- **npm packages** for Node-based MCP servers that can be launched with `npx` or installed globally.
- **Internal company repositories** for private tools, internal APIs, or workspace-specific automation.
- **Official MCP community resources** and ecosystem lists for servers maintained by the broader MCP community.

Before adding a custom MCP server, review its README and confirm:

- the command used to start the server
- required arguments
- required environment variables
- whether it uses stdio, SSE, or another supported transport
- what tools it exposes
- what credentials or local permissions it needs

Use **Configure** in the installed MCP list or **Open MCP Config** in the chat MCP picker to add a manual entry. Most custom MCP servers are configured with a command, optional arguments, and optional environment variables:

```json
{
  "command": "npx",
  "args": ["-y", "@example/my-mcp-server"],
  "env": {
    "API_KEY": "set-this-from-your-secure-env"
  }
}
```

Use custom MCP servers for private integrations, local development servers, internal APIs, or service-specific tools that are not available in the registry.

For a step-by-step guide, see [Install a Third-Party MCP Server](../../03_guides/05_mcp-and-tools/install-a-third-party-mcp-server.md).

</details>

<details>
<summary><strong>Custom Local MCP Server</strong></summary>

Use a custom local MCP server when the tool should run from the current machine or belong to the current workspace. This is the right path for project automation, internal scripts, local development tools, or CodeboltJS tools that you want to expose through MCP.

Codebolt supports two local patterns:

- **Project-local tools** stored in `.codebolt/tools`.
- **Programmatic CodeboltJS MCP servers** created with `startCodeboltMcpServer()` or `createCodeboltMcpServer()`.

### Project-local tool structure

The current application code discovers local MCP-style project tools from:

```text
.codebolt/tools/<tool-name>/codebolttool.yaml
.codebolt/tools/<tool-name>/index.js
```

`codebolttool.yaml` defines the local tool metadata that Codebolt uses for discovery:

```yaml
name: My Tool
uniqueName: my-tool
version: 1.0.0
description: Runs project-specific automation
```

Codebolt converts this local tool into an MCP config:

```json
{
  "my-tool": {
    "command": "node",
    "args": ["/path/to/project/.codebolt/tools/my-tool/index.js"]
  }
}
```

The app code scans `.codebolt/tools` for project-level local tools. It does not currently scan `.codebolt/mcp`.

Install a local project MCP by its `uniqueName`:

```bash
codebolt command mcp install-local --name <uniqueName>
```

Command reference: [`install-local`](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#install-local-mcp)

### Programmatic CodeboltJS MCP server

CodeboltJS can also expose Codebolt tools as an MCP server. The MCP server wrapper does not create brand-new tool definitions inline. It wraps the CodeboltJS tools singleton and exposes those tools through MCP `tools/list` and `tools/call`.

Use `startCodeboltMcpServer()` when you want CodeboltJS to create the MCP server and start the transport. Use `createCodeboltMcpServer()` when you need to connect the MCP transport yourself.

The wrapper supports:

| Option | Purpose |
|---|---|
| `transport` | `stdio` or `sse` when using `startCodeboltMcpServer()` |
| `port` | SSE port; `0` means random available port |
| `hostname` | SSE host, default `127.0.0.1` |
| `serverName` | MCP server name shown to clients |
| `serverVersion` | MCP server version on `createCodeboltMcpServer()` |
| `toolFilter` | expose only selected CodeboltJS tools |
| `toolPrefix` | prefix MCP tool names, for example `mytools_read_file` |

For SSE transport, CodeboltJS starts:

```text
GET  /sse
POST /messages?sessionId=<sessionId>
GET  /health
```

The server maps MCP calls back to CodeboltJS tool execution. For example, a prefixed MCP tool such as `mytools_read_file` is resolved back to the original CodeboltJS tool name `read_file`, then executed through the CodeboltJS tools singleton.

To create a custom MCP server, see [Build Your First MCP Server](../../03_guides/05_mcp-and-tools/build-your-first-mcp-server.md).

### Local discovery and install API

List local project MCPs:

```http
GET /mcp/localMcp/list
```

Install a local MCP by unique name:

```http
POST /mcp/install
Content-Type: application/json

{ "isLocal": true, "uniqueName": "my-local-server" }
```

Open the config path for a local MCP:

```http
GET /mcp/getMcpConfig/Path?mcpId=my-local-server&isLocal=true
```

### Notes

- The root import `@codebolt/codeboltjs` exposes the MCP server helpers.
- The transport classes come from `@modelcontextprotocol/sdk` when you manually connect a transport.
- Project-local tools should use `.codebolt/tools`, not `.codebolt/mcp`.
- A local MCP server should return at least one tool during discovery before it is useful to agents.

For the full structure, see [Quickstart: Local MCP Server](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/02_quickstart-local-mcp.md), [Build Your First MCP Server](../../03_guides/05_mcp-and-tools/build-your-first-mcp-server.md), and [Custom Tools](./07_custom-tools.md).

</details>

## MCP server management

<Tabs groupId="mcp-management">
<TabItem value="desktop" label="Using Desktop" default>

The Desktop App exposes MCP management through:

- **Settings → MCP Servers**
- **Bottom bar → Agents → MCP**

Use these surfaces to:

- install registry MCP servers
- search installed and available servers
- enable or disable a server
- configure command, args, and environment values
- inspect README and server metadata
- select a whole MCP server or individual MCP tools for a chat
- open the MCP config file
- create a custom MCP scaffold

For the detailed Desktop App flow, see [MCP Servers in Settings](../02_surfaces/02_desktop-app/Settings/06_mcp-servers.md).

</TabItem>
<TabItem value="cli" label="CLI">

Use `codebolt command mcp` for runtime MCP management:

| Command | Reference |
|---|---|
| `codebolt command mcp list` | [List installed MCPs](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#list-installed-mcps) |
| `codebolt command mcp tools` | [List MCP tools](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#list-mcp-tools) |
| `codebolt command mcp refresh` | [Refresh MCP tools](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#refresh-mcp-tools) |
| `codebolt command mcp enable --name <serverName>` | [Enable or disable MCP](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#enable-or-disable-mcp) |
| `codebolt command mcp disable --name <serverName>` | [Enable or disable MCP](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#enable-or-disable-mcp) |

Use `codebolt action tool` for builder-side tool extension work:

| Command | Reference |
|---|---|
| `codebolt action tool create --name my-tool` | [Build and publish tool extensions](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#build-and-publish-tool-extensions) |
| `codebolt action tool publish --path ./my-tool` | [Build and publish tool extensions](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#build-and-publish-tool-extensions) |
| `codebolt action tool list` | [Build and publish tool extensions](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md#build-and-publish-tool-extensions) |

See [Tool Commands](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md).

</TabItem>
<TabItem value="api" label="API">

Codebolt exposes MCP management through the `/mcp` route group and the client SDK `client.mcp` API.

| Action | Endpoint |
|---|---|
| List installed servers | `GET /mcp` |
| Read one server config | `GET /mcp/:serverName` |
| Configure all servers | `POST /mcp/configure` |
| Configure one server | `POST /mcp/configure/:serverName` |
| Enable or disable a server | `POST /mcp/toggle` |
| List registry MCPs | `GET /mcp/available/list` |
| Read registry MCP details | `GET /mcp/available/list/detail/:mcpId` |
| Install an MCP | `POST /mcp/install` |
| Create a custom MCP scaffold | `POST /mcp/create` |
| List local project MCPs | `GET /mcp/localMcp/list` |
| Read cached configured MCP tools | `GET /mcp/configured/mcps` |
| Refresh registry index | `POST /mcp/refreshIndex` |
| Refresh MCP tools cache | `POST /mcp/tools/update` |
| Open config file path | `GET /mcp/getMcpConfig/Path` |

For typed SDK methods, see [MCP Client SDK Reference](../../05_reference/04_client-sdk/02_api-reference/mcp/index.md).

</TabItem>
</Tabs>

## How to use MCP server

<Tabs groupId="mcp-use">
<TabItem value="agent-code" label="From Agent Code" default>

Agents and agent flows can call MCP tools directly. The server registers a core callable named:

```text
mcp.executeTool
```

It accepts a tool name and parameters. Internally, MCP tools are namespaced by server using the format:

```text
server-name--tool-name
```

The runtime uses this qualified name to route execution to the correct MCP server. User-facing UI can show shorter server and tool labels.

For builder APIs, see [MCP Tools Overview](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md) and [CodeboltJS MCP API](../../05_reference/02_codeboltjs/10_api-access/mcp/index.md).

</TabItem>
<TabItem value="tool-search" label="Indirectly Using Tool Search">

Codebolt caches tools returned by configured MCP servers in `mcp_tools.json`. The chat MCP picker, MCP suggestions, and server-tool registry read from that cache.

This lets agents and agent-flow nodes discover available MCP capabilities before calling a specific tool. Codebolt includes nodes and APIs for:

- listing enabled MCP servers
- listing MCP tools
- searching available MCP servers
- configuring MCP servers
- executing MCP tools

</TabItem>
<TabItem value="chat-mention" label="Mentioned From Chat Box">

When writing a prompt, you can select MCP context from the chat MCP picker or MCP mention UI.

Selecting a whole server stores:

```text
server-name.*
```

Selecting one tool stores:

```text
server-name.tool-name
```

Codebolt stores those values in `mentionedMCPs` and sends them with the chat message. The receiving agent can use that context when deciding which MCP tools to call.

For related chat behavior, see [Context and At-Mentions](../02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md).

</TabItem>
</Tabs>

## MCP scopes

<Tabs groupId="mcp-scopes">
<TabItem value="global" label="Global" default>

Global MCP state is stored under the Codebolt config directory.

| File | Purpose |
|---|---|
| `mcp_servers.json` | Installed server configs and enabled server list |
| `mcp.json` | Cached Codebolt registry index |
| `mcp_tools.json` | Cached tools returned by configured MCP servers |

Use global MCPs for shared services and integrations that can be reused across projects.

</TabItem>
<TabItem value="project" label="Project Level">

Project-level MCP-style tools live inside the active workspace:

```text
.codebolt/tools/<tool-name>/codebolttool.yaml
.codebolt/tools/<tool-name>/index.js
```

These are useful for project-specific automation and tools that should travel with the repository. Codebolt reads the active project path, scans `.codebolt/tools`, and converts each valid local tool into an MCP server config for the active workspace.

</TabItem>
</Tabs>


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
- [Desktop App MCP Settings](../02_surfaces/02_desktop-app/Settings/06_mcp-servers.md)
- [Install a Third-Party MCP Server](../../03_guides/05_mcp-and-tools/install-a-third-party-mcp-server.md)
- [Build Your First MCP Server](../../03_guides/05_mcp-and-tools/build-your-first-mcp-server.md)
- [MCP Tools for Builders](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [MCP and Tools Internals](../../04_build-on-codebolt/07b_subsystems/02_mcp-and-tools.md)
- [MCP Client SDK Reference](../../05_reference/04_client-sdk/02_api-reference/mcp/index.md)
