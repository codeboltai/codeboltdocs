---
title: completeThreadStep
---

# `completeThreadStep`

```typescript
client.chat.completeThreadStep(threadId: string, stepId: string, data?: CompleteStepData): Promise<ChatThreadStep>
```

Completes a step in a chat thread.

Marks the specified step as completed, optionally recording
completion details such as the outcome or output.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to complete |
| `data` | `CompleteStepData` | No | Optional completion details |

## Returns

`Promise<ChatThreadStep>` — A promise that resolves to the completed ChatThreadStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.completeThreadStep('threadId', 'stepId');
console.log(result);
```
