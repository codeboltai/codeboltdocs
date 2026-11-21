---
title: applyToVacancy
---

# `applyToVacancy`

```typescript
client.swarm.applyToVacancy(swarmId: string, vacancyId: string, data?: ApplyToVacancyRequest): Promise<void>
```

Apply to a vacancy in a swarm.

Submits an application from an agent for a specific vacancy. The agent
will be considered for the position and may be selected based on
qualifications and availability.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `vacancyId` | `string` | Yes | The unique identifier of the vacancy |
| `data` | `ApplyToVacancyRequest` | No | Optional application information |

## Returns

`Promise<void>` — A promise that resolves when the application is submitted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.applyToVacancy('swarmId', 'vacancyId');
console.log(result);
```
