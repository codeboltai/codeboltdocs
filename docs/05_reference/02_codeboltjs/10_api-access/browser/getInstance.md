---
title: Get Browser Instance
description: Gets detailed information about a specific browser instance.
name: getBrowserInstance
---

# getBrowserInstance

```text
codebolt.browser.getBrowserInstance(instanceId: string): Promise<BrowserInstanceInfo | null>
```

Looks up the supplied ID in the SDK’s locally tracked browser instance list and returns the matching entry or `null`.

## When to use it

Check whether an ID matches the active instance tracked by this SDK process. Navigation and screenshot results provide live page information.

## Example

### Open a browser instance and look up its ID

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  await codebolt.browser.goToPage('https://example.com/', { instanceId });
  const active = await codebolt.browser.getBrowserInstance(instanceId);
  console.log('Tracked instance', active?.instanceId);
  console.log('Tracked instances', await codebolt.browser.listBrowserInstances());
});
```
