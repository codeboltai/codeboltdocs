---
title: listContextThreads
---

# `listContextThreads`

```typescript
client.memory.listContextThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all context memory threads with optional filtering.

Returns only threads of the context type, filtered by the provided parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<MemoryThread[]>` — A promise that resolves to an array of context memory threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.listContextThreads();
console.log(result);
```
