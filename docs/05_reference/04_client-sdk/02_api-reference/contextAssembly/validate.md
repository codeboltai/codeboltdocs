---
title: validate
---

# `validate`

```typescript
client.contextAssembly.validate(data: ValidateContextAssemblyRequest): Promise<unknown>
```

Validates a context assembly configuration.

Checks that the provided assembly configuration is valid and all
referenced sources and rules exist before execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateContextAssemblyRequest` | Yes | The configuration to validate |

## Returns

`Promise<unknown>` — A promise that resolves with the validation result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextAssembly.validate(/* ValidateContextAssemblyRequest */);
console.log(result);
```
