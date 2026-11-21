---
title: deleteInstance
---

# `deleteInstance`

```typescript
client.eventLog.deleteInstance(id: string): Promise<unknown>
```

Deletes an event log instance and all its associated events.

Permanently removes the instance. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.deleteInstance('id');
console.log(result);
```
