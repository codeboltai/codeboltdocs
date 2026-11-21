---
title: listVacancies
---

# `listVacancies`

```typescript
client.swarm.listVacancies(swarmId: string, params?: Record<string, unknown>): Promise<SwarmVacancy[]>
```

List vacancies in a swarm.

Retrieves all open vacancies in a swarm, optionally filtered by query
parameters. Use this to find available positions for agents to apply.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering vacancies |

## Returns

`Promise<SwarmVacancy[]>` — A promise that resolves to an array of SwarmVacancy objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listVacancies('swarmId');
console.log(result);
```
