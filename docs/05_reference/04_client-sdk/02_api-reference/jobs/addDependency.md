---
title: addDependency
---

# `addDependency`

```typescript
client.jobs.addDependency(id: string, data: AddDependencyRequest): Promise<void>
```

Adds a dependency between two jobs.

Declares that the specified job depends on another job, meaning it
cannot start until the dependency is resolved. This builds the
job dependency graph used for scheduling.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the dependent job |
| `data` | `AddDependencyRequest` | Yes | Dependency payload specifying the target job that must complete first |

## Returns

`Promise<void>` — A promise that resolves when the dependency has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.addDependency('id', /* AddDependencyRequest */);
console.log(result);
```
