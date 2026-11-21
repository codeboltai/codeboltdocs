---
name: getContent
description: Retrieves the content of the current page.
cbbaseinfo:
  description: Retrieves the content of the current page.
data:
  name: getContent
  category: browser
  link: getContent.md
---

# getContent

```text
codebolt.browser.getContent(options?: BrowserOperationOptions): Promise<GetContentResponse>
```

Retrieves the content of the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the content.

## Example

```js 
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to the page
  await codebolt.browser.goToPage("https://example.com");

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Retrieve the content of the current page
  const contentResult = await codebolt.browser.getContent();
  console.log('✅ Content retrieved:', {
      success: contentResult.success,
      contentLength: contentResult.content ? contentResult.content.length : 0,
      hasHtml: !!contentResult.html,
      hasText: !!contentResult.text
  });

  // Access the actual content
  if (contentResult.success && contentResult.content) {
      console.log('Page content:', contentResult.content);
      // Process the content as needed
  }
});
```
