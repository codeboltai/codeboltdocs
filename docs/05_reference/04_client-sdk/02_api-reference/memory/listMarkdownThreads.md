---
title: listMarkdownThreads
---

# `listMarkdownThreads`

```typescript
client.memory.listMarkdownThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all markdown memory threads with optional filtering.

Returns only threads of the markdown type, filtered by the provided parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<MemoryThread[]>` — A promise that resolves to an array of markdown memory threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.listMarkdownThreads();
console.log(result);
```
