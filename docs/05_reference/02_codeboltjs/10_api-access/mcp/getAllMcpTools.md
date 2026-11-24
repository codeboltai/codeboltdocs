# getAllMcpTools

The SDK’s current entry point is [`tools.listExternalTools`](../tools/index.md#listexternaltools). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## List callable MCP tools with `codebolt.tools.listExternalTools`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  for (const tool of data.tools) {
    console.log(tool.name, tool.sourceId, tool.inputSchema);
  }
});
```
