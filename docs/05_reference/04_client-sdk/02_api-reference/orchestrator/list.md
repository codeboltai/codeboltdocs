---
title: list
---

# `list`

```typescript
client.orchestrator.list(params?: OrchestratorListParams): Promise<OrchestratorInstance[]>
```

Lists all orchestrator instances with optional filtering.

Returns the collection of configured orchestrators, which can be filtered by status,
type, or other criteria. Each orchestrator defines a coordination strategy for
multi-agent workflows.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `OrchestratorListParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<OrchestratorInstance[]>` — A promise that resolves to an array of orchestrator instances

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.orchestrator.list();
console.log(result);
```
