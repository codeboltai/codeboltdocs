---
title: checkChanges
---

# `checkChanges`

```typescript
client.codebaseIndex.checkChanges(): Promise<CodebaseChanges>
```

Checks for changes since the last indexing run.

Compares the current filesystem state against the last indexed state
to identify new, modified, or deleted files.

## Parameters

_No parameters._

## Returns

`Promise<CodebaseChanges>` — A promise that resolves to the detected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codebaseIndex.checkChanges();
console.log(result);
```
