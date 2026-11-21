---
title: deleteTaskGroup
---

# `deleteTaskGroup`

```typescript
client.projects.deleteTaskGroup(groupId: string): Promise<void>
```

Permanently deletes a task group.

Removes the task group. Threads previously assigned to this group will become
unassigned but are not deleted.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group to delete |

## Returns

`Promise<void>` — A promise that resolves when the task group has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.deleteTaskGroup('groupId');
console.log(result);
```
