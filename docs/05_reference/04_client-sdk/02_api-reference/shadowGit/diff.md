---
title: diff
---

# `diff`

```typescript
client.shadowGit.diff(data?: ShadowGitDiffRequest): Promise<unknown>
```

Get diff between shadow git checkpoints

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitDiffRequest` | No |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.diff();
console.log(result);
```
