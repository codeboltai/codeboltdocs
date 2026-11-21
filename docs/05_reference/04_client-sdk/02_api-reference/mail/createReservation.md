---
title: createReservation
---

# `createReservation`

```typescript
client.mail.createReservation(data: CreateReservationRequest): Promise<MailReservation>
```

Creates a resource reservation for an agent.

Reserves exclusive access to a shared resource (e.g., a file, tool, or service) for
the requesting agent. Other agents can check for conflicts before attempting to access
the same resource.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateReservationRequest` | Yes | The reservation request payload |

## Returns

`Promise<MailReservation>` — A promise that resolves to the created reservation

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.createReservation(/* CreateReservationRequest */);
console.log(result);
```
