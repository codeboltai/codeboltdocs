---
title: getFeatures
---

# `getFeatures`

```typescript
client.roadmap.getFeatures(params?: Record<string, unknown>): Promise<RoadmapFeature[]>
```

Retrieves all features across all roadmap phases.

Returns a flat list of all features regardless of which phase they belong to.
Use optional query parameters to filter by status, priority, or other criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering features |

## Returns

`Promise<RoadmapFeature[]>` — A promise that resolves to an array of RoadmapFeature objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.getFeatures();
console.log(result);
```
