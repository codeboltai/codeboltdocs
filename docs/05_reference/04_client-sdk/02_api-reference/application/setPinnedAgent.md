---
title: setPinnedAgent
---

# `setPinnedAgent`

```typescript
client.application.setPinnedAgent(data: SetPinnedAgentRequest): Promise<void>
```

Sets the pinned agent for the application.

Pins a specific agent to the UI, making it the default or always-visible
agent for quick access.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetPinnedAgentRequest` | Yes | The pinning configuration |

## Returns

`Promise<void>` — A promise that resolves when the agent has been pinned

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.setPinnedAgent(/* SetPinnedAgentRequest */);
console.log(result);
```
