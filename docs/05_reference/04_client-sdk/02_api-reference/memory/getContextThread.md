---
title: getContextThread
---

# `getContextThread`

```typescript
client.memory.getContextThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific context thread by its unique identifier.

Returns the full context thread including captured conversation data and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to retrieve |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the context memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getContextThread('threadId');
console.log(result);
```
