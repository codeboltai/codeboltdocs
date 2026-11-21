---
title: deleteInstalledProvider
---

# `deleteInstalledProvider`

```typescript
client.environments.deleteInstalledProvider(id: string): Promise<unknown>
```

Deletes an installed environment provider.

Removes the provider registration. Environments already created by this
provider are not automatically deleted.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the installed provider to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.deleteInstalledProvider('id');
console.log(result);
```
