# Search

The legacy search object returns placeholder strings. Use Web Search for real queries.

Use the built-in [Web Search](../webSearch/index.md) tool for web results, or [Codebase Search](../codebaseSearch/index.md) for project files.

## What the SDK returns

```ts
import codebolt from '@codebolt/codeboltjs';

const result = await codebolt.search.search('release notes');
console.log(result); // Search Results for release notes

const link = await codebolt.search.get_first_link('release notes');
console.log(link); // First Link for release notes
```

## SDK methods

### init

[`init`](init.md)

### search

[`search`](execute.md)

### get_first_link

[`get_first_link`](get_first_link.md)
