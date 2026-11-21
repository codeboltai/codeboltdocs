---
title: createContextThread
---

# `createContextThread`

```typescript
client.memory.createContextThread(data: CreateContextThreadRequest): Promise<MemoryThread>
```

Creates a new context memory thread.

Initializes a thread designed to capture and store conversational context. Context
threads preserve the state and knowledge gathered during chat interactions for later
recall and summarization.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateContextThreadRequest` | Yes | The context thread creation payload |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the newly created context thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.createContextThread(/* CreateContextThreadRequest */);
console.log(result);
```
