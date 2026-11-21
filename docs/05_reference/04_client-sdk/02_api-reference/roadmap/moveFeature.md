---
title: moveFeature
---

# `moveFeature`

```typescript
client.roadmap.moveFeature(featureId: string, data: MoveFeatureRequest): Promise<unknown>
```

Moves a feature to a different phase or reorders it within its current phase.

Use this to reorganize the roadmap by relocating features between phases or
changing the display order of features within a phase.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to move |
| `data` | `MoveFeatureRequest` | Yes | The move parameters including target phase and/or position |

## Returns

`Promise<unknown>` — A promise that resolves when the feature has been moved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.moveFeature('featureId', /* MoveFeatureRequest */);
console.log(result);
```
