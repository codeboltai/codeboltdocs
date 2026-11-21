---
title: getCheckpoints
---

# `getCheckpoints`

```typescript
client.shadowGit.getCheckpoints(params?: Record<string, unknown>): Promise<ShadowGitCheckpoint[]>
```

List all shadow git checkpoints

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No |  |

## Returns

`Promise<ShadowGitCheckpoint[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.getCheckpoints();
console.log(result);
```
