---
title: start
---

# `start`

```typescript
client.backgroundAgents.start(data: StartBackgroundAgentRequest): Promise<BackgroundAgentInstance>
```

Starts a new background agent.

Launches a background agent that will run continuously until explicitly
stopped. Background agents are suitable for long-running monitoring,
indexing, or maintenance tasks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartBackgroundAgentRequest` | Yes | The background agent start configuration |

## Returns

`Promise<BackgroundAgentInstance>` — A promise that resolves to the started BackgroundAgentInstance

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.backgroundAgents.start(/* StartBackgroundAgentRequest */);
console.log(result);
```
