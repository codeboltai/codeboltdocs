---
title: getThreads
---

# `getThreads`

```typescript
client.mail.getThreads(params?: MailThreadListParams): Promise<MailThread[]>
```

Lists all mail threads with optional filtering and pagination.

Returns conversation threads that group related messages together. Threads can be
filtered by participants, status, or other criteria using the params argument.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `MailThreadListParams` | No | Optional query parameters for filtering and pagination |

## Returns

`Promise<MailThread[]>` — A promise that resolves to an array of mail threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getThreads();
console.log(result);
```
