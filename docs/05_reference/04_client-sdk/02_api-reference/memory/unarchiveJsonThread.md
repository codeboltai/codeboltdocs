---
title: unarchiveJsonThread
---

# `unarchiveJsonThread`

```typescript
client.memory.unarchiveJsonThread(threadId: string): Promise<unknown>
```

Restores an archived JSON thread back to active status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to unarchive |

## Returns

`Promise<unknown>` — A promise that resolves when the thread has been unarchived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.unarchiveJsonThread('threadId');
console.log(result);
```
