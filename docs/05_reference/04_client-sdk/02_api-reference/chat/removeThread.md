---
title: removeThread
---

# `removeThread`

```typescript
client.chat.removeThread(data: ThreadIdRequest): Promise<void>
```

Removes a thread.

Removes the specified thread from the chat system. This is a
soft-delete that marks the thread as removed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

## Returns

`Promise<void>` — A promise that resolves when the thread has been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.removeThread(/* ThreadIdRequest */);
console.log(result);
```
