---
title: deleteTaskStep
---

# `deleteTaskStep`

```typescript
client.chat.deleteTaskStep(threadId: string, stepId: string): Promise<void>
```

Deletes a step from a thread via the task endpoint.

Removes a specific step from a thread's step sequence, accessed
through the task management API path.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to delete |

## Returns

`Promise<void>` — A promise that resolves when the step has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.deleteTaskStep('threadId', 'stepId');
console.log(result);
```
