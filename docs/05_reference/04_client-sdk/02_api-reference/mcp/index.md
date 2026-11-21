---
title: Mcp API
---

# Mcp API

MCP API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`browserNavigate`](./browserNavigate) | Navigates to a URL using the browser MCP server. |
| [`configure`](./configure) | Applies global MCP configuration settings. |
| [`configureServer`](./configureServer) | Configures a specific MCP server's settings. |
| [`create`](./create) | Creates a new custom MCP server configuration. |
| [`getAll`](./getAll) | Retrieves all MCP servers currently registered in the workspace. |
| [`getAvailableAll`](./getAvailableAll) | Retrieves all available MCP servers including both marketplace and community servers. |
| [`getAvailableDetail`](./getAvailableDetail) | Retrieves detailed information about a specific available MCP server. |
| [`getAvailableList`](./getAvailableList) | Retrieves the catalog of MCP servers available for installation. |
| [`getByName`](./getByName) | Retrieves a specific MCP server by its registered name. |
| [`getConfiguredMcps`](./getConfiguredMcps) | Retrieves all MCP servers that have been configured in the workspace. |
| [`getLocalMcpList`](./getLocalMcpList) | Retrieves the list of locally defined MCP servers. |
| [`getMcpConfigPath`](./getMcpConfigPath) | Retrieves the filesystem path to the MCP configuration file. |
| [`install`](./install) | Installs an MCP server from the available catalog. |
| [`toggle`](./toggle) | Toggles an MCP server between enabled and disabled states. |
| [`updateTools`](./updateTools) | Updates the tool configurations for MCP servers. |

## Methods

---

### `browserNavigate`

```typescript
client.mcp.browserNavigate(data: McpBrowserNavigateRequest): Promise<unknown>
```

Navigates to a URL using the browser MCP server.

Sends a navigation command to the browser automation MCP server, instructing it to
load a specific web page. Requires the browser MCP server to be installed and enabled.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpBrowserNavigateRequest` | Yes | The navigation request |

**Returns:** `Promise<unknown>` — A promise that resolves when the navigation has been initiated

[Full reference →](./browserNavigate)

---

### `configure`

```typescript
client.mcp.configure(data: McpConfigureRequest): Promise<unknown>
```

Applies global MCP configuration settings.

Updates the workspace-level MCP settings that affect how all MCP servers are managed,
including default timeout values, transport preferences, and security policies.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpConfigureRequest` | Yes | The global MCP configuration to apply |

**Returns:** `Promise<unknown>` — A promise that resolves when the configuration has been saved

[Full reference →](./configure)

---

### `configureServer`

```typescript
client.mcp.configureServer(serverName: string, data: McpConfigureServerRequest): Promise<unknown>
```

Configures a specific MCP server's settings.

Updates the connection parameters, environment variables, and other settings for a
named MCP server. The server may need to be restarted for changes to take effect.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `serverName` | `string` | Yes | The name of the MCP server to configure |
| `data` | `McpConfigureServerRequest` | Yes | The server-specific configuration to apply |

**Returns:** `Promise<unknown>` — A promise that resolves when the server configuration has been saved

[Full reference →](./configureServer)

---

### `create`

```typescript
client.mcp.create(data: McpCreateRequest): Promise<unknown>
```

Creates a new custom MCP server configuration.

