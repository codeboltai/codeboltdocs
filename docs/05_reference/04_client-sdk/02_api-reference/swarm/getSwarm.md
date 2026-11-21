---
title: getSwarm
---

# `getSwarm`

```typescript
client.swarm.getSwarm(swarmId: string): Promise<SwarmData>
```

Get a swarm by ID.

Retrieves detailed information about a specific swarm including
its configuration, teams, roles, and agents. Use this for displaying
swarm details or managing swarm state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmData>` — A promise that resolves to the SwarmData object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getSwarm('swarmId');
console.log(result);
```
