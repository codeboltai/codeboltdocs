---
title: openFolder
---

# `openFolder`

```typescript
client.system.openFolder(data: OpenFolderRequest): Promise<OpenFolderResponse>
```

Opens a folder in the system's native file manager.

Launches the default file explorer or Finder window for the specified
folder path. This provides convenient access to project directories
and workspace locations directly from the application.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `OpenFolderRequest` | Yes | Request containing folder information |

## Returns

`Promise<OpenFolderResponse>` — A promise that resolves when the folder has been opened

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.system.openFolder(/* OpenFolderRequest */);
console.log(result);
```
