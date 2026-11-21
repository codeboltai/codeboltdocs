---
title: updatePhase
---

# `updatePhase`

```typescript
client.roadmap.updatePhase(phaseId: string, data: UpdatePhaseRequest): Promise<RoadmapPhase>
```

Updates an existing roadmap phase.

Modifies the properties of a phase such as its name, description, or ordering.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to update |
| `data` | `UpdatePhaseRequest` | Yes | The fields to update on the phase |

## Returns

`Promise<RoadmapPhase>` — A promise that resolves to the updated RoadmapPhase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.updatePhase('phaseId', /* UpdatePhaseRequest */);
console.log(result);
```
