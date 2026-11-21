---
title: getSpawnRegistry
---

# `getSpawnRegistry`

```typescript
client.swarm.getSpawnRegistry(swarmId: string): Promise<unknown>
```

Get the spawn registry for a swarm.

Retrieves the spawn registry containing information about all
agents that have been spawned for the swarm, including their
configuration and lifecycle status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<unknown>` — A promise that resolves to the spawn registry data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getSpawnRegistry('swarmId');
console.log(result);
```
