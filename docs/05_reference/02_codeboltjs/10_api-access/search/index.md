# Search

The legacy search object returns placeholder strings. Use Web Search for real queries.

Use the built-in [Web Search](../webSearch/index.md) tool for web results, or [Codebase Search](../codebaseSearch/index.md) for project files.

## Run a web search

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.tools.execute(
    'search_web',
    { query: 'TypeScript handbook', count: 3 },
    { sourceId: 'codebolt' },
  );
  console.log(result.success ? result.result : result.error);
});
```

## SDK methods

### init

[`init`](init.md)

### search

[`search`](execute.md)

### get_first_link

[`get_first_link`](get_first_link.md)
