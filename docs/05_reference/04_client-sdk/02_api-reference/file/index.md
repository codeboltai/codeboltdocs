---
title: File API
---

# File API

File API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addFile`](./addFile) | Creates a new file in the workspace. |
| [`checkFileExists`](./checkFileExists) | Checks whether a file exists at the specified path. |
| [`deleteZip`](./deleteZip) | Deletes a previously created zip file. |
| [`zipFile`](./zipFile) | Creates a zip archive from specified files or directories. |

## Methods

---

### `addFile`

```typescript
client.file.addFile(data: AddFileRequest): Promise<unknown>
```

Creates a new file in the workspace.

Adds a file with the specified name and content. If the file already
exists, behavior depends on the server configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddFileRequest` | Yes | Request specifying the file path and content to create |

**Returns:** `Promise<unknown>` — A promise that resolves when the file has been created

[Full reference →](./addFile)

---

### `checkFileExists`

```typescript
client.file.checkFileExists(data: CheckFileExistsRequest): Promise<CheckFileExistsResponse>
```

Checks whether a file exists at the specified path.

Verifies file existence without reading its contents. Useful for
conditional logic that depends on whether a file is already present.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckFileExistsRequest` | Yes | Request specifying the file path to check |

**Returns:** `Promise<CheckFileExistsResponse>` — A promise that resolves to a  indicating existence

[Full reference →](./checkFileExists)

---

### `deleteZip`

```typescript
client.file.deleteZip(data: DeleteZipRequest): Promise<unknown>
```

Deletes a previously created zip file.

Removes a zip archive from the workspace filesystem. Use this to
clean up temporary archives after they have been downloaded or processed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `DeleteZipRequest` | Yes | Request specifying the zip file path to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the zip file has been deleted

[Full reference →](./deleteZip)

---

### `zipFile`

```typescript
client.file.zipFile(data: ZipFileRequest): Promise<unknown>
```

Creates a zip archive from specified files or directories.

Compresses the specified sources into a zip file at the given output
path. Useful for bundling project files for download or deployment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ZipFileRequest` | Yes | Request specifying source paths and the output zip file location |

**Returns:** `Promise<unknown>` — A promise that resolves when the zip file has been created

[Full reference →](./zipFile)

