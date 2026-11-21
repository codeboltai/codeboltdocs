---
title: updateIdea
---

# `updateIdea`

```typescript
client.roadmap.updateIdea(ideaId: string, data: UpdateIdeaRequest): Promise<RoadmapIdea>
```

Updates an existing idea.

Modifies the properties of an idea such as its title, description, or status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to update |
| `data` | `UpdateIdeaRequest` | Yes | The fields to update on the idea |

## Returns

`Promise<RoadmapIdea>` — A promise that resolves to the updated RoadmapIdea

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.updateIdea('ideaId', /* UpdateIdeaRequest */);
console.log(result);
```
