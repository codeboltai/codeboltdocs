---
title: List Browser Instances
description: Returns an empty array when the SDK has no active instance ID.
name: listBrowserInstances
cbbaseinfo:
  description: Returns an empty array when the SDK has no active instance ID.
---

# listBrowserInstances

```text
codebolt.browser.listBrowserInstances(): Promise<BrowserInstanceInfo[]>
```

Returns an empty array when the SDK has no active instance ID. Otherwise returns one synthetic entry for the tracked active instance. Its URL and title are empty strings.

## When to use it

Look up the instance currently tracked by this SDK process. Track IDs returned by open calls if your workflow manages several instances.

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
