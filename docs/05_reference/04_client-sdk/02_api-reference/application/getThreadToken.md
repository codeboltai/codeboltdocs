---
title: getThreadToken
---

# `getThreadToken`

```typescript
client.application.getThreadToken(): Promise<ThreadToken>
```

Retrieves the current thread token.

Returns the authentication token associated with the current thread,
used for securing inter-process communication.

## Parameters

_No parameters._

## Returns

`Promise<ThreadToken>` — A promise that resolves to the ThreadToken object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getThreadToken();
console.log(result);
```
