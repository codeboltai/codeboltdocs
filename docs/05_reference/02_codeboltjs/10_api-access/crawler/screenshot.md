---
name: screenshot
description: Takes a screenshot using the crawler.
cbbaseinfo:
  description: Takes a screenshot using the crawler.
data:
  name: screenshot
  category: crawler
  link: screenshot.md
---

# screenshot

```text
codebolt.crawler.screenshot(): void
```

Takes a screenshot using the crawler.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start crawler and take screenshot
  codebolt.crawler.start();
  codebolt.crawler.goToPage('https://example.com');

  // Wait for page load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Capture screenshot
  codebolt.crawler.screenshot();
  console.log('Screenshot captured');
});
```
