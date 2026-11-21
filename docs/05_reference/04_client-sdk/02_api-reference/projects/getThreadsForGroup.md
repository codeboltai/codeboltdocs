---
title: getThreadsForGroup
---

# `getThreadsForGroup`

```typescript
client.projects.getThreadsForGroup(groupId: string): Promise<string[]>
```

Retrieves all thread identifiers assigned to a specific task group.

Returns the list of thread IDs that belong to the specified group.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group |

## Returns

`Promise<string[]>` — A promise that resolves to an array of thread identifier strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getThreadsForGroup('groupId');
console.log(result);
```
