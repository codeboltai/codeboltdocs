---
name: type
description: Types text into a specified element on the page.
cbbaseinfo:
  description: Types text into a specified element on the page.
data:
  name: type
  category: browser
  link: type.md
---

# type

```text
codebolt.browser.type(elementid: string, text: string, options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Types text into a specified element on the page.

## Parameters

- `elementid` — The ID of the element to type into.
- `text` — The text to type.
- `options` — Optional browser operation options

## Returns

A promise that resolves when the typing action is complete.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page with input forms
  await codebolt.browser.goToPage("https://example.com/form");
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Type text into various input fields
  const typeResult = await codebolt.browser.type("username", "testuser");
  console.log('✅ Typed username:', typeResult);

  // Check if the typing was successful
  if (typeResult.success) {
    console.log('Text entered successfully');
  } else {
    console.error('Typing failed:', typeResult.error);
  }

  // Type email into email field
  await codebolt.browser.type("email", "user@example.com");

  // Type password into password field
  await codebolt.browser.type("password", "securepassword123");

  // Type into a textarea
  await codebolt.browser.type("message", "This is a test message");
});
```
