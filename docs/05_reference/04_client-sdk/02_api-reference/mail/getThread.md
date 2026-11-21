---
title: getThread
---

# `getThread`

```typescript
client.mail.getThread(threadId: string): Promise<MailThread>
```

Retrieves a specific mail thread by its unique identifier.

Returns the full thread metadata including subject, participants, timestamps, and status.
Use  to fetch the actual messages within the thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

## Returns

`Promise<MailThread>` — A promise that resolves to the mail thread details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getThread('threadId');
console.log(result);
```
