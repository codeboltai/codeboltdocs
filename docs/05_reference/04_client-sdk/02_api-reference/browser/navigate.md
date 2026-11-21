---
title: navigate
---

# `navigate`

```typescript
client.browser.navigate(data: BrowserNavigateRequest): Promise<BrowserActionResult>
```

Navigates the browser to a URL.

Loads the specified URL in the browser, waiting for the page to
reach a ready state before resolving.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserNavigateRequest` | Yes | The navigation request |

## Returns

`Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult after navigation completes

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.browser.navigate(/* BrowserNavigateRequest */);
console.log(result);
```
