---
title: Users API
---

# Users API

Users API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`checkIfUserExistsLocally`](./checkIfUserExistsLocally) | Checks if a user exists locally in the system. |
| [`createUser`](./createUser) | Creates a new user account in the system. |
| [`getMessages`](./getMessages) | Retrieves saved messages from conversation history. |
| [`logout`](./logout) | Logs out the current authenticated user. |
| [`saveMessages`](./saveMessages) | Saves message history for a specific agent. |

## Methods

---

### `checkIfUserExistsLocally`

```typescript
client.users.checkIfUserExistsLocally(data: CheckUserExistsRequest): Promise<object>
```

Checks if a user exists locally in the system.

Verifies whether a user with the specified credentials or identifier
is already present in the local user store. Useful for preventing
duplicate registrations during setup.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckUserExistsRequest` | Yes | Request containing user identification information |

**Returns:** `Promise<object>` — A promise that resolves to an object with an 'exists' boolean flag

[Full reference →](./checkIfUserExistsLocally)

---

### `createUser`

```typescript
client.users.createUser(data: CreateUserRequest): Promise<User>
```

Creates a new user account in the system.

Registers a new local user with the provided credentials and profile
information. The user will be available for authentication immediately
after creation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateUserRequest` | Yes | Request containing user creation details |

**Returns:** `Promise<User>` — A promise that resolves to the created User object

[Full reference →](./createUser)

---

### `getMessages`

```typescript
client.users.getMessages(params?: GetMessagesParams): Promise<unknown[]>
```

Retrieves saved messages from conversation history.

Returns previously saved message history, optionally filtered by agent
or other criteria. Useful for restoring conversation context or
displaying chat history in the UI.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetMessagesParams` | No | Optional query parameters for filtering messages |

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of message objects

[Full reference →](./getMessages)

---

### `logout`

```typescript
client.users.logout(data?: LogoutRequest): Promise<void>
```

Logs out the current authenticated user.

Ends the current user session and invalidates authentication tokens.
Optionally accepts logout request data for additional session handling.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LogoutRequest` | No | Optional logout request parameters |

**Returns:** `Promise<void>` — A promise that resolves when logout is complete

[Full reference →](./logout)

---

### `saveMessages`

```typescript
client.users.saveMessages(agentId: string, data: SaveMessagesRequest): Promise<void>
```

Saves message history for a specific agent.

Persists a batch of messages associated with an agent's conversation.
This maintains conversation history across sessions and enables
context retention for continued interactions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `SaveMessagesRequest` | Yes | Request containing messages to save |

**Returns:** `Promise<void>` — A promise that resolves when messages have been saved

[Full reference →](./saveMessages)

