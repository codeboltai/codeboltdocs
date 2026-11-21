---
title: logout
---

# `logout`

```typescript
client.users.logout(data?: LogoutRequest): Promise<void>
```

Logs out the current authenticated user.

Ends the current user session and invalidates authentication tokens.
Optionally accepts logout request data for additional session handling.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LogoutRequest` | No | Optional logout request parameters |

## Returns

`Promise<void>` — A promise that resolves when logout is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.users.logout();
console.log(result);
```
