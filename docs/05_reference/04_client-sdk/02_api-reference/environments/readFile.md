---
title: readFile
---

# `readFile`

```typescript
client.environments.readFile(id: string, data: ReadEnvironmentFileRequest): Promise<unknown>
```

Reads a file from within an environment.

Retrieves the contents of a specific file from the environment's
filesystem. Useful for inspecting files without SSH access.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `ReadEnvironmentFileRequest` | Yes | The file read request specifying the file path |

## Returns

`Promise<unknown>` — A promise that resolves to the file contents

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.readFile('id', /* ReadEnvironmentFileRequest */);
console.log(result);
```
