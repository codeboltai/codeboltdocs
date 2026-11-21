---
title: cleanup
---

# `cleanup`

```typescript
client.agentDebugApi.cleanup(params?: CleanupAgentDebugParams): Promise<unknown>
```

Cleans up old agent debug data.

Removes debug records that are older than the specified threshold.
Use this to free up storage and keep the debug system performant.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CleanupAgentDebugParams` | No | Query parameters controlling the cleanup |

## Returns

`Promise<unknown>` — A promise that resolves when cleanup is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.cleanup();
console.log(result);
```
