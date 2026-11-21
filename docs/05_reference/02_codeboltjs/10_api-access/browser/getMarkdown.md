---
name: getMarkdown
description: Retrieves the Markdown content of the current page.
cbbaseinfo:
  description: Retrieves the Markdown content of the current page.
data:
  name: getMarkdown
  category: browser
  link: getMarkdown.md
---

# getMarkdown

```text
codebolt.browser.getMarkdown(options?: BrowserOperationOptions): Promise<GetMarkdownResponse>
```

Retrieves the Markdown content of the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the Markdown content.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to the page
  await codebolt.browser.goToPage("https://example.com");

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Retrieve the Markdown content of the current page
  const markdownResult = await codebolt.browser.getMarkdown();
  console.log('✅ Markdown retrieved:', {
      success: markdownResult.success,
      markdownLength: markdownResult.markdown ? markdownResult.markdown.length : 0
  });

  // Access the actual Markdown content
  if (markdownResult.success && markdownResult.markdown) {
      console.log('Markdown content:', markdownResult.markdown);
      // Save or process the Markdown as needed
  } else {
      console.error('Failed to retrieve Markdown:', markdownResult.error);
  }
});
```
