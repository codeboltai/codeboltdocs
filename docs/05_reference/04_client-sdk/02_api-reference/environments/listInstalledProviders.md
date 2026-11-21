---
title: listInstalledProviders
---

# `listInstalledProviders`

```typescript
client.environments.listInstalledProviders(params?: Record<string, unknown>): Promise<InstalledProvider[]>
```

Lists all installed environment providers.

Returns every provider that has been registered or installed in the system.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<InstalledProvider[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.listInstalledProviders();
console.log(result);
```
