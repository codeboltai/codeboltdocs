---
title: fill
---

# `fill`

```typescript
client.browser.fill(data: BrowserFillRequest): Promise<BrowserActionResult>
```

Fills a form field in the browser.

Types text into the specified form field, replacing any existing content.
The field is identified by a CSS selector or other locator strategy.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserFillRequest` | Yes | The fill request |

## Returns

`Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after the fill

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.browser.fill(/* BrowserFillRequest */);
console.log(result);
```
