---
title: deletePhase
---

# `deletePhase`

```typescript
client.roadmap.deletePhase(phaseId: string): Promise<unknown>
```

Deletes a roadmap phase.

Permanently removes a phase and potentially its associated features. This action
cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phaseId` | `string` | Yes | The unique identifier of the phase to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the phase has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.deletePhase('phaseId');
console.log(result);
```
