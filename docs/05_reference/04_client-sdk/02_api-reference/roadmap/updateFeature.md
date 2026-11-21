---
title: updateFeature
---

# `updateFeature`

```typescript
client.roadmap.updateFeature(featureId: string, data: UpdateFeatureRequest): Promise<RoadmapFeature>
```

Updates an existing feature.

Modifies the properties of a feature such as its title, description, status, or priority.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to update |
| `data` | `UpdateFeatureRequest` | Yes | The fields to update on the feature |

## Returns

`Promise<RoadmapFeature>` — A promise that resolves to the updated RoadmapFeature

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.updateFeature('featureId', /* UpdateFeatureRequest */);
console.log(result);
```
