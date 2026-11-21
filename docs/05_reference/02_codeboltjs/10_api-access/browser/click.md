---
name: click
description: Clicks on a specified element on the page.
cbbaseinfo:
  description: Clicks on a specified element on the page.
data:
  name: click
  category: browser
  link: click.md
---

# click

```text
codebolt.browser.click(elementid: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Clicks on a specified element on the page.

## Parameters

- `elementid` — The ID of the element to click.
- `options` — Optional browser operation options

## Returns

A promise that resolves when the click action is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page with interactive elements
  await codebolt.browser.goToPage("https://example.com");
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click on a button with the ID "submit-btn"
  const clickResult = await codebolt.browser.click("submit-btn");
  console.log('✅ Clicked:', clickResult);

  // Check if the click was successful
  if (clickResult.success) {
    console.log('Click action completed successfully');
  } else {
    console.error('Click failed:', clickResult.error);
  }

  // Click on a link with a specific ID
  await codebolt.browser.click("nav-link");

  // Click on a checkbox or radio button
  await codebolt.browser.click("checkbox-id");
});
```
