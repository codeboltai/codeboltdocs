---
name: enter
description: Simulates the Enter key press on the current page.
cbbaseinfo:
  description: Simulates the Enter key press on the current page.
data:
  name: enter
  category: browser
  link: enter.md
---

# enter

```text
codebolt.browser.enter(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Simulates the Enter key press on the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves when the Enter action is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page with a form
  await codebolt.browser.goToPage("https://example.com/login");
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Fill in form fields
  await codebolt.browser.type("username", "testuser");
  await codebolt.browser.type("password", "testpass");

  // Simulate pressing the Enter key to submit the form
  const enterResult = await codebolt.browser.enter();
  console.log('✅ Enter key pressed:', enterResult);

  // Check if the Enter key press was successful
  if (enterResult.success) {
    console.log('Enter key pressed successfully');
  } else {
    console.error('Enter key press failed:', enterResult.error);
  }

  // Alternative usage: after typing in a search box
  await codebolt.browser.type("search-input", "search query");
  await codebolt.browser.enter(); // Submit the search
});
```
