---
title: deleteCompletedTasks
---

# `deleteCompletedTasks`

```typescript
client.tasks.deleteCompletedTasks(): Promise<void>
```

Deletes all completed tasks across all projects.

Removes every task with 'completed' status in the entire system.
This is a global cleanup operation that affects all projects.
Use with caution as this operation cannot be undone.

## Parameters

_No parameters._

## Returns

`Promise<void>` — A promise that resolves when all completed tasks have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.deleteCompletedTasks();
console.log(result);
```
