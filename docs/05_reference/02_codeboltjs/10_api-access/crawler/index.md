# Crawler

Send crawl start, navigation, scroll, and screenshot events, and await click results.

## Example

### Quick Start Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start the crawler
  codebolt.crawler.start();

  // Navigate to a webpage
  codebolt.crawler.goToPage('https://example.com');

  // Wait for page load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Take a screenshot
  codebolt.crawler.screenshot();

  // Scroll down
  codebolt.crawler.scroll('down');

  // Click an element
  await codebolt.crawler.click('submit-button');
});
```

## SDK methods

### start

[`start`](start.md) · Starts the crawler.

### screenshot

[`screenshot`](screenshot.md) · Takes a screenshot using the crawler.

### goToPage

[`goToPage`](goToPage.md) · Directs the crawler to navigate to a specified URL.

### scroll

[`scroll`](scroll.md) · Scrolls the crawler in a specified direction.

### click

[`click`](click.md) · Simulates a click event on an element with the specified ID.
