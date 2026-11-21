---
title: sendAction
---

# `sendAction`

```typescript
client.browser.sendAction(data: BrowserSendActionRequest): Promise<BrowserActionResult>
```

Sends a generic browser action.

Executes an arbitrary browser action command. Use this for actions
that don't have a dedicated convenience method, or for sending
complex multi-step actions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BrowserSendActionRequest` | Yes | The browser action payload describing the action to perform |

## Returns

`Promise<BrowserActionResult>` — A promise that resolves to the BrowserActionResult with the action outcome

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.browser.sendAction(/* BrowserSendActionRequest */);
console.log(result);
```