Registers a custom MCP server that is not part of the standard catalog. This is useful
for connecting to proprietary or locally developed MCP-compatible services.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpCreateRequest` | Yes | The custom server creation payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the server has been created

[Full reference →](./create)

---

### `getAll`

```typescript
client.mcp.getAll(): Promise<McpServer[]>
```

Retrieves all MCP servers currently registered in the workspace.

Returns every MCP server regardless of its enabled/disabled status, including
connection details, available tools, and current health information.

_No parameters._

**Returns:** `Promise<McpServer[]>` — A promise that resolves to an array of all registered MCP servers

[Full reference →](./getAll)

---

### `getAvailableAll`

```typescript
client.mcp.getAvailableAll(): Promise<McpAvailableServer[]>
```

Retrieves all available MCP servers including both marketplace and community servers.

Returns the full unfiltered catalog of MCP servers from all sources. This includes
official, community-contributed, and locally developed servers.

_No parameters._

**Returns:** `Promise<McpAvailableServer[]>` — A promise that resolves to an array of all available MCP servers

[Full reference →](./getAvailableAll)

---

### `getAvailableDetail`

```typescript
client.mcp.getAvailableDetail(mcpId: string): Promise<McpAvailableServer>
```

Retrieves detailed information about a specific available MCP server.

Returns comprehensive details about an MCP server from the catalog, including its
description, supported tools, configuration schema, and installation requirements.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `mcpId` | `string` | Yes | The identifier of the available MCP server to inspect |

**Returns:** `Promise<McpAvailableServer>` — A promise that resolves to the detailed MCP server information

[Full reference →](./getAvailableDetail)

---

### `getAvailableList`

```typescript
client.mcp.getAvailableList(): Promise<McpAvailableServer[]>
```

Retrieves the catalog of MCP servers available for installation.

Returns a curated list of MCP servers that can be installed from the marketplace or
registry. Use this to discover new capabilities to add to the workspace.

_No parameters._

**Returns:** `Promise<McpAvailableServer[]>` — A promise that resolves to an array of available MCP servers

[Full reference →](./getAvailableList)

---

### `getByName`

```typescript
client.mcp.getByName(serverName: string): Promise<McpServer>
```

Retrieves a specific MCP server by its registered name.

Returns the full configuration and status of a single MCP server, including its
tool definitions, resource list, and connection parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `serverName` | `string` | Yes | The registered name of the MCP server to retrieve |

**Returns:** `Promise<McpServer>` — A promise that resolves to the MCP server details

[Full reference →](./getByName)

---

### `getConfiguredMcps`

```typescript
client.mcp.getConfiguredMcps(): Promise<McpServer[]>
```

Retrieves all MCP servers that have been configured in the workspace.

Returns only servers that have been explicitly set up (installed and configured),
as opposed to all available servers in the catalog.

_No parameters._

**Returns:** `Promise<McpServer[]>` — A promise that resolves to an array of configured MCP servers

[Full reference →](./getConfiguredMcps)

---

### `getLocalMcpList`

```typescript
client.mcp.getLocalMcpList(): Promise<McpServer[]>
```

Retrieves the list of locally defined MCP servers.

Returns MCP servers that are defined in the local workspace configuration rather than
installed from the marketplace. These are typically custom or development servers.

_No parameters._

**Returns:** `Promise<McpServer[]>` — A promise that resolves to an array of local MCP servers

[Full reference →](./getLocalMcpList)

---

### `getMcpConfigPath`

```typescript
client.mcp.getMcpConfigPath(): Promise<McpConfigPath>
```

Retrieves the filesystem path to the MCP configuration file.

Returns the absolute path where the MCP configuration is stored on disk. Useful for
manual editing or backup of MCP server configurations.

_No parameters._

**Returns:** `Promise<McpConfigPath>` — A promise that resolves to the MCP configuration file path

[Full reference →](./getMcpConfigPath)

---

### `install`

```typescript
client.mcp.install(data: McpInstallRequest): Promise<unknown>
```

Installs an MCP server from the available catalog.

Downloads and registers an MCP server, making it available for configuration and use.
The server may require additional configuration (e.g., API keys) before it can be started.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpInstallRequest` | Yes | The installation request specifying which server to install |

**Returns:** `Promise<unknown>` — A promise that resolves when the installation has completed

[Full reference →](./install)

---

### `toggle`

```typescript
client.mcp.toggle(data: McpToggleRequest): Promise<unknown>
```

Toggles an MCP server between enabled and disabled states.

Enables or disables a registered MCP server. Disabled servers will not be started
or connected to, and their tools will not be available to agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpToggleRequest` | Yes | The toggle request specifying the server and desired state |

**Returns:** `Promise<unknown>` — A promise that resolves when the toggle operation has completed

[Full reference →](./toggle)

---

### `updateTools`

```typescript
client.mcp.updateTools(data: McpUpdateToolsRequest): Promise<unknown>
```

Updates the tool configurations for MCP servers.

Modifies which tools are exposed or hidden from agents, and updates tool-specific
settings like descriptions, parameter defaults, or access permissions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpUpdateToolsRequest` | Yes | The tool update configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the tool configurations have been updated

[Full reference →](./updateTools)

