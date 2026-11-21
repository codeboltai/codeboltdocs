# executeTool

The SDK’s current entry point is [`tools.execute`](../tools/index.md#execute). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Example

### Call a tool provided by an MCP server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  const greeting = data.tools.find(tool => tool.toolName === 'hello');
  if (!greeting) return;

  const response = await codebolt.tools.execute(
    greeting.name,
    { name: 'Ada' },
    { sourceId: greeting.sourceId },
  );
  console.log(response.success ? response.result : response.error);
});
```
