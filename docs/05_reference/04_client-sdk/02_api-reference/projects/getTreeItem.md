---
title: getTreeItem
---

# `getTreeItem`

```typescript
client.projects.getTreeItem(itemId: string): Promise<TreeItem>
```

Retrieves a specific item from the project's file tree by its identifier.

Returns metadata about a file or directory in the project tree, including its name,
path, type, and any associated metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `itemId` | `string` | Yes | The unique identifier of the tree item to retrieve |

## Returns

`Promise<TreeItem>` — A promise that resolves to the tree item details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getTreeItem('itemId');
console.log(result);
```
