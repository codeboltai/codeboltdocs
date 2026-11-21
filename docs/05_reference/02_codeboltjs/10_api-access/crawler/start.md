---
name: start
description: Starts the crawler.
cbbaseinfo:
  description: Starts the crawler.
data:
  name: start
  category: crawler
  link: start.md
---

# start

```text
codebolt.crawler.start(): void
```

Starts the crawler.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Start the crawler
  codebolt.crawler.start();
  console.log('Crawler started successfully');
});
```

## More examples

### Crawler Initialization Check

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start crawler with verification
  async function startCrawlerWithVerify() {
    console.log('Initializing crawler...');

    // Start the crawler
    codebolt.crawler.start();

    // Wait and verify
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Try to navigate to verify it's working
    codebolt.crawler.goToPage('https://example.com');

    // Wait for navigation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take screenshot to verify
    codebolt.crawler.screenshot();

    console.log('Crawler verified and ready');

    return { initialized: true };
  }

  // Usage
  const status = await startCrawlerWithVerify();
  console.log('Crawler status:', status.initialized);
});
```
