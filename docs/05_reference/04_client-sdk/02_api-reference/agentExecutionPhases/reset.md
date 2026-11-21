---
title: reset
---

# `reset`

```typescript
client.agentExecutionPhases.reset(data?: ResetAgentExecutionPhasesRequest): Promise<unknown>
```

Resets all agent execution phases to their default configuration.

Restores the built-in phase definitions, removing any custom phases
and reverting modified ones to their original state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ResetAgentExecutionPhasesRequest` | No | Optional configuration for the reset operation |

## Returns

`Promise<unknown>` — A promise that resolves when the reset is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.reset();
console.log(result);
```
