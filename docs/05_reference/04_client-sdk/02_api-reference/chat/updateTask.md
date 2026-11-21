---
title: updateTask
---

# `updateTask`

```typescript
client.chat.updateTask(data: UpdateChatTaskRequest): Promise<unknown>
```

Updates task information for a thread.

Modifies the task metadata or configuration associated with
a chat thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateChatTaskRequest` | Yes | The task update payload |

## Returns

`Promise<unknown>` — A promise that resolves to the updated task data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.updateTask(/* UpdateChatTaskRequest */);
console.log(result);
```
