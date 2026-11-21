---
title: getExecutions
---

# `getExecutions`

```typescript
client.actionBlocks.getExecutions(params?: Record<string, unknown>): Promise<ActionBlockExecution[]>
```

Retrieves execution records for action blocks.

Returns a list of past and current executions, useful for monitoring
which action blocks have run and their outcomes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<ActionBlockExecution[]>` — A promise that resolves to an array of ActionBlockExecution records

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionBlocks.getExecutions();
console.log(result);
```
