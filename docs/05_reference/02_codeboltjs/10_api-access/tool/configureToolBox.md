# configureToolBox

The SDK’s current entry point is [`mcp.configureMCPServer`](../mcp/configureMCPServer.md). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Example

### Configure an existing MCP server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const serverName = 'your-installed-server';
  const result = await codebolt.mcp.configureMCPServer(serverName, { serverName });
  console.log(result);
});
```
