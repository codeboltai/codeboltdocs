---
title: getStatus
---

# `getStatus`

```typescript
client.calendar.getStatus(): Promise<CalendarStatus>
```

Retrieves the calendar service status.

Returns health and configuration information about the calendar
subsystem, including whether triggers are active.

## Parameters

_No parameters._

## Returns

`Promise<CalendarStatus>` — A promise that resolves to the CalendarStatus object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getStatus();
console.log(result);
```
