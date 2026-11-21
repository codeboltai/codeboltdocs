---
name: extractText
description: Extracts text from the current page.
cbbaseinfo:
  description: Extracts text from the current page.
data:
  name: extractText
  category: browser
  link: extractText.md
---

# extractText

```text
codebolt.browser.extractText(options?: BrowserOperationOptions): Promise<ExtractTextResponse>
```

Extracts text from the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the extracted text.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to the page
  await codebolt.browser.goToPage("https://example.com");

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract all text from the current page
  const textResult = await codebolt.browser.extractText();
  console.log('✅ Text extracted:', {
      success: textResult.success,
      textLength: textResult.text ? textResult.text.length : 0
  });

  // Access the extracted text
  if (textResult.success && textResult.text) {
      console.log('Extracted text:', textResult.text);
      // Process the text as needed for analysis or storage
  } else {
      console.error('Failed to extract text:', textResult.error);
  }
});
```
