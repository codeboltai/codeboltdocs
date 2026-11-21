---
title: writeFile
---

# `writeFile`

```typescript
client.environments.writeFile(id: string, data: WriteEnvironmentFileRequest): Promise<unknown>
```

Writes a file to an environment's filesystem.

Creates or overwrites a file at the specified path within the
environment. Useful for deploying configuration or code changes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `WriteEnvironmentFileRequest` | Yes | The file write request specifying path and content |

## Returns

`Promise<unknown>` — A promise that resolves when the file has been written

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.writeFile('id', /* WriteEnvironmentFileRequest */);
console.log(result);
```
