---
name: getBrowserInfo
description: Retrieves browser info like height width scrollx scrolly of the current page.
cbbaseinfo:
  description: Retrieves browser info like height width scrollx scrolly of the current page.
data:
  name: getBrowserInfo
  category: browser
  link: getBrowserInfo.md
---

# getBrowserInfo

```text
codebolt.browser.getBrowserInfo(options?: BrowserOperationOptions): Promise<BrowserInfoResponse>
```

Retrieves browser info like height width scrollx scrolly of the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the browser info.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.browser.getBrowserInfo();
  console.log(result);
});
```
