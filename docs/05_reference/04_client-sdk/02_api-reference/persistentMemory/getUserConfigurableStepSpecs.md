---
title: getUserConfigurableStepSpecs
---

# `getUserConfigurableStepSpecs`

```typescript
client.persistentMemory.getUserConfigurableStepSpecs(): Promise<PersistentMemoryStepSpec[]>
```

Retrieves step specifications that are user-configurable.

Returns a subset of step specifications that expose user-facing configuration options,
filtering out internal-only or system-managed steps.

## Parameters

_No parameters._

## Returns

`Promise<PersistentMemoryStepSpec[]>` — A promise that resolves to an array of user-configurable step specifications

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.getUserConfigurableStepSpecs();
console.log(result);
```
