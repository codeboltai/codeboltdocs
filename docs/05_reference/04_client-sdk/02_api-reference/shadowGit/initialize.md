---
title: initialize
---

# `initialize`

```typescript
client.shadowGit.initialize(data?: ShadowGitInitializeRequest): Promise<unknown>
```

Initialize shadow git tracking

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ShadowGitInitializeRequest` | No |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.shadowGit.initialize();
console.log(result);
```
