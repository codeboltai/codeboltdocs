---
title: addFile
---

# `addFile`

```typescript
client.file.addFile(data: AddFileRequest): Promise<unknown>
```

Creates a new file in the workspace.

Adds a file with the specified name and content. If the file already
exists, behavior depends on the server configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddFileRequest` | Yes | Request specifying the file path and content to create |

## Returns

`Promise<unknown>` — A promise that resolves when the file has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.file.addFile(/* AddFileRequest */);
console.log(result);
```
