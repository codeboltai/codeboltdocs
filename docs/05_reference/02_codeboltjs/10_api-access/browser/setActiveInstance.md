---
title: Set Active Browser Instance
description: Set the active browser instance.
name: setActiveBrowserInstance
cbbaseinfo:
  description: Set the active browser instance.
---

# setActiveBrowserInstance

```text
codebolt.browser.setActiveBrowserInstance(instanceId: string): Promise<boolean>
```

Set the active browser instance

## Parameters

- `instanceId` — The instance ID to set as active

## Returns

True if successful, false if instance not found

## When to use it

Use this method when a caller works with this SDK process's tracked instance. Explicit instance IDs are the dependable way to target different pages.

## Example

### Select the instance tracked by this SDK process

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const [instance] = await codebolt.browser.listBrowserInstances();
  if (instance) {
    const selected = await codebolt.browser.setActiveBrowserInstance(instance.instanceId);
    console.log('Selected', selected);
  }
});
```
