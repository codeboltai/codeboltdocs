---
title: screenshot
---

# `screenshot`

```typescript
client.browser.screenshot(data?: BrowserScreenshotRequest): Promise<BrowserActionResult>
```

Takes a screenshot of the current browser viewport.

Captures the visible portion of the browser page as an image.
Useful for visual verification and debugging during automated testing.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserScreenshotRequest` | No | Optional screenshot configuration |

## Returns

`Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult containing the screenshot data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.browser.screenshot();
console.log(result);
```
