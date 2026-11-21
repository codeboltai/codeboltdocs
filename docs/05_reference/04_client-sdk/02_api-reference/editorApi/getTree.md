---
title: getTree
---

# `getTree`

```typescript
client.editorApi.getTree(workspaceId: string, projectName: string): Promise<EditorTreeNode>
```

Retrieves the hierarchical file tree for a workspace project.

Returns a nested tree structure representing all files and directories
within the specified project. Useful for rendering file explorers or
programmatically traversing project contents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace containing the project |
| `projectName` | `string` | Yes | The name of the project whose file tree to retrieve |

## Returns

`Promise<EditorTreeNode>` — A promise that resolves to the root  with nested children

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.editorApi.getTree('workspaceId', 'projectName');
console.log(result);
```
