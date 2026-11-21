---
title: updateJsonThread
---

# `updateJsonThread`

```typescript
client.memory.updateJsonThread(threadId: string, data: UpdateJsonThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a JSON thread (name, tags, etc.).

Modifies thread-level properties without changing the stored JSON data.
Use  to change the actual data payload.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to update |
| `data` | `UpdateJsonThreadRequest` | Yes | The metadata fields to update |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the updated JSON thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateJsonThread('threadId', /* UpdateJsonThreadRequest */);
console.log(result);
```
