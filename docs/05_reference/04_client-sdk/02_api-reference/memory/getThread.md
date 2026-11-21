---
title: getThread
---

# `getThread`

```typescript
client.memory.getThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific memory thread by its unique identifier.

Returns the full thread object including metadata, content references, and status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the memory thread details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getThread('threadId');
console.log(result);
```
