---
title: Execute on Instance
description: Execute action on specific browser instance.
name: executeOnInstance
cbbaseinfo:
  description: Execute action on specific browser instance.
---

# executeOnInstance

```text
codebolt.browser.executeOnInstance(instanceId: string, operation: BrowserOperationType, params: BrowserOperationParams): Promise<BrowserOperationResponse>
```

Execute action on specific browser instance

## Parameters

- `instanceId` — The instance ID to execute on
- `operation` — The operation to execute
- `params` — Parameters for the operation

## Returns

The operation result

## When to use it

Target a specific browser instance when several pages are open. The helper dispatches navigation, screenshots, and content reads.

## Example

### Navigate an explicitly selected browser instance

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  await codebolt.browser.executeOnInstance(instanceId, 'goToPage', {
    url: 'https://example.com/',
  });
  console.log(await codebolt.browser.executeOnInstance(instanceId, 'getContent', {}));
});
```

## Capture a particular browser instance

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const { instanceId } = await codebolt.browser.openNewBrowserInstance();
  try {
    await codebolt.browser.executeOnInstance(instanceId, 'goToPage', { url: 'https://example.com/' });
    const result = await codebolt.browser.executeOnInstance(instanceId, 'screenshot', { fullPage: true });
    console.log(result);
  } finally {
    await codebolt.browser.closeBrowserInstance(instanceId);
  }
});
```
