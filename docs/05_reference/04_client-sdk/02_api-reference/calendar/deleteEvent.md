---
title: deleteEvent
---

# `deleteEvent`

```typescript
client.calendar.deleteEvent(id: string): Promise<void>
```

Deletes a calendar event.

Permanently removes the specified calendar event.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to delete |

## Returns

`Promise<void>` — A promise that resolves when the event has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.deleteEvent('id');
console.log(result);
```
