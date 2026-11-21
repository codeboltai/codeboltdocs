---
title: delete
---

# `delete`

```typescript
client.agentExecutionPhases.delete(name: string): Promise<unknown>
```

Deletes an execution phase.

Permanently removes the specified execution phase from the system.
Agents will no longer transition through this phase.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the phase to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the phase has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.delete('name');
console.log(result);
```
