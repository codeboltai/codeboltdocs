---
title: list
---

# `list`

```typescript
client.localModels.list(): Promise<LocalModel[]>
```

Lists all models that have been downloaded to the local machine.

Returns metadata for models currently stored on disk, regardless of whether they are
currently loaded into memory for inference.

## Parameters

_No parameters._

## Returns

`Promise<LocalModel[]>` — A promise that resolves to an array of downloaded local models

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.list();
console.log(result);
```
