---
title: createThread
---

# `createThread`

```typescript
client.mail.createThread(data: CreateMailThreadRequest): Promise<MailThread>
```

Creates a new mail thread for agent-to-agent communication.

Initiates a new conversation thread that messages can be posted to. Threads provide
a structured way to organize multi-message exchanges between agents on a specific topic.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMailThreadRequest` | Yes | The thread creation payload |

## Returns

`Promise<MailThread>` — A promise that resolves to the newly created mail thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.createThread(/* CreateMailThreadRequest */);
console.log(result);
```
