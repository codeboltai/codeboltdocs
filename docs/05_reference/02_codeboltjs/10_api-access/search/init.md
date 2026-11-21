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

### Initialize with Default Engine

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initialize with default Bing search engine
  await codebolt.search.init();
  console.log('Search module initialized with Bing');
});
```
