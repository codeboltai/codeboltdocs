---
title: createAgent
---

# `createAgent`

```typescript
client.mail.createAgent(data: CreateMailAgentRequest): Promise<MailAgent>
```

Registers a new agent in the mail system.

Creates a mail identity for an agent, enabling it to send messages, receive mail in
its inbox, and participate in threaded conversations with other agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMailAgentRequest` | Yes | The agent registration payload |

## Returns

`Promise<MailAgent>` — A promise that resolves to the newly registered mail agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.createAgent(/* CreateMailAgentRequest */);
console.log(result);
```
