---
title: updateContextThread
---

# `updateContextThread`

```typescript
client.memory.updateContextThread(threadId: string, data: UpdateContextThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a context thread.

Modifies thread-level properties such as name and tags without affecting the stored
conversational context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to update |
| `data` | `UpdateContextThreadRequest` | Yes | The metadata fields to update |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the updated context thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateContextThread('threadId', /* UpdateContextThreadRequest */);
console.log(result);
```
