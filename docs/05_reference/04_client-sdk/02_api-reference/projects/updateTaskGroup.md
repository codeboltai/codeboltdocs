---
title: updateTaskGroup
---

# `updateTaskGroup`

```typescript
client.projects.updateTaskGroup(groupId: string, data: UpdateTaskGroupRequest): Promise<TaskGroup>
```

Updates an existing task group's properties.

Modifies the task group's name, description, or other metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group to update |
| `data` | `UpdateTaskGroupRequest` | Yes | The fields to update on the task group |

## Returns

`Promise<TaskGroup>` — A promise that resolves to the updated task group

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.updateTaskGroup('groupId', /* UpdateTaskGroupRequest */);
console.log(result);
```
