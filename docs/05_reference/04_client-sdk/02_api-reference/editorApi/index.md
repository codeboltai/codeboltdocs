---
title: EditorApi API
---

# EditorApi API

Editor API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getEditorConfig`](./getEditorConfig) | Retrieves the current editor configuration. |
| [`getTree`](./getTree) | Retrieves the hierarchical file tree for a workspace project. |

## Methods

---

### `getEditorConfig`

```typescript
client.editorApi.getEditorConfig(): Promise<EditorConfig>
```

Retrieves the current editor configuration.

Returns settings that control editor behavior such as theme, font size,
tab width, and other preferences. Useful for synchronizing editor state
across components or persisting user preferences.

_No parameters._

**Returns:** `Promise<EditorConfig>` — A promise that resolves to the current

[Full reference →](./getEditorConfig)

---

### `getTree`

```typescript
client.editorApi.getTree(workspaceId: string, projectName: string): Promise<EditorTreeNode>
```

Retrieves the hierarchical file tree for a workspace project.

Returns a nested tree structure representing all files and directories
within the specified project. Useful for rendering file explorers or
programmatically traversing project contents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace containing the project |
| `projectName` | `string` | Yes | The name of the project whose file tree to retrieve |

**Returns:** `Promise<EditorTreeNode>` — A promise that resolves to the root  with nested children

[Full reference →](./getTree)

