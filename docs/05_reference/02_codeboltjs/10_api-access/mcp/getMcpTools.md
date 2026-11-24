# getMcpTools

The SDK’s current entry point is [`tools.listToolsBySource`](../tools/index.md#listtoolsbysource). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## List tools from one server with `codebolt.tools.listToolsBySource`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.tools.listToolSources({ sourceType: 'mcp' });
  const source = data.sources.find(item => item.sourceType === 'mcp');
  if (!source) return;

  const { data: catalog } = await codebolt.tools.listToolsBySource(source.sourceId);
  console.log(catalog.tools.map(tool => tool.name));
});
```
