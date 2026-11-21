---
title: getFilesWithIntents
---

# `getFilesWithIntents`

```typescript
client.fileUpdateIntents.getFilesWithIntents(params?: Record<string, unknown>): Promise<string[]>
```

Retrieves files that have active update intents.

Returns a list of file paths that currently have one or more
registered update intents. This is useful for quickly identifying
which files are in the process of being modified.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

## Returns

`Promise<string[]>` — A promise that resolves to an array of file path strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.getFilesWithIntents();
console.log(result);
```
