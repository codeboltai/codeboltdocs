---
title: getPhase
---

# `getPhase`

```typescript
client.roadmap.getPhase(phaseId: string): Promise<RoadmapPhase>
```

Retrieves a specific roadmap phase by its ID.

Fetches the full details of a single phase including its metadata and associated features.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase |

## Returns

`Promise<RoadmapPhase>` — A promise that resolves to the RoadmapPhase object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.getPhase('phaseId');
console.log(result);
```
