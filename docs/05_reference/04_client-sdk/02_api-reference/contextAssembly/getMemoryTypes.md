---
title: getMemoryTypes
---

# `getMemoryTypes`

```typescript
client.contextAssembly.getMemoryTypes(): Promise<ContextMemoryType[]>
```

Retrieves available memory types for context assembly.

Returns the list of memory type sources that can be used when
assembling context (e.g., episodic, semantic, working memory).

## Parameters

_No parameters._

## Returns

`Promise<ContextMemoryType[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextAssembly.getMemoryTypes();
console.log(result);
```
