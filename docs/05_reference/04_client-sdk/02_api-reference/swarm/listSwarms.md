---
title: listSwarms
---

# `listSwarms`

```typescript
client.swarm.listSwarms(params?: Record<string, unknown>): Promise<SwarmSummary[]>
```

List all swarms.

Retrieves all swarms in the system, optionally filtered by query
parameters. Use this to discover available swarms or populate
swarm selection interfaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering swarms |

## Returns

`Promise<SwarmSummary[]>` — A promise that resolves to an array of SwarmSummary objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listSwarms();
console.log(result);
```
