---
name: getUrl
description: Retrieves the current URL of the browser's active page.
cbbaseinfo:
  description: Retrieves the current URL of the browser's active page.
data:
  name: getUrl
  category: browser
  link: getUrl.md
---

# getUrl

```text
codebolt.browser.getUrl(options?: BrowserOperationOptions): Promise<UrlResponse>
```

Retrieves the current URL of the browser's active page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the URL.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // First, create a new page and navigate to a URL.
  await codebolt.browser.newPage();
  await codebolt.browser.goToPage('https://www.google.com');

  // Now, get the current URL.
  const urlResponse = await codebolt.browser.getUrl();
  console.log('URL Response:', urlResponse);

  if (urlResponse.success) {
    console.log('The current URL is:', urlResponse.url);
    // You can use this URL to verify navigation or for other purposes.
    if (urlResponse.url == null) throw new Error('The response is missing url.');
    if (urlResponse.url.includes('google.com')) {
      console.log('Successfully navigated to Google.');
    }
  } else {
    console.error('Failed to get URL:', urlResponse.error);
  }
});
```
