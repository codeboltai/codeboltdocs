---
title: updateConfig
---

# `updateConfig`

```typescript
client.swarm.updateConfig(swarmId: string, data: UpdateSwarmConfigRequest): Promise<void>
```

Update the configuration of a swarm.

Modifies the configuration settings for a swarm. Changes take effect
immediately and affect all subsequent swarm operations. Use this
to adjust swarm behavior and operational parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `UpdateSwarmConfigRequest` | Yes | The configuration updates |

## Returns

`Promise<void>` — A promise that resolves when the configuration is updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.updateConfig('swarmId', /* UpdateSwarmConfigRequest */);
console.log(result);
```
