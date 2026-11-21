---
title: getTriggered
---

# `getTriggered`

```typescript
client.calendar.getTriggered(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves triggered calendar events.

Returns events whose trigger conditions have been met and are
pending action or acknowledgment.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options |

## Returns

`Promise<CalendarEvent[]>` — A promise that resolves to an array of triggered CalendarEvent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getTriggered();
console.log(result);
```
