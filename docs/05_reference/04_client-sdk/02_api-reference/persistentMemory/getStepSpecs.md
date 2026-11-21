---
title: getStepSpecs
---

# `getStepSpecs`

```typescript
client.persistentMemory.getStepSpecs(): Promise<PersistentMemoryStepSpec[]>
```

Retrieves all available processing step specifications.

Returns the catalog of step types that can be used when building persistent memory
pipelines. Each spec describes a step's inputs, outputs, and configurable parameters.

## Parameters

_No parameters._

## Returns

`Promise<PersistentMemoryStepSpec[]>` — A promise that resolves to an array of step specifications

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.getStepSpecs();
console.log(result);
```
