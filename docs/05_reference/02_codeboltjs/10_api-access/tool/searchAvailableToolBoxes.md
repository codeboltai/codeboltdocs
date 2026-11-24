# searchAvailableToolBoxes

The SDK’s current entry point is [`mcp.searchAvailableMCPServers`](../mcp/index.md#searchavailablemcpservers). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Search configured servers by name or description with `codebolt.mcp.searchAvailableMCPServers`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.mcp.searchAvailableMCPServers('filesystem');
  console.log(Object.keys(data ?? {}));
});
```
