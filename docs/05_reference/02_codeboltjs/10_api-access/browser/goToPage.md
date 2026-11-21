---
name: goToPage
description: Navigates to a specified URL.
cbbaseinfo:
  description: Navigates to a specified URL.
data:
  name: goToPage
  category: browser
  link: goToPage.md
---

# goToPage

```text
codebolt.browser.goToPage(url: string, options?: BrowserOperationOptions): Promise<GoToPageResponse>
```

Navigates to a specified URL.

## Parameters

- `url` — The URL to navigate to.
- `options` — Optional browser operation options

## Returns

A promise that resolves when navigation is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Wait for connection and create a new page
  await codebolt.browser.newPage();

  // Navigate to a webpage
  const goToResult = await codebolt.browser.goToPage('https://example.com');
  console.log('✅ Navigated to page:', goToResult);

  // Wait for the page to fully load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Verify the navigation was successful
  const currentUrl = await codebolt.browser.getUrl();
  console.log('✅ Current URL after navigation:', currentUrl);

  // Example with different websites
  await codebolt.browser.goToPage('https://www.google.com');
  await codebolt.browser.goToPage('https://github.com');
});
```
