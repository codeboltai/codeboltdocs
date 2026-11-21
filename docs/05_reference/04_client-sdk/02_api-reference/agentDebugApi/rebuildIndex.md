---
title: rebuildIndex
---

# `rebuildIndex`

```typescript
client.agentDebugApi.rebuildIndex(data?: RebuildAgentDebugIndexRequest): Promise<unknown>
```

Rebuilds the agent debug index.

Forces a full re-index of all agent debug data. This can resolve
issues with missing or inconsistent search results in the debug interface.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RebuildAgentDebugIndexRequest` | No | Optional configuration for the rebuild operation |

## Returns

`Promise<unknown>` — A promise that resolves when the index rebuild is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.rebuildIndex();
console.log(result);
```
