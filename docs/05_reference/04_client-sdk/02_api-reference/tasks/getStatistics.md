---
title: getStatistics
---

# `getStatistics`

```typescript
client.tasks.getStatistics(): Promise<TaskStatistics>
```

Retrieves overall task statistics across all projects.

Returns aggregated statistics including total task counts, status
distribution, and other metrics. Use this for dashboard displays or
high-level reporting on task activity across the entire platform.

## Parameters

_No parameters._

## Returns

`Promise<TaskStatistics>` — A promise that resolves to TaskStatistics containing overview metrics

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.getStatistics();
console.log(result);
```
