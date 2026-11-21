---
title: getTerminationRegistry
---

# `getTerminationRegistry`

```typescript
client.swarm.getTerminationRegistry(swarmId: string): Promise<unknown>
```

Get the termination registry for a swarm.

Retrieves the termination registry containing information about
all agents that have been terminated from the swarm, including
their lifecycle history and termination reasons.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<unknown>` — A promise that resolves to the termination registry data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getTerminationRegistry('swarmId');
console.log(result);
```
