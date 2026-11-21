---
title: list
---

# `list`

```typescript
client.backgroundAgents.list(params?: Record<string, unknown>): Promise<BackgroundAgentInstance[]>
```

Retrieves all background agent instances.

Returns every background agent instance that has been created,
including both active and terminated ones.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<BackgroundAgentInstance[]>` — A promise that resolves to an array of BackgroundAgentInstance objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.backgroundAgents.list();
console.log(result);
```
