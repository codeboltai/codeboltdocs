---
title: updateInstalledProvider
---

# `updateInstalledProvider`

```typescript
client.environments.updateInstalledProvider(id: string, data: UpdateInstalledProviderRequest): Promise<InstalledProvider>
```

Updates the configuration of an installed provider.

Modifies provider settings such as name, credentials, or resource limits.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider to update |
| `data` | `UpdateInstalledProviderRequest` | Yes | The fields to update on the provider |

## Returns

`Promise<InstalledProvider>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.updateInstalledProvider('id', /* UpdateInstalledProviderRequest */);
console.log(result);
```
