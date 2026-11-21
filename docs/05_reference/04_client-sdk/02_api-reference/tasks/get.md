---
title: get
---

# `get`

```typescript
client.tasks.get(taskId: string): Promise<Task>
```

Retrieves a specific task by its unique identifier.

Returns the complete task object including all properties, metadata,
and relationships. Use this to get full task details after a search or
when you need the complete task representation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to retrieve |

## Returns

`Promise<Task>` — A promise that resolves to the Task object with the specified ID

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.get('taskId');
console.log(result);
```
