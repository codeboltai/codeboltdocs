---
title: assignThreadToGroup
---

# `assignThreadToGroup`

```typescript
client.projects.assignThreadToGroup(data: AssignThreadToGroupRequest): Promise<void>
```

Assigns a conversation thread to a task group.

Links a thread to a task group for organizational purposes. A thread can belong
to at most one group at a time.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AssignThreadToGroupRequest` | Yes | The assignment request |

## Returns

`Promise<void>` — A promise that resolves when the assignment has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.assignThreadToGroup(/* AssignThreadToGroupRequest */);
console.log(result);
```
