---
title: update
---

# `update`

```typescript
client.threads.update(threadId: string, data: UpdateThreadRequest): Promise<Thread>
```

Updates an existing thread with new information.

Modifies the specified thread's configuration, metadata, or other
attributes. Only the fields provided in the request will be updated.
Use this to make changes to existing threads.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateThreadRequest` | Yes | The update request containing the fields to modify |

## Returns

`Promise<Thread>` — A promise that resolves to the updated Thread object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.update('threadId', /* UpdateThreadRequest */);
console.log(result);
```
