---
title: getBlockedFiles
---

# `getBlockedFiles`

```typescript
client.fileUpdateIntents.getBlockedFiles(params?: Record<string, unknown>): Promise<BlockedFile[]>
```

Retrieves a list of currently blocked files.

Returns files that have active update intents, meaning they are
locked or being modified by other agents. Use this to identify
unavailable files before attempting modifications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering blocked files |

## Returns

`Promise<BlockedFile[]>` — A promise that resolves to an array of BlockedFile objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.getBlockedFiles();
console.log(result);
```
