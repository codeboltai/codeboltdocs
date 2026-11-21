---
title: archiveJsonThread
---

# `archiveJsonThread`

```typescript
client.memory.archiveJsonThread(threadId: string): Promise<unknown>
```

Archives a JSON thread to remove it from active listings.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to archive |

## Returns

`Promise<unknown>` — A promise that resolves when the thread has been archived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.archiveJsonThread('threadId');
console.log(result);
```
