---
title: getTreeChildren
---

# `getTreeChildren`

```typescript
client.projects.getTreeChildren(parentId: string): Promise<TreeItem[]>
```

Retrieves the child items of a specific node in the project file tree.

Returns the immediate children (files and subdirectories) of the specified parent
directory in the project tree. Use this for lazy-loading tree navigation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `parentId` | `string` | Yes | The unique identifier of the parent tree node |

## Returns

`Promise<TreeItem[]>` — A promise that resolves to an array of child tree items

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getTreeChildren('parentId');
console.log(result);
```
