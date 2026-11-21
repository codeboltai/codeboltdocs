---
title: getStatus
---

# `getStatus`

```typescript
client.codebaseIndex.getStatus(): Promise<CodebaseIndexStatus>
```

Retrieves the current indexing status.

Returns information about whether indexing is in progress, when it
last completed, and how many files have been indexed.

## Parameters

_No parameters._

## Returns

`Promise<CodebaseIndexStatus>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codebaseIndex.getStatus();
console.log(result);
```
