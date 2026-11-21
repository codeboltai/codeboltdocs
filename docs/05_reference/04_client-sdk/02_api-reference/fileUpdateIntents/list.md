---
title: list
---

# `list`

```typescript
client.fileUpdateIntents.list(params?: Record<string, unknown>): Promise<FileUpdateIntent[]>
```

Lists all file update intents in the system.

Returns every intent regardless of status or owning agent. Use this
for comprehensive intent monitoring or debugging coordination issues.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering intents |

## Returns

`Promise<FileUpdateIntent[]>` — A promise that resolves to an array of FileUpdateIntent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.list();
console.log(result);
```
