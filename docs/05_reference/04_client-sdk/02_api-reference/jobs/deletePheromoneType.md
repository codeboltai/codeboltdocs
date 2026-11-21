---
title: deletePheromoneType
---

# `deletePheromoneType`

```typescript
client.jobs.deletePheromoneType(name: string): Promise<void>
```

Deletes a pheromone type by its name.

Removes the pheromone type definition from the system. Existing
pheromones of this type on jobs may also be affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the pheromone type to delete |

## Returns

`Promise<void>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.deletePheromoneType('name');
console.log(result);
```
