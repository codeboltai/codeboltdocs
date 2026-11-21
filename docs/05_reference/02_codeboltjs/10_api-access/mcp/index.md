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

```text
codebolt.mcp.getLocalMCPServers(): Promise<GetLocalToolBoxesResponse>
```

### getMentionedMCPServers

```text
codebolt.mcp.getMentionedMCPServers(userMessage: MCPUserMessage): Promise<GetAvailableToolBoxesResponse>
```

The current server returns its MCP catalog for this request. For the names mentioned in a message, use [User Message](../user-message-utilities/index.md#getmentionedmcps).

### searchAvailableMCPServers

```text
codebolt.mcp.searchAvailableMCPServers(query: string): Promise<SearchAvailableToolBoxesResponse>
```

### configureMCPServer

[`configureMCPServer`](configureMCPServer.md)

### getMcpList

[`getMcpList`](getMcpList.md)

### getEnabledMcps

```text
codebolt.mcp.getEnabledMcps(): Promise<GetEnabledMCPSResponse>
```
