---
title: readFile
---

# `readFile`

```typescript
client.shadowGit.readFile(data: ShadowGitReadFileRequest): Promise<unknown>
```

Read a file from a shadow git checkpoint

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitReadFileRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.readFile(/* ShadowGitReadFileRequest */);
console.log(result);
```
