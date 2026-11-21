---
title: deleteProjectCompletedTasks
---

# `deleteProjectCompletedTasks`

```typescript
client.tasks.deleteProjectCompletedTasks(projectPath: string): Promise<void>
```

Deletes all completed tasks for a specific project.

Removes all tasks with 'completed' status that belong to the specified
project. Use this for cleanup operations to maintain a lean task
history. This operation cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectPath` | `string` | Yes | The filesystem path identifying the target project |

## Returns

`Promise<void>` — A promise that resolves when the completed tasks have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.deleteProjectCompletedTasks('projectPath');
console.log(result);
```
