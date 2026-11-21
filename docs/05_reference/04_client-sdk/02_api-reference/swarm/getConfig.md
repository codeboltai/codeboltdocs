---
title: getConfig
---

# `getConfig`

```typescript
client.swarm.getConfig(swarmId: string): Promise<SwarmConfig>
```

Get the configuration of a swarm.

Retrieves the current configuration settings for a swarm, including
operational parameters, limits, and behavioral settings. Use this
to view swarm settings or for configuration management.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmConfig>` — A promise that resolves to the SwarmConfig object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getConfig('swarmId');
console.log(result);
```
