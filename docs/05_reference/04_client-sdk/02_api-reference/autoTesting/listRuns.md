---
title: listRuns
---

# `listRuns`

```typescript
client.autoTesting.listRuns(params?: Record<string, unknown>): Promise<TestRun[]>
```

Retrieves all test runs.

Returns the history of test run executions, including their status,
results, and timing information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<TestRun[]>` — A promise that resolves to an array of TestRun objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.listRuns();
console.log(result);
```
