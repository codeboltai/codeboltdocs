---
title: hideThread
---

# `hideThread`

```typescript
client.chat.hideThread(data: ThreadIdRequest): Promise<void>
```

Hides a thread from the user interface.

Removes the thread from the visible thread list without deleting it.
The thread data is preserved and can be restored later.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

## Returns

`Promise<void>` — A promise that resolves when the thread has been hidden

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.hideThread(/* ThreadIdRequest */);
console.log(result);
```
