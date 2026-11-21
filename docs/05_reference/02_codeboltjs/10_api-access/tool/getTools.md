# getTools

The SDK’s current entry point is [`tools.getRuntimeTool`](../tools/index.md#getruntimetool). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Get one tool's input schema

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  const first = data.tools[0];
  if (!first) return;

  const { data: details } = await codebolt.tools.getRuntimeTool(first.name);
  console.log(details.tool?.inputSchema);
});
```
