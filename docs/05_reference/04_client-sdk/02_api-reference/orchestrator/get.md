---
title: get
---

# `get`

```typescript
client.orchestrator.get(id: string): Promise<OrchestratorInstance>
```

Retrieves a specific orchestrator instance by its unique identifier.

Returns the full configuration and current state of an orchestrator, including its
assigned agents, coordination rules, and execution history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to retrieve |

## Returns

`Promise<OrchestratorInstance>` — A promise that resolves to the orchestrator instance details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.orchestrator.get('id');
console.log(result);
```
