---
title: getIdeas
---

# `getIdeas`

```typescript
client.roadmap.getIdeas(params?: Record<string, unknown>): Promise<RoadmapIdea[]>
```

Retrieves all ideas in the roadmap idea pool.

Ideas are proposals that have not yet been promoted to features. Use optional
query parameters to filter by status or other criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering ideas |

## Returns

`Promise<RoadmapIdea[]>` — A promise that resolves to an array of RoadmapIdea objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.getIdeas();
console.log(result);
```
