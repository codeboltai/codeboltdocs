---
title: getStatistics
---

# `getStatistics`

```typescript
client.threads.getStatistics(): Promise<ThreadStatistics>
```

Retrieves statistics about threads in the system.

Returns aggregated metrics including total thread counts, status distributions,
and other statistical data. Use this to gain insights into thread activity
and system performance.

## Parameters

_No parameters._

## Returns

`Promise<ThreadStatistics>` — A promise that resolves to ThreadStatistics containing various metrics

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getStatistics();
console.log(result);
```
