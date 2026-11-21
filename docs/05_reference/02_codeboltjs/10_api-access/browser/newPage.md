---
name: newPage
description: Opens a new page in the browser.
cbbaseinfo:
  description: Opens a new page in the browser.
data:
  name: newPage
  category: browser
  link: newPage.md
---

# newPage

```text
codebolt.browser.newPage(options?: BrowserInstanceOptions): Promise<BrowserActionResponseData>
```

Opens a new page in the browser.

## Parameters

- `options` — Optional browser instance options

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // It's good practice to wait for the connection to be established first.

  // Create a new browser page
  const newPageResult = await codebolt.browser.newPage();
  console.log('New page creation result:', newPageResult);

  if (newPageResult.success) {
    console.log('Successfully created a new page.');
    // Now you can navigate to a URL
    await codebolt.browser.goToPage('https://example.com');
    const currentUrl = await codebolt.browser.getUrl();
    console.log('Current URL:', currentUrl.url);
  } else {
    console.error('Failed to create a new page:', newPageResult.error);
  }
});
```
