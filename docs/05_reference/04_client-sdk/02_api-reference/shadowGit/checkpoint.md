---
title: checkpoint
---

# `checkpoint`

```typescript
client.shadowGit.checkpoint(data?: ShadowGitCheckpointRequest): Promise<ShadowGitCheckpoint>
```

Create a shadow git checkpoint

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitCheckpointRequest` | No |  |

## Returns

`Promise<ShadowGitCheckpoint>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.checkpoint();
console.log(result);
```
