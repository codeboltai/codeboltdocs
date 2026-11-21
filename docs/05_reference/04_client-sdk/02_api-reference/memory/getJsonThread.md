---
title: getJsonThread
---

# `getJsonThread`

```typescript
client.memory.getJsonThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific JSON thread by its unique identifier.

Returns the full JSON thread including its stored data payload and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to retrieve |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the JSON memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getJsonThread('threadId');
console.log(result);
```
