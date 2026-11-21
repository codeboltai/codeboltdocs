---
name: scroll
description: Scrolls the current page in a specified direction by a specified number of pixels.
cbbaseinfo:
  description: Scrolls the current page in a specified direction by a specified number of pixels.
data:
  name: scroll
  category: browser
  link: scroll.md
---

# scroll

```text
codebolt.browser.scroll(direction: string, pixels: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Scrolls the current page in a specified direction by a specified number of pixels.

## Parameters

- `direction` — The direction to scroll.
- `pixels` — The number of pixels to scroll.
- `options` — Optional browser operation options

## Returns

A promise that resolves when the scroll action is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page with scrollable content
  await codebolt.browser.goToPage("https://example.com");

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scroll down the page by 100 pixels
  const scrollResult = await codebolt.browser.scroll("down", "100");
  console.log('✅ Scrolled:', scrollResult);

  // Check if the scroll was successful
  if (scrollResult.success) {
    console.log('Page scrolled successfully');
  } else {
    console.error('Scroll failed:', scrollResult.error);
  }

  // You can also scroll in other directions
  await codebolt.browser.scroll("up", "50");
  await codebolt.browser.scroll("left", "100");
  await codebolt.browser.scroll("right", "100");
});
```
