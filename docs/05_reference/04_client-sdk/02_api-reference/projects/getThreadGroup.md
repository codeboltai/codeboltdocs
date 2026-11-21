---
title: getThreadGroup
---

# `getThreadGroup`

```typescript
client.projects.getThreadGroup(threadId: string): Promise<TaskGroup | null>
```

Retrieves the task group that a specific thread is assigned to.

Returns the group assignment for a thread, or null if the thread is not assigned
to any group.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The identifier of the thread to look up |

## Returns

`Promise<TaskGroup | null>` — A promise that resolves to the assigned task group, or null if unassigned

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getThreadGroup('threadId');
console.log(result);
```
