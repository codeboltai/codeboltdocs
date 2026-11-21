---
title: deleteThread
---

# `deleteThread`

```typescript
client.chat.deleteThread(data: ThreadIdRequest): Promise<void>
```

Deletes a chat thread.

Permanently removes the specified thread and all its associated
messages and steps.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

## Returns

`Promise<void>` — A promise that resolves when the thread has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.deleteThread(/* ThreadIdRequest */);
console.log(result);
```
