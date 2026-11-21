---
title: create
---

# `create`

```typescript
client.fileUpdateIntents.create(data: CreateFileUpdateIntentRequest): Promise<FileUpdateIntent>
```

Creates a new file update intent.

Registers an intent to modify specified files on behalf of an agent.
The intent coordinates access to prevent conflicts with other
concurrent modifications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateFileUpdateIntentRequest` | Yes | Request containing intent creation details |

## Returns

`Promise<FileUpdateIntent>` — A promise that resolves to the created FileUpdateIntent object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.create(/* CreateFileUpdateIntentRequest */);
console.log(result);
```
