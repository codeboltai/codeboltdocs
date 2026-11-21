---
title: getInstalledProvider
---

# `getInstalledProvider`

```typescript
client.environments.getInstalledProvider(id: string): Promise<InstalledProvider>
```

Retrieves a specific installed provider by its ID.

Returns the full details of a single provider including its configuration
and current state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider |

## Returns

`Promise<InstalledProvider>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getInstalledProvider('id');
console.log(result);
```
