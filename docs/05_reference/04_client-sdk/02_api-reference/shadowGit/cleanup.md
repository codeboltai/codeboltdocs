---
title: cleanup
---

# `cleanup`

```typescript
client.shadowGit.cleanup(data?: ShadowGitCleanupRequest): Promise<unknown>
```

Clean up shadow git data

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitCleanupRequest` | No |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.cleanup();
console.log(result);
```
