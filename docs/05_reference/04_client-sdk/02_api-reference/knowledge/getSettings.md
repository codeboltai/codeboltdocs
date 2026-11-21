---
title: getSettings
---

# `getSettings`

```typescript
client.knowledge.getSettings(id: string): Promise<KnowledgeCollectionSettings>
```

Retrieves the settings for a knowledge collection.

Returns the collection's chunking configuration, embedding settings,
and other processing parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |

## Returns

`Promise<KnowledgeCollectionSettings>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.getSettings('id');
console.log(result);
```
