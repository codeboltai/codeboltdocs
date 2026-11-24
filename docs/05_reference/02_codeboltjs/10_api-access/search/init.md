---
name: init
data:
  name: init
  category: search
  link: init.md
---

# init

```text
codebolt.search.init(engine?: string): void
```

This compatibility function accepts an engine name and returns `void`. The implementation does not configure a search service.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.search.init('bing'); // Returns undefined. No search provider is configured.
```
