---
title: Close Browser Instance
description: Close a browser instance.
name: closeBrowserInstance
cbbaseinfo:
  description: Close a browser instance.
---

# closeBrowserInstance

```text
codebolt.browser.closeBrowserInstance(instanceId: string): Promise<boolean>
```

Close a browser instance

## Parameters

- `instanceId` — The instance ID to close

## Returns

True if successful, false if instance not found

## When to use it

Close a page an agent opened when that workflow is finished. Keep the instance ID so you can close the intended page.

## Example

### Close an instance you opened

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  const closed = await codebolt.browser.closeBrowserInstance(instanceId);
  console.log('Closed', closed);
});
```
