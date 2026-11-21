---
title: updateAppToCache
---

# `updateAppToCache`

```typescript
client.apps.updateAppToCache(params?: AppCacheParams): Promise<unknown>
```

Updates an app's data in the cache.

Refreshes the cached representation of an app, ensuring that the
latest metadata is available without a full reload.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AppCacheParams` | No | Optional cache parameters identifying the app |

## Returns

`Promise<unknown>` — A promise that resolves when the cache has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.updateAppToCache();
console.log(result);
```
