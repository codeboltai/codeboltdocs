---
title: getPheromoneTypes
---

# `getPheromoneTypes`

```typescript
client.jobs.getPheromoneTypes(): Promise<PheromoneType[]>
```

Retrieves all registered pheromone types.

Pheromone types define the categories of signals that can be attached
to jobs for swarm-style coordination between agents.

## Parameters

_No parameters._

## Returns

`Promise<PheromoneType[]>` — A promise that resolves to an array of  definitions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getPheromoneTypes();
console.log(result);
```
