# executeTool

The SDK’s current entry point is [`tools.execute`](../tools/index.md#execute). See [Runtime Tools](../tools/index.md) for the gateway methods and [MCP](../mcp/index.md) for server lifecycle operations.

## Run a discovered MCP tool with `codebolt.tools.execute`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const { data } = await codebolt.tools.listExternalTools({ sourceType: 'mcp' });
  // This example expects an installed MCP tool named hello that accepts a name.
  const greeting = data.tools.find(tool => tool.toolName === 'hello');
  if (!greeting) return 'No installed MCP server provides hello.';

  const response = await codebolt.tools.execute(
    greeting.name,
    { name: 'Ada' },
    { sourceId: greeting.sourceId },
  );
  if (Array.isArray(response.data)) {
    const [failed, value] = response.data;
    if (failed) throw new Error(String(value));
    return value;
  }
  throw new Error(response.error ?? 'Unexpected MCP tool response');
});
```
