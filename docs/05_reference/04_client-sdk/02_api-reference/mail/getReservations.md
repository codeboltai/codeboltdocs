---
title: getReservations
---

# `getReservations`

```typescript
client.mail.getReservations(params?: Record<string, unknown>): Promise<MailReservation[]>
```

Lists all currently active resource reservations.

Returns all reservations that have not been released, providing visibility into which
resources are currently claimed by which agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering reservations |

## Returns

`Promise<MailReservation[]>` — A promise that resolves to an array of active reservations

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getReservations();
console.log(result);
```
