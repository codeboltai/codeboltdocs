---
name: pdfToText
description: Converts the PDF content of the current page to text.
cbbaseinfo:
  description: Converts the PDF content of the current page to text.
data:
  name: pdfToText
  category: browser
  link: pdfToText.md
---

# pdfToText

```text
codebolt.browser.pdfToText(options?: BrowserOperationOptions): Promise<void>
```

Converts the PDF content of the current page to text.

## Parameters

- `options` — Optional browser operation options

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to the page containing the PDF document
  await codebolt.browser.goToPage("https://example.com/report.pdf");

  // Wait for PDF to load
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Convert the PDF content to text
  codebolt.browser.pdfToText();
  console.log('✅ PDF to text conversion initiated');
});
```
