---
name: scroll
description: Scrolls the crawler in a specified direction.
cbbaseinfo:
  description: Scrolls the crawler in a specified direction.
data:
  name: scroll
  category: crawler
  link: scroll.md
---

# scroll

```text
codebolt.crawler.scroll(direction: string): void
```

Scrolls the crawler in a specified direction.

## Parameters

- `direction` — The direction to scroll ('up', 'down', 'left', 'right').

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start crawler, navigate, and scroll
  codebolt.crawler.start();
  codebolt.crawler.goToPage('https://example.com');

  // Wait for page load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll down
  codebolt.crawler.scroll('down');
  console.log('Scrolled down');
});
```
