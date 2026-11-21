---
title: updateThread
---

# `updateThread`

```typescript
client.memory.updateThread(threadId: string, data: UpdateMemoryThreadRequest): Promise<MemoryThread>
```

Updates the metadata or content of a generic memory thread.

Modifies an existing thread's properties such as name, tags, or stored data.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateMemoryThreadRequest` | Yes | The fields to update on the thread |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the updated memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateThread('threadId', /* UpdateMemoryThreadRequest */);
console.log(result);
```
