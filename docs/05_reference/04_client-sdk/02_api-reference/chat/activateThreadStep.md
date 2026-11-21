---
title: activateThreadStep
---

# `activateThreadStep`

```typescript
client.chat.activateThreadStep(threadId: string, stepId: string): Promise<ChatThreadStep>
```

Activates a step in a chat thread.

Marks the specified step as the currently active step, indicating
that work is in progress on this step.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to activate |

## Returns

`Promise<ChatThreadStep>` — A promise that resolves to the activated ChatThreadStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.activateThreadStep('threadId', 'stepId');
console.log(result);
```
