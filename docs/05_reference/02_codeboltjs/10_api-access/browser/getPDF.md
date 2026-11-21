---
name: getPDF
description: Retrieves the PDF content of the current page.
cbbaseinfo:
  description: Retrieves the PDF content of the current page.
data:
  name: getPDF
  category: browser
  link: getPDF.md
---

# getPDF

```text
codebolt.browser.getPDF(options?: BrowserOperationOptions): Promise<BrowserActionResponseData>
```

Retrieves the PDF content of the current page.

## Parameters

- `options` — Optional browser operation options

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Navigate to a page
  await codebolt.browser.goToPage("https://example-ecommerce.com/product/12345");

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate PDF of the current page
  codebolt.browser.getPDF();
  console.log('✅ PDF generation initiated');
});
```
