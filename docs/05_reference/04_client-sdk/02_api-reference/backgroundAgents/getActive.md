---
title: getActive
---

# `getActive`

```typescript
client.backgroundAgents.getActive(params?: Record<string, unknown>): Promise<BackgroundAgentInstance[]>
```

Retrieves currently active background agents.

Returns only the background agents that are currently running,
excluding terminated or stopped instances.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

## Returns

`Promise<BackgroundAgentInstance[]>` — A promise that resolves to an array of active BackgroundAgentInstance objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.backgroundAgents.getActive();
console.log(result);
```
