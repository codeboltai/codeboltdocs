---
title: createUser
---

# `createUser`

```typescript
client.users.createUser(data: CreateUserRequest): Promise<User>
```

Creates a new user account in the system.

Registers a new local user with the provided credentials and profile
information. The user will be available for authentication immediately
after creation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateUserRequest` | Yes | Request containing user creation details |

## Returns

`Promise<User>` — A promise that resolves to the created User object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.users.createUser(/* CreateUserRequest */);
console.log(result);
```
