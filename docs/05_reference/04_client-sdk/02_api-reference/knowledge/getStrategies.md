---
title: getStrategies
---

# `getStrategies`

```typescript
client.knowledge.getStrategies(): Promise<KnowledgeStrategy[]>
```

Retrieves all available chunking strategies.

Returns the list of chunking algorithms that can be used when
processing documents (e.g., fixed-size, sentence-based, semantic).

## Parameters

_No parameters._

## Returns

`Promise<KnowledgeStrategy[]>` — A promise that resolves to an array of  descriptors

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.getStrategies();
console.log(result);
```
