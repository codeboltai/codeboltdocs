---
title: saveMessages
---

# `saveMessages`

```typescript
client.users.saveMessages(agentId: string, data: SaveMessagesRequest): Promise<void>
```

Saves message history for a specific agent.

Persists a batch of messages associated with an agent's conversation.
This maintains conversation history across sessions and enables
context retention for continued interactions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `SaveMessagesRequest` | Yes | Request containing messages to save |

## Returns

`Promise<void>` — A promise that resolves when messages have been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.users.saveMessages('agentId', /* SaveMessagesRequest */);
console.log(result);
```
