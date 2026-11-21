---
title: checkReservationConflicts
---

# `checkReservationConflicts`

```typescript
client.mail.checkReservationConflicts(data: CheckReservationConflictsRequest): Promise<object>
```

Checks whether a proposed reservation would conflict with existing ones.

Validates that a resource is available before attempting to reserve it. Use this to
implement optimistic locking patterns where agents check availability before acting.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckReservationConflictsRequest` | Yes | The conflict check payload |

## Returns

`Promise<object>` — A promise that resolves to an object indicating whether a conflict exists

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.checkReservationConflicts(/* CheckReservationConflictsRequest */);
console.log(result);
```
