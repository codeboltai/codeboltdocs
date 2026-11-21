---
title: getAgents
---

# `getAgents`

```typescript
client.mail.getAgents(): Promise<MailAgent[]>
```

Lists all registered mail agents in the system.

Returns the complete list of agents that are registered to send and receive mail.
Each agent has a unique identity and inbox for receiving messages.

## Parameters

_No parameters._

## Returns

`Promise<MailAgent[]>` — A promise that resolves to an array of mail agent registrations

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getAgents();
console.log(result);
```
