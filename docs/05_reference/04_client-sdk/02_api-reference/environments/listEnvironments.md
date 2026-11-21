---
title: listEnvironments
---

# `listEnvironments`

```typescript
client.environments.listEnvironments(params?: Record<string, unknown>): Promise<Environment[]>
```

Lists all environments.

Returns every environment regardless of state. Use optional parameters
to filter or paginate the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<Environment[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.listEnvironments();
console.log(result);
```
