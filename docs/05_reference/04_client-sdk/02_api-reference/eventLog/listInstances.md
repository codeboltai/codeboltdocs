---
title: listInstances
---

# `listInstances`

```typescript
client.eventLog.listInstances(params?: Record<string, unknown>): Promise<EventLogInstance[]>
```

Lists all event log instances.

Returns every event log instance in the system. Use optional parameters
to filter or paginate the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<EventLogInstance[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.listInstances();
console.log(result);
```
