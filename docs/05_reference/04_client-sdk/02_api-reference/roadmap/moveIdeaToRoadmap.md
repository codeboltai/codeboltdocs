---
title: moveIdeaToRoadmap
---

# `moveIdeaToRoadmap`

```typescript
client.roadmap.moveIdeaToRoadmap(ideaId: string, data?: MoveIdeaToRoadmapRequest): Promise<unknown>
```

Promotes an idea to the roadmap as a feature.

Converts a reviewed and approved idea into a feature within a specified roadmap phase.
This is the final step in the idea-to-feature pipeline.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to promote |
| `data` | `MoveIdeaToRoadmapRequest` | No | Optional parameters including target phase for the new feature |

## Returns

`Promise<unknown>` — A promise that resolves when the idea has been promoted to a feature

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.moveIdeaToRoadmap('ideaId');
console.log(result);
```
