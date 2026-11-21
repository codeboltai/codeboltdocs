---
title: getIdea
---

# `getIdea`

```typescript
client.roadmap.getIdea(ideaId: string): Promise<RoadmapIdea>
```

Retrieves a specific idea by its ID.

Fetches the full details of a single idea including its status and review history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea |

## Returns

`Promise<RoadmapIdea>` — A promise that resolves to the RoadmapIdea object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.getIdea('ideaId');
console.log(result);
```
