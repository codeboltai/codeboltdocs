# Web Search

Call the built-in `search_web` tool through [Runtime Tools](../tools/index.md). The tool uses the web search provider configured in the connected Codebolt application. Pass `provider` to request a specific configured provider or `count` to limit results.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.tools.execute(
    'search_web',
    { query: 'TypeScript handbook', count: 3 },
    { sourceId: 'codebolt' },
  );
  if (response.success) {
    console.log(response.result);
  }
});
```
