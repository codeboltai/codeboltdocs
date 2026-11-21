---
title: getInstance
---

# `getInstance`

```typescript
client.environmentDebugApi.getInstance(environmentId: string): Promise<EnvironmentDebugInstance>
```

Retrieves a specific environment debug instance by its ID.

Returns the full detail of a single environment instance including
its current state, provider information, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |

## Returns

`Promise<EnvironmentDebugInstance>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.getInstance('environmentId');
console.log(result);
```
