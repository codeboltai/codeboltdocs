---
title: getRunning
---

# `getRunning`

```typescript
client.agentDebugApi.getRunning(): Promise<AgentDebugInstance[]>
```

Retrieves all currently running agent instances.

A convenience method that returns only instances with an active/running status,
useful for real-time monitoring dashboards.

## Parameters

_No parameters._

## Returns

`Promise<AgentDebugInstance[]>` — A promise that resolves to an array of running AgentDebugInstance objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getRunning();
console.log(result);
```
