---
title: unpinAgent
---

# `unpinAgent`

```typescript
client.application.unpinAgent(data?: UnpinAgentRequest): Promise<void>
```

Unpins the currently pinned agent.

Removes the pinned agent from the UI, reverting to the default
agent selection behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UnpinAgentRequest` | No | Optional unpin configuration |

## Returns

`Promise<void>` — A promise that resolves when the agent has been unpinned

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.unpinAgent();
console.log(result);
```
