---
title: createJsonThread
---

# `createJsonThread`

```typescript
client.memory.createJsonThread(data: CreateJsonThreadRequest): Promise<MemoryThread>
```

Creates a new JSON-formatted memory thread.

Initializes a thread optimized for storing structured JSON data. JSON threads are
ideal for configuration, structured records, and data that needs programmatic access.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJsonThreadRequest` | Yes | The JSON thread creation payload |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the newly created JSON thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.createJsonThread(/* CreateJsonThreadRequest */);
console.log(result);
```
