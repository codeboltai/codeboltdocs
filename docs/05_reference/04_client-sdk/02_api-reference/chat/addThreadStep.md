---
title: addThreadStep
---

# `addThreadStep`

```typescript
client.chat.addThreadStep(threadId: string, stepData: Record<string, unknown>): Promise<ChatThreadStep>
```

Adds a step to a chat thread.

Creates a new step within the thread's step sequence, representing
a discrete unit of work or progress in the conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepData` | `Record<string, unknown>` | Yes | The step definition including type and content |

## Returns

`Promise<ChatThreadStep>` — A promise that resolves to the created ChatThreadStep

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.addThreadStep('threadId', /* Record<string, unknown> */);
console.log(result);
```
