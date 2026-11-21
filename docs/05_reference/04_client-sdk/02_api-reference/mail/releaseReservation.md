---
title: releaseReservation
---

# `releaseReservation`

```typescript
client.mail.releaseReservation(data: ReleaseReservationRequest): Promise<void>
```

Releases a previously held resource reservation.

Frees the reserved resource so other agents can access it. Agents should release
reservations promptly when they no longer need exclusive access.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ReleaseReservationRequest` | Yes | The release payload identifying the reservation to free |

## Returns

`Promise<void>` — A promise that resolves when the reservation has been released

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.releaseReservation(/* ReleaseReservationRequest */);
console.log(result);
```
