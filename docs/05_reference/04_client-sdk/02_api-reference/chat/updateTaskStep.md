---
title: updateTaskStep
---

# `updateTaskStep`

```typescript
client.chat.updateTaskStep(threadId: string, stepId: string, data: UpdateThreadStepData): Promise<ChatThreadStep>
```

Updates a step in a thread via the task endpoint.

Modifies the properties of a thread step, accessed through the
task management API path.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to update |
| `data` | `UpdateThreadStepData` | Yes | The fields to update on the step |

## Returns

`Promise<ChatThreadStep>` — A promise that resolves to the updated ChatThreadStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.updateTaskStep('threadId', 'stepId', /* UpdateThreadStepData */);
console.log(result);
```
