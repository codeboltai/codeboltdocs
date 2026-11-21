---
title: getAgent
---

# `getAgent`

```typescript
client.mail.getAgent(agentId: string): Promise<MailAgent>
```

Retrieves a specific mail agent by its unique identifier.

Returns the agent's registration details including name, capabilities, and
configuration metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent to retrieve |

## Returns

`Promise<MailAgent>` — A promise that resolves to the mail agent details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getAgent('agentId');
console.log(result);
```
