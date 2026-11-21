---
name: get_first_link
data:
  name: get_first_link
  category: search
  link: get_first_link.md
---

# get_first_link

```text
codebolt.search.get_first_link(query: string): Promise<string>
```

This compatibility method resolves to the literal prefix `First Link for ` followed by the query. Use [Web Search](../webSearch/index.md) for web results.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  console.log(await codebolt.search.get_first_link('release notes'));
  // First Link for release notes
});
```
