---
title: getAppFromCache
---

# `getAppFromCache`

```typescript
client.apps.getAppFromCache(params?: AppCacheParams): Promise<unknown>
```

Retrieves an app's data from the cache.

Returns the cached representation of an app for fast access,
avoiding a full database or filesystem lookup.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AppCacheParams` | No | Optional cache parameters identifying the app |

## Returns

`Promise<unknown>` — A promise that resolves to the cached app data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.getAppFromCache();
console.log(result);
```
