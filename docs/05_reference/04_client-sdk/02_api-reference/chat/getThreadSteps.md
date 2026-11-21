---
title: getThreadSteps
---

# `getThreadSteps`

```typescript
client.chat.getThreadSteps(threadId: string): Promise<ChatThreadStep[]>
```

Retrieves all steps for a chat thread.

Returns the complete step sequence for the given thread, showing
the progression of work within the conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<ChatThreadStep[]>` — A promise that resolves to an array of ChatThreadStep objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getThreadSteps('threadId');
console.log(result);
```
