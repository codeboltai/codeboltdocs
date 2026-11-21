---
title: getInstance
---

# `getInstance`

```typescript
client.eventLog.getInstance(id: string): Promise<EventLogInstance>
```

Retrieves a specific event log instance by its ID.

Returns the full details of a single event log instance including
its metadata and configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance |

## Returns

`Promise<EventLogInstance>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.getInstance('id');
console.log(result);
```
