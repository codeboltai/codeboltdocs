---
title: updateSettings
---

# `updateSettings`

```typescript
client.vectorDb.updateSettings(id: string, data: UpdateVectorSettingsRequest): Promise<VectorCollectionSettings>
```

Updates settings for a vector collection.

Modifies the configuration parameters of a collection such as
distance metric, index type, or other settings. Some settings
may require index rebuild or have performance implications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateVectorSettingsRequest` | Yes | The settings to update with new values |

## Returns

`Promise<VectorCollectionSettings>` — A promise that resolves to the updated VectorCollectionSettings object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.updateSettings('id', /* UpdateVectorSettingsRequest */);
console.log(result);
```
