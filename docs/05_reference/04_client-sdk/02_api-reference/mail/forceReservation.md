---
title: forceReservation
---

# `forceReservation`

```typescript
client.mail.forceReservation(data: ForceReservationRequest): Promise<void>
```

Force-releases a reservation, overriding the owning agent's hold.

Forcefully frees a resource reservation regardless of the current owner. Use this as
an administrative override when an agent has become unresponsive or the reservation
is stale.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ForceReservationRequest` | Yes | The force-release payload |

## Returns

`Promise<void>` — A promise that resolves when the reservation has been forcefully released

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.forceReservation(/* ForceReservationRequest */);
console.log(result);
```
