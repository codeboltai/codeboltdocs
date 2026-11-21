---
title: createTaskGroup
---

# `createTaskGroup`

```typescript
client.projects.createTaskGroup(data: CreateTaskGroupRequest): Promise<TaskGroup>
```

Creates a new task group for organizing conversation threads.

Defines a new group that threads can be assigned to for organizational purposes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskGroupRequest` | Yes | The task group creation payload |

## Returns

`Promise<TaskGroup>` — A promise that resolves to the newly created task group

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.createTaskGroup(/* CreateTaskGroupRequest */);
console.log(result);
```
