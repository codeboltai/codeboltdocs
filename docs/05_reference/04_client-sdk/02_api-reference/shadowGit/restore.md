---
title: restore
---

# `restore`

```typescript
client.shadowGit.restore(data: ShadowGitRestoreRequest): Promise<unknown>
```

Restore to a previous shadow git checkpoint

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitRestoreRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.restore(/* ShadowGitRestoreRequest */);
console.log(result);
```
