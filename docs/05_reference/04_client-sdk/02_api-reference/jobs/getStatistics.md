---
title: getStatistics
---

# `getStatistics`

```typescript
client.jobs.getStatistics(): Promise<JobStatistics>
```

Retrieves aggregate statistics about the job system.

Returns counts and metrics such as total jobs, jobs by status,
average completion time, and other summary data. Useful for
dashboards and progress reporting.

## Parameters

_No parameters._

## Returns

`Promise<JobStatistics>` — A promise that resolves to a  summary

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getStatistics();
console.log(result);
```
