---
title: deleteFeature
---

# `deleteFeature`

```typescript
client.roadmap.deleteFeature(featureId: string): Promise<unknown>
```

Deletes a feature from the roadmap.

Permanently removes a feature. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the feature has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.deleteFeature('featureId');
console.log(result);
```
