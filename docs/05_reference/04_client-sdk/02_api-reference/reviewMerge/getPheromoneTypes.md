---
title: getPheromoneTypes
---

# `getPheromoneTypes`

```typescript
client.reviewMerge.getPheromoneTypes(): Promise<string[]>
```

Retrieves the list of available pheromone types.

Pheromones are tags or signals that can be attached to review requests to communicate
metadata to other agents. This returns the set of recognized pheromone type strings.

## Parameters

_No parameters._

## Returns

`Promise<string[]>` — A promise that resolves to an array of pheromone type name strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getPheromoneTypes();
console.log(result);
```
