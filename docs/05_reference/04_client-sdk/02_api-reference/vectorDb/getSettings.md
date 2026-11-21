---
title: getSettings
---

# `getSettings`

```typescript
client.vectorDb.getSettings(id: string): Promise<VectorCollectionSettings>
```

Retrieves settings for a vector collection.

Fetches the configuration and settings applied to a collection
including index types, distance metrics, and other operational
parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |

## Returns

`Promise<VectorCollectionSettings>` — A promise that resolves to the VectorCollectionSettings object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.getSettings('id');
console.log(result);
```
