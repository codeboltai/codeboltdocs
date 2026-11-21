---
title: get
---

# `get`

```typescript
client.planner.get(): Promise<PlannerOverview>
```

Retrieves the planner overview with aggregated status information.

Returns a high-level summary of the planner state including total tasks, completion
statistics, and agent utilization. Use this for dashboard views and progress monitoring.

## Parameters

_No parameters._

## Returns

`Promise<PlannerOverview>` — A promise that resolves to the planner overview data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.get();
console.log(result);
```
