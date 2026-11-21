---
title: createThread
---

# `createThread`

```typescript
client.memory.createThread(data: CreateMemoryThreadRequest): Promise<MemoryThread>
```

Creates a new generic memory thread.

Initializes a memory thread that can store arbitrary content. Generic threads are the
base type from which specialized thread types (markdown, JSON, context) derive.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMemoryThreadRequest` | Yes | The thread creation payload |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the newly created memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.createThread(/* CreateMemoryThreadRequest */);
console.log(result);
```
