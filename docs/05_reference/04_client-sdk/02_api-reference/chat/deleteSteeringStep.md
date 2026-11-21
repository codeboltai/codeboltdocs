---
title: deleteSteeringStep
---

# `deleteSteeringStep`

```typescript
client.chat.deleteSteeringStep(threadId: string, steeringStepId: string): Promise<void>
```

Deletes a steering step from a thread.

Removes the specified steering instruction from the thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `steeringStepId` | `string` | Yes | The unique identifier of the steering step to delete |

## Returns

`Promise<void>` — A promise that resolves when the steering step has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.deleteSteeringStep('threadId', 'steeringStepId');
console.log(result);
```
