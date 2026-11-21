---
title: create
---

# `create`

```typescript
client.orchestrator.create(data: CreateOrchestratorRequest): Promise<OrchestratorInstance>
```

Creates a new orchestrator instance with the specified configuration.

Sets up a new orchestrator that will coordinate agent interactions according to the
provided rules and workflow definitions. The orchestrator can be started immediately
or configured further before activation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateOrchestratorRequest` | Yes | The orchestrator creation configuration |

## Returns

`Promise<OrchestratorInstance>` — A promise that resolves to the newly created orchestrator instance

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.orchestrator.create(/* CreateOrchestratorRequest */);
console.log(result);
```
