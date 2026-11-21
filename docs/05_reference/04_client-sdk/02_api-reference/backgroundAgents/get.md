---
title: get
---

# `get`

```typescript
client.backgroundAgents.get(instanceId: string): Promise<BackgroundAgentInstance>
```

Retrieves a specific background agent instance by ID.

Returns the full details of a single background agent including
its configuration, status, and runtime metrics.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the background agent instance |

## Returns

`Promise<BackgroundAgentInstance>` — A promise that resolves to the BackgroundAgentInstance object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.backgroundAgents.get('instanceId');
console.log(result);
```
