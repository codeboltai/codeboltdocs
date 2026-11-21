---
title: validate
---

# `validate`

```typescript
client.memoryIngestion.validate(data: ValidateIngestionPipelineRequest): Promise<unknown>
```

Validates an ingestion pipeline configuration without creating or executing it.

Checks that the pipeline definition is well-formed, all referenced processors exist,
and the processor chain is compatible. Use this to catch errors before saving.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateIngestionPipelineRequest` | Yes | The pipeline configuration to validate |

## Returns

`Promise<unknown>` — A promise that resolves to the validation result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.validate(/* ValidateIngestionPipelineRequest */);
console.log(result);
```
