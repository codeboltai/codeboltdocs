---
title: getTreeBatch
---

# `getTreeBatch`

```typescript
client.projects.getTreeBatch(data: BatchTreeItemsRequest): Promise<TreeItem[]>
```

Retrieves multiple tree items in a single batch request.

Fetches details for several tree items at once, reducing round trips compared to
individual  calls. Useful when loading multiple files or directories.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BatchTreeItemsRequest` | Yes | The batch request containing the item IDs to fetch |

## Returns

`Promise<TreeItem[]>` — A promise that resolves to an array of tree items

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getTreeBatch(/* BatchTreeItemsRequest */);
console.log(result);
```
