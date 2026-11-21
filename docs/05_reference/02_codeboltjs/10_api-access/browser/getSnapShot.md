---
name: getSnapShot
description: Retrieves the snapshot of the current page.
cbbaseinfo:
  description: Retrieves the snapshot of the current page.
data:
  name: getSnapShot
  category: browser
  link: getSnapShot.md
---

# getSnapShot

```text
codebolt.browser.getSnapShot(options?: BrowserOperationOptions): Promise<BrowserSnapshotResponse>
```

Retrieves the snapshot of the current page.

## Parameters

- `options` — Optional browser operation options

## Returns

A promise that resolves with the snapshot.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.browser.getSnapShot();
  console.log(result);
});
```
