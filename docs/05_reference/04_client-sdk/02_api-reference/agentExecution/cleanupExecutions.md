---
title: cleanupExecutions
---

# `cleanupExecutions`

```typescript
client.agentExecution.cleanupExecutions(params?: CleanupExecutionsParams): Promise<unknown>
```

Cleans up old execution records.

Removes execution records older than the specified threshold to free
up storage and keep the system performant.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CleanupExecutionsParams` | No | Query parameters controlling the cleanup |

## Returns

`Promise<unknown>` — A promise that resolves when cleanup is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.cleanupExecutions();
console.log(result);
```
