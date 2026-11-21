---
title: createScheduledTask
---

# `createScheduledTask`

```typescript
client.chat.createScheduledTask(data: CreateScheduledTaskRequest): Promise<unknown>
```

Creates a new scheduled task.

Registers a task that will be executed at a future time, tracked
within the chat context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateScheduledTaskRequest` | Yes | The scheduled task creation payload |

## Returns

`Promise<unknown>` — A promise that resolves to the created task data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.createScheduledTask(/* CreateScheduledTaskRequest */);
console.log(result);
```
