---
title: closeVacancy
---

# `closeVacancy`

```typescript
client.swarm.closeVacancy(swarmId: string, vacancyId: string, data?: CloseVacancyRequest): Promise<void>
```

Close a vacancy in a swarm.

Marks a vacancy as closed, preventing further applications. This is
used when a position has been filled or is no longer available.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `vacancyId` | `string` | Yes | The unique identifier of the vacancy to close |
| `data` | `CloseVacancyRequest` | No | Optional closure information |

## Returns

`Promise<void>` — A promise that resolves when the vacancy is closed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.closeVacancy('swarmId', 'vacancyId');
console.log(result);
```
