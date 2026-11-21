---
title: getExecutionStatus
---

# `getExecutionStatus`

```typescript
client.swarm.getExecutionStatus(swarmId: string): Promise<SwarmStatusUpdate>
```

Get the execution status of a swarm.

Retrieves real-time information about swarm execution including
current tasks, agent activity, progress metrics, and any errors
or warnings encountered.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmStatusUpdate>` — A promise that resolves to the SwarmStatusUpdate object with execution details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getExecutionStatus('swarmId');
console.log(result);
```
