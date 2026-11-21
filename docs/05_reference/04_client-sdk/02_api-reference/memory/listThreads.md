---
title: listThreads
---

# `listThreads`

```typescript
client.memory.listThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all generic memory threads with optional filtering.

Returns memory threads that match the provided filter criteria. Use this to browse
or search through stored memory threads.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<MemoryThread[]>` — A promise that resolves to an array of memory threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.listThreads();
console.log(result);
```
