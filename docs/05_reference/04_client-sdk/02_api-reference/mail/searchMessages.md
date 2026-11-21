---
title: searchMessages
---

# `searchMessages`

```typescript
client.mail.searchMessages(params?: MailSearchParams): Promise<MailMessage[]>
```

Searches messages across all threads using the provided query parameters.

Performs a full-text or filtered search across the mail system, returning messages
that match the specified criteria such as keywords, sender, date range, or thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `MailSearchParams` | No | Search query parameters for filtering results |

## Returns

`Promise<MailMessage[]>` — A promise that resolves to an array of matching messages

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.searchMessages();
console.log(result);
```
