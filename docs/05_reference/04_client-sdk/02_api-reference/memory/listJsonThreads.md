---
title: listJsonThreads
---

# `listJsonThreads`

```typescript
client.memory.listJsonThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all JSON memory threads with optional filtering.

Returns only threads of the JSON type, filtered by the provided parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<MemoryThread[]>` — A promise that resolves to an array of JSON memory threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.listJsonThreads();
console.log(result);
```
