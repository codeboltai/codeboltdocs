---
title: get
---

# `get`

```typescript
client.roadmap.get(params?: Record<string, unknown>): Promise<RoadmapPhase[]>
```

Retrieves the full roadmap with all phases.

Returns the complete roadmap structure including all phases and their nested features.
Use optional query parameters to filter or paginate results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering the roadmap |

## Returns

`Promise<RoadmapPhase[]>` — A promise that resolves to an array of RoadmapPhase objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.get();
console.log(result);
```
