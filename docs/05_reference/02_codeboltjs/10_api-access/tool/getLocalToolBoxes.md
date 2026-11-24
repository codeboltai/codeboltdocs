# getLocalToolBoxes

The SDK’s current entry point is [`mcp.getLocalMCPServers`](../mcp/index.md#getlocalmcpservers). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## List tools provided by local servers with `codebolt.mcp.getLocalMCPServers`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.mcp.getLocalMCPServers();
  for (const tool of data ?? []) console.log(tool);
});
```
