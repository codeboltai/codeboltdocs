---
title: getProcessors
---

# `getProcessors`

```typescript
client.memoryIngestion.getProcessors(): Promise<IngestionProcessor[]>
```

Retrieves all available processor types that can be used in pipelines.

Returns the catalog of processors (text splitters, embedders, classifiers, etc.)
that can be chained together in ingestion pipelines.

## Parameters

_No parameters._

## Returns

`Promise<IngestionProcessor[]>` — A promise that resolves to an array of available processor definitions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.getProcessors();
console.log(result);
```
