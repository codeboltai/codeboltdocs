---
title: Open New Browser Instance
description: Open a new browser instance.
name: openNewBrowserInstance
cbbaseinfo:
  description: Open a new browser instance.
---

# openNewBrowserInstance

```text
codebolt.browser.openNewBrowserInstance(options?: BrowserInstanceOptions): Promise<{ instanceId: string; }>
```

Open a new browser instance

## Parameters

- `options` — Optional instance creation options

## Returns

The new instance ID

## When to use it

Open a separate page and keep its ID so later calls can target it. Pass the ID explicitly when navigation or inspection needs a particular page.

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
