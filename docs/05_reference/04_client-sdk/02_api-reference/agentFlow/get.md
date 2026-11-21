---
title: get
---

# `get`

```typescript
client.agentFlow.get(params?: Record<string, unknown>): Promise<AgentFlow>
```

Retrieves agent flow(s).

Returns one or more agent flows based on the provided query parameters.
Use this to look up flows by name, ID, or other criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters to identify which flow(s) to retrieve |

## Returns

`Promise<AgentFlow>` — A promise that resolves to the AgentFlow object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentFlow.get();
console.log(result);
```
