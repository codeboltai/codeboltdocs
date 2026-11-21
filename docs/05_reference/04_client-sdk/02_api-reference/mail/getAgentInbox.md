---
title: getAgentInbox
---

# `getAgentInbox`

```typescript
client.mail.getAgentInbox(agentId: string): Promise<MailMessage[]>
```

Retrieves the inbox messages for a specific agent.

Returns all unread and pending messages directed to the specified agent. This is the
primary way an agent checks for new incoming communications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent whose inbox to fetch |

## Returns

`Promise<MailMessage[]>` — A promise that resolves to an array of inbox messages

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getAgentInbox('agentId');
console.log(result);
```
