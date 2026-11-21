---
name: search
data:
  name: search
  category: search
  link: search.md
---

# search

```text
codebolt.search.search(query: string): Promise<string>
```

This compatibility method resolves to the literal prefix `Search Results for ` followed by the query. Use [Web Search](../webSearch/index.md) for web results.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  console.log(await codebolt.search.search('release notes'));
  // Search Results for release notes
});
```
