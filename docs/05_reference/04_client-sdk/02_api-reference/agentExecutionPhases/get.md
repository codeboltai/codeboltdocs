---
title: get
---

# `get`

```typescript
client.agentExecutionPhases.get(name: string): Promise<AgentExecutionPhase>
```

Retrieves a specific execution phase by its name.

Returns the full definition of a single phase including its
configuration, order, and associated behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the execution phase |

## Returns

`Promise<AgentExecutionPhase>` — A promise that resolves to the AgentExecutionPhase object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.get('name');
console.log(result);
```
