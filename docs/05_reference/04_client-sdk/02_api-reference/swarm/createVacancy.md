---
title: createVacancy
---

# `createVacancy`

```typescript
client.swarm.createVacancy(swarmId: string, data: CreateVacancyRequest): Promise<SwarmVacancy>
```

Create a vacancy in a swarm.

Creates a new vacancy that agents can apply for. Vacancies represent
open positions within teams or roles that need to be filled by
qualified agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateVacancyRequest` | Yes | The vacancy creation information |

## Returns

`Promise<SwarmVacancy>` — A promise that resolves to the created SwarmVacancy object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createVacancy('swarmId', /* CreateVacancyRequest */);
console.log(result);
```
