---
title: getExecutors
---

# `getExecutors`

```typescript
client.capability.getExecutors(params?: Record<string, unknown>): Promise<CapabilityExecutor[]>
```

Retrieves all capability executors.

Returns the list of executor implementations that are registered
to handle capability invocations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

## Returns

`Promise<CapabilityExecutor[]>` — A promise that resolves to an array of CapabilityExecutor objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.getExecutors();
console.log(result);
```
