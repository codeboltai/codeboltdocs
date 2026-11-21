# getAvailableToolBoxes

Use [`codebolt.mcp.getMcpList()`](../mcp/getMcpList.md) to list available MCP servers.

## Example

### Read available MCP servers

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.mcp.getMcpList();
  console.log(response.data ?? []);
});
```
