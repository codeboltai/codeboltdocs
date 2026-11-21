---
name: close
description: Closes the current page.
cbbaseinfo:
  description: Closes the current page.
data:
  name: close
  category: browser
  link: close.md
---

# close

```text
codebolt.browser.close(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Closes the current page.

## Parameters

- `options` — Optional browser operation options

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Wait for connection and create a new page
  await codebolt.browser.newPage();

  // Navigate to a website and perform operations
  await codebolt.browser.goToPage('https://example.com');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Close the browser when done
  codebolt.browser.close();
  console.log('✅ Browser closed');
});
```
