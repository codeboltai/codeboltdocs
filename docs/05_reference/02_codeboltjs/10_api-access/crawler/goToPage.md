---
name: goToPage
description: Directs the crawler to navigate to a specified URL.
cbbaseinfo:
  description: Directs the crawler to navigate to a specified URL.
data:
  name: goToPage
  category: crawler
  link: goToPage.md
---

# goToPage

```text
codebolt.crawler.goToPage(url: string): void
```

Directs the crawler to navigate to a specified URL.

## Parameters

- `url` — The URL for the crawler to navigate to.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Start crawler and navigate
  codebolt.crawler.start();
  codebolt.crawler.goToPage('https://example.com');
  console.log('Navigated to example.com');
});
```

## More examples

### Explanation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // 1. Start crawler
  codebolt.crawler.start();

  // 2. Navigate to URL
  codebolt.crawler.goToPage('https://example.com');

  // 3. Wait for page load
  await new Promise(resolve => setTimeout(resolve, 2000-3000));

  // 4. Verify/interact with page
  codebolt.crawler.screenshot();
});
```

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Correct - with protocol
  codebolt.crawler.goToPage('https://example.com');

  // Incorrect - without protocol (may fail)
  codebolt.crawler.goToPage('example.com');
});
```
