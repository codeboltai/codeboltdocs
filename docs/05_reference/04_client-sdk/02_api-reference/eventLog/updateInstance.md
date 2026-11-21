---
title: updateInstance
---

# `updateInstance`

```typescript
client.eventLog.updateInstance(id: string, data: UpdateEventLogInstanceRequest): Promise<EventLogInstance>
```

Updates an existing event log instance.

Modifies the instance's properties such as name, description, or
configuration settings.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance to update |
| `data` | `UpdateEventLogInstanceRequest` | Yes | The fields to update |

## Returns

`Promise<EventLogInstance>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.updateInstance('id', /* UpdateEventLogInstanceRequest */);
console.log(result);
```
