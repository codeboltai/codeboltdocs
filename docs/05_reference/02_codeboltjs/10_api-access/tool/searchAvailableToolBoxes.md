# searchAvailableToolBoxes

The SDK’s current entry point is [`mcp.searchAvailableMCPServers`](../mcp/index.md#searchavailablemcpservers). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Example

### Search the MCP server catalog

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  console.log(await codebolt.mcp.searchAvailableMCPServers('filesystem'));
});
```
