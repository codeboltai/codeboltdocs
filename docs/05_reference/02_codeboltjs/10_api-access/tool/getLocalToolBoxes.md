# getLocalToolBoxes

The SDK’s current entry point is [`mcp.getLocalMCPServers`](../mcp/index.md#getlocalmcpservers). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Example

### List local MCP servers

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  console.log(await codebolt.mcp.getLocalMCPServers());
});
```
