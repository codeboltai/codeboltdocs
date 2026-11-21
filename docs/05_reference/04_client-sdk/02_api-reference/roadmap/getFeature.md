---
title: getFeature
---

# `getFeature`

```typescript
client.roadmap.getFeature(featureId: string): Promise<RoadmapFeature>
```

Retrieves a specific feature by its ID.

Fetches the full details of a single feature including its status, description,
and associated metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature |

## Returns

`Promise<RoadmapFeature>` — A promise that resolves to the RoadmapFeature object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.getFeature('featureId');
console.log(result);
```
