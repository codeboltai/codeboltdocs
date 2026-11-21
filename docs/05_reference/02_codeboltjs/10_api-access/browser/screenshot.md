---
name: screenshot
description: Takes a screenshot of the current page.
cbbaseinfo:
  description: Takes a screenshot of the current page.
data:
  name: screenshot
  category: browser
  link: screenshot.md
---

# screenshot

```text
codebolt.browser.screenshot(options?: BrowserScreenshotOptions): Promise<BrowserScreenshotResponse>
```

Takes a screenshot of the current page.

## Parameters

- `options` — Optional browser screenshot options

## When to use it

Capture the current page for a bug report or a visual check. Request a full-page capture when the relevant content extends below the viewport.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.browser.screenshot();
  console.log(result);
});
```

## Capture a complete page

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  try {
    await codebolt.browser.goToPage('https://example.com/', { instanceId });
    const capture = await codebolt.browser.screenshot({ instanceId, fullPage: true, format: 'png' });
    console.log(capture.success);
  } finally {
    await codebolt.browser.closeBrowserInstance(instanceId);
  }
});
```
