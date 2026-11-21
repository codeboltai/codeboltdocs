---
title: updateSettings
---

# `updateSettings`

```typescript
client.knowledge.updateSettings(id: string, data: UpdateKnowledgeSettingsRequest): Promise<KnowledgeCollectionSettings>
```

Updates the settings for a knowledge collection.

Modifies chunking strategy, chunk size, overlap, and other processing
parameters. Existing documents are not automatically re-chunked;
use  to apply new settings to existing content.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `data` | `UpdateKnowledgeSettingsRequest` | Yes | The settings to update |

## Returns

`Promise<KnowledgeCollectionSettings>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.updateSettings('id', /* UpdateKnowledgeSettingsRequest */);
console.log(result);
```
