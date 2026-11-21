---
title: validate
---

# `validate`

```typescript
client.persistentMemory.validate(data: ValidatePersistentMemoryRequest): Promise<unknown>
```

Validates a persistent memory type configuration without saving it.

Checks that the type definition is well-formed, all referenced step types exist,
and the processing chain is compatible. Use this before creating or updating a type
to catch configuration errors early.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidatePersistentMemoryRequest` | Yes | The type configuration to validate |

## Returns

`Promise<unknown>` — A promise that resolves to the validation result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.validate(/* ValidatePersistentMemoryRequest */);
console.log(result);
```
