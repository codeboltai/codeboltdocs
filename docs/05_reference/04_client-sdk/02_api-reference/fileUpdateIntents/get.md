---
title: get
---

# `get`

```typescript
client.fileUpdateIntents.get(id: string): Promise<FileUpdateIntent>
```

Retrieves a specific file update intent by its ID.

Returns detailed information about a single intent including its
current status, files, agent, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |

## Returns

`Promise<FileUpdateIntent>` — A promise that resolves to the FileUpdateIntent object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.get('id');
console.log(result);
```
