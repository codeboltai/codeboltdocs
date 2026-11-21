---
title: saveMetadata
---

# `saveMetadata`

```typescript
client.projectStructure.saveMetadata(data: SaveWorkspaceMetadataRequest): Promise<void>
```

Saves the complete workspace metadata, replacing any existing structure.

Persists a full workspace metadata object. This is a wholesale replacement operation;
use the individual package endpoints for targeted updates.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveWorkspaceMetadataRequest` | Yes | The complete workspace metadata to save |

## Returns

`Promise<void>` — A promise that resolves when the metadata has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.saveMetadata(/* SaveWorkspaceMetadataRequest */);
console.log(result);
```
