---
title: getByAgent
---

# `getByAgent`

```typescript
client.fileUpdateIntents.getByAgent(agentId: string, params?: Record<string, unknown>): Promise<FileUpdateIntent[]>
```

Retrieves file update intents for a specific agent.

Returns all intents registered by a particular agent, including
their status, associated files, and metadata. Useful for monitoring
an agent's active operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering intents |

## Returns

`Promise<FileUpdateIntent[]>` — A promise that resolves to an array of FileUpdateIntent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.getByAgent('agentId');
console.log(result);
```
