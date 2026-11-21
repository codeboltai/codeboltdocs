---
title: createSwarm
---

# `createSwarm`

```typescript
client.swarm.createSwarm(data: CreateSwarmRequest): Promise<SwarmData>
```

Create a new swarm.

Initializes a new swarm with the specified configuration. Swarms
are the top-level organizational unit for multi-agent coordination,
containing teams, roles, and agents that work together on tasks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateSwarmRequest` | Yes | The swarm configuration and metadata |

## Returns

`Promise<SwarmData>` — A promise that resolves to the created SwarmData object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createSwarm(/* CreateSwarmRequest */);
console.log(result);
```
