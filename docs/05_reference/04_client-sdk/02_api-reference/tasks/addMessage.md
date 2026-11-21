---
title: addMessage
---

# `addMessage`

```typescript
client.tasks.addMessage(taskId: string, data: AddTaskMessageRequest): Promise<TaskMessage>
```

Adds a message to a task's message thread.

Appends a new message to the task's communication thread. Messages
can be used for notes, comments, status updates, or other
communication related to the task. Returns the created message.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to add the message to |
| `data` | `AddTaskMessageRequest` | Yes | The message creation request |

## Returns

`Promise<TaskMessage>` — A promise that resolves to the created TaskMessage object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.addMessage('taskId', /* AddTaskMessageRequest */);
console.log(result);
```
