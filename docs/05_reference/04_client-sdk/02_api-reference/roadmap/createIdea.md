---
title: createIdea
---

# `createIdea`

```typescript
client.roadmap.createIdea(data: CreateIdeaRequest): Promise<RoadmapIdea>
```

Creates a new idea in the roadmap idea pool.

Adds an idea that can later be reviewed, refined, and potentially promoted
to a full feature on the roadmap.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateIdeaRequest` | Yes | The idea creation payload including title and description |

## Returns

`Promise<RoadmapIdea>` — A promise that resolves to the newly created RoadmapIdea

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.createIdea(/* CreateIdeaRequest */);
console.log(result);
```
