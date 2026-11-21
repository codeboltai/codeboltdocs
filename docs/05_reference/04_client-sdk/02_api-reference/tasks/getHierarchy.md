---
title: getHierarchy
---

# `getHierarchy`

```typescript
client.tasks.getHierarchy(taskId: string): Promise<TaskHierarchy>
```

Retrieves the complete hierarchy for a task.

Returns a hierarchical tree representation starting from the specified
task, including all descendants and their relationships. This provides
a complete view of the task's entire subtree for visualization or
comprehensive analysis.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the root task |

## Returns

`Promise<TaskHierarchy>` — A promise that resolves to a TaskHierarchy object containing the full tree structure

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.getHierarchy('taskId');
console.log(result);
```
