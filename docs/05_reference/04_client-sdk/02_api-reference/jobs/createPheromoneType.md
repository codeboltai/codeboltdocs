---
title: createPheromoneType
---

# `createPheromoneType`

```typescript
client.jobs.createPheromoneType(data: CreatePheromoneTypeRequest): Promise<PheromoneType>
```

Creates a new pheromone type definition.

Registers a new category of pheromone that can subsequently be
deposited on jobs. Pheromone types are system-wide and shared
across all jobs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePheromoneTypeRequest` | Yes | Pheromone type creation payload including name and configuration |

## Returns

`Promise<PheromoneType>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.createPheromoneType(/* CreatePheromoneTypeRequest */);
console.log(result);
```
