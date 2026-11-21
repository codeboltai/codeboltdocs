---
title: checkIfUserExistsLocally
---

# `checkIfUserExistsLocally`

```typescript
client.users.checkIfUserExistsLocally(data: CheckUserExistsRequest): Promise<object>
```

Checks if a user exists locally in the system.

Verifies whether a user with the specified credentials or identifier
is already present in the local user store. Useful for preventing
duplicate registrations during setup.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckUserExistsRequest` | Yes | Request containing user identification information |

## Returns

`Promise<object>` — A promise that resolves to an object with an 'exists' boolean flag

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.users.checkIfUserExistsLocally(/* CheckUserExistsRequest */);
console.log(result);
```
