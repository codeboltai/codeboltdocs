---
title: create
---

# `create`

```typescript
client.tasks.create(data: CreateTaskRequest): Promise<Task>
```

Creates a new task in the system.

Creates a new task with the provided configuration. The task can be
a standalone unit of work or can later have child tasks added to create
a task hierarchy. Returns the created task with its generated ID.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskRequest` | Yes | The task creation request containing task properties |

## Returns

`Promise<Task>` — A promise that resolves to the newly created Task object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.create(/* CreateTaskRequest */);
console.log(result);
```
