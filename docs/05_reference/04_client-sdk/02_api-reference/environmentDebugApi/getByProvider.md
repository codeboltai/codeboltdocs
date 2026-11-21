---
title: getByProvider
---

# `getByProvider`

```typescript
client.environmentDebugApi.getByProvider(providerId: string): Promise<EnvironmentDebugInstance[]>
```

Retrieves environment instances associated with a specific provider.

Filters instances by the provider that created or manages them, useful
for diagnosing issues with a particular environment provider.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `providerId` | `string` | Yes | The unique identifier of the environment provider |

## Returns

`Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of  objects for the given provider

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.getByProvider('providerId');
console.log(result);
```
