---
title: ensureFolder
---

# `ensureFolder`

```typescript
client.specs.ensureFolder(data?: EnsureSpecFolderRequest): Promise<unknown>
```

Ensures the specs folder exists in the workspace.

Creates the specification directory if it doesn't already exist,
establishing a location for storing spec files and related documentation.
This operation is idempotent and safe to call multiple times.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EnsureSpecFolderRequest` | No | Optional parameters for folder creation |

## Returns

`Promise<unknown>` — A promise that resolves when the folder is ensured

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.specs.ensureFolder();
console.log(result);
```
