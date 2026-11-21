---
title: createPhase
---

# `createPhase`

```typescript
client.roadmap.createPhase(data: CreatePhaseRequest): Promise<RoadmapPhase>
```

Creates a new roadmap phase.

Adds a high-level phase to the roadmap for organizing features. Phases typically
represent milestones, sprints, or release versions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePhaseRequest` | Yes | The phase creation payload including name and optional description |

## Returns

`Promise<RoadmapPhase>` — A promise that resolves to the newly created RoadmapPhase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.createPhase(/* CreatePhaseRequest */);
console.log(result);
```
