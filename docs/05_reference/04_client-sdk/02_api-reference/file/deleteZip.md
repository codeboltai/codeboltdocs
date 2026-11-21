---
title: deleteZip
---

# `deleteZip`

```typescript
client.file.deleteZip(data: DeleteZipRequest): Promise<unknown>
```

Deletes a previously created zip file.

Removes a zip archive from the workspace filesystem. Use this to
clean up temporary archives after they have been downloaded or processed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `DeleteZipRequest` | Yes | Request specifying the zip file path to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the zip file has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.file.deleteZip(/* DeleteZipRequest */);
console.log(result);
```
