---
title: createFeature
---

# `createFeature`

```typescript
client.roadmap.createFeature(phaseId: string, data: CreateFeatureRequest): Promise<RoadmapFeature>
```

Creates a new feature within a specific phase.

Adds a feature to the roadmap under the specified phase. Features represent
discrete pieces of functionality planned for delivery.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to add the feature to |
| `data` | `CreateFeatureRequest` | Yes | The feature creation payload including title and description |

## Returns

`Promise<RoadmapFeature>` — A promise that resolves to the newly created RoadmapFeature

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.createFeature('phaseId', /* CreateFeatureRequest */);
console.log(result);
```
