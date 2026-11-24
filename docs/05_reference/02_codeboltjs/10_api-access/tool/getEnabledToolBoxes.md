# getEnabledToolBoxes

The SDK’s current entry point is [`mcp.getEnabledMCPServers`](../mcp/getEnabledMCPServers.md). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## List enabled servers with `codebolt.mcp.getEnabledMCPServers`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.mcp.getEnabledMCPServers();
  console.log(Object.keys(data ?? {}));
});
```
