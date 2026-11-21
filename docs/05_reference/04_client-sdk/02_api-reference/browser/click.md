---
title: click
---

# `click`

```typescript
client.browser.click(data: BrowserClickRequest): Promise<BrowserActionResult>
```

Clicks an element in the browser.

Simulates a mouse click on the specified element, identified by
a CSS selector or other locator strategy.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserClickRequest` | Yes | The click request |

## Returns

`Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after the click

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.browser.click(/* BrowserClickRequest */);
console.log(result);
```
