---
title: getAll
---

# `getAll`

```typescript
client.agentDeliberation.getAll(params?: Record<string, unknown>): Promise<Deliberation[]>
```

Retrieves all deliberations.

Returns every deliberation in the system, optionally filtered by
the provided query parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query or filter parameters |

## Returns

`Promise<Deliberation[]>` — A promise that resolves to an array of Deliberation objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.getAll();
console.log(result);
```
