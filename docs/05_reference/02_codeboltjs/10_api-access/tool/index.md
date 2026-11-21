# codeboltMCP

Use [Runtime Tools](../tools/index.md) to discover or execute tools. Use [MCP](../mcp/index.md) for MCP server configuration.

## Example

### List callable MCP tools from the runtime catalog

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  for (const tool of data.tools) {
    console.log(tool.name, tool.sourceId, tool.inputSchema);
  }
});
```
