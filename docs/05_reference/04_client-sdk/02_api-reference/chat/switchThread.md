---
title: switchThread
---

# `switchThread`

```typescript
client.chat.switchThread(data: ThreadIdRequest): Promise<void>
```

Switches to a different chat thread.

Changes the active conversation context to the specified thread,
triggering any associated UI updates.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier to switch to |

## Returns

`Promise<void>` — A promise that resolves when the switch is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.switchThread(/* ThreadIdRequest */);
console.log(result);
```
