---
title: updateProgress
---

# `updateProgress`

```typescript
client.threads.updateProgress(threadId: string, data: UpdateThreadProgressRequest): Promise<void>
```

Updates the progress information for a thread.

Modifies the thread's progress metrics, such as completion percentage,
current step, or other progress indicators. This is useful for tracking
execution progress and providing feedback to users.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateThreadProgressRequest` | Yes | The request containing progress update information |

## Returns

`Promise<void>` — A promise that resolves when the progress has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.updateProgress('threadId', /* UpdateThreadProgressRequest */);
console.log(result);
```
