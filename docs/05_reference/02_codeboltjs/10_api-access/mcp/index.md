# MCP

Discover and configure Model Context Protocol servers.

Use [Runtime Tools](../tools/index.md) to discover and execute tools contributed by MCP servers.

## When to use it

Use this module to inspect and configure MCP servers. Use [Runtime Tools](../tools/index.md) to select callable tools and invoke them.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const enabled = await codebolt.mcp.getEnabledMCPServers();
  console.log(enabled);
});
```

## SDK methods

### getEnabledMCPServers

[`getEnabledMCPServers`](getEnabledMCPServers.md)

### getLocalMCPServers

Returns a single list containing the tools contributed by locally configured MCP servers.

```text
codebolt.mcp.getLocalMCPServers(): Promise<GetLocalToolBoxesResponse>
```

### getMentionedMCPServers

```text
codebolt.mcp.getMentionedMCPServers(userMessage: MCPUserMessage): Promise<GetAvailableToolBoxesResponse>
```

The current server returns its MCP catalog for this request. For the names mentioned in a message, use [User Message](../user-message-utilities/index.md#getmentionedmcps).

### searchAvailableMCPServers

Matches configured server names and descriptions, ignoring case. Pass an empty string to list every configured server. Read the names with `Object.keys(response.data ?? {})`.

```text
codebolt.mcp.searchAvailableMCPServers(query: string): Promise<SearchAvailableToolBoxesResponse>
```

### configureMCPServer

[`configureMCPServer`](configureMCPServer.md)

### getMcpList

The default server returns an unknown-action error. See [getMcpList](getMcpList.md) for a working catalog query.

### getEnabledMcps

The default server does not handle this SDK action. Use [getEnabledMCPServers](getEnabledMCPServers.md) to list enabled servers.

```text
codebolt.mcp.getEnabledMcps(): Promise<GetEnabledMCPSResponse>
```
