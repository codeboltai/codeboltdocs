---
title: update
---

# `update`

```typescript
client.orchestrator.update(id: string, data: UpdateOrchestratorRequest): Promise<OrchestratorInstance>
```

Updates an existing orchestrator instance's configuration.

Modifies the settings, rules, or agent assignments of an orchestrator. Changes take
effect for subsequent workflow executions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to update |
| `data` | `UpdateOrchestratorRequest` | Yes | The fields to update on the orchestrator |

## Returns

`Promise<OrchestratorInstance>` — A promise that resolves to the updated orchestrator instance

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.orchestrator.update('id', /* UpdateOrchestratorRequest */);
console.log(result);
```
