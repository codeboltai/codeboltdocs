---
title: Mail API
---

# Mail API

Mail API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`acknowledgeMessage`](./acknowledgeMessage) | Acknowledges receipt and processing of a message. |
| [`checkReservationConflicts`](./checkReservationConflicts) | Checks whether a proposed reservation would conflict with existing ones. |
| [`createAgent`](./createAgent) | Registers a new agent in the mail system. |
| [`createReservation`](./createReservation) | Creates a resource reservation for an agent. |
| [`createThread`](./createThread) | Creates a new mail thread for agent-to-agent communication. |
| [`createThreadMessage`](./createThreadMessage) | Adds a new message to an existing mail thread. |
| [`deleteThread`](./deleteThread) | Permanently deletes a mail thread and all its messages. |
| [`forceReservation`](./forceReservation) | Force-releases a reservation, overriding the owning agent's hold. |
| [`getAgent`](./getAgent) | Retrieves a specific mail agent by its unique identifier. |
| [`getAgentInbox`](./getAgentInbox) | Retrieves the inbox messages for a specific agent. |
| [`getAgents`](./getAgents) | Lists all registered mail agents in the system. |
| [`getReservations`](./getReservations) | Lists all currently active resource reservations. |
| [`getThread`](./getThread) | Retrieves a specific mail thread by its unique identifier. |
| [`getThreadMessages`](./getThreadMessages) | Retrieves all messages within a specific mail thread. |
| [`getThreads`](./getThreads) | Lists all mail threads with optional filtering and pagination. |
| [`markMessageRead`](./markMessageRead) | Marks a specific message as read by the current agent. |
| [`releaseReservation`](./releaseReservation) | Releases a previously held resource reservation. |
| [`replyToMessage`](./replyToMessage) | Sends a reply to an existing message. |
| [`searchMessages`](./searchMessages) | Searches messages across all threads using the provided query parameters. |
| [`send`](./send) | Sends a new standalone mail message. |
| [`summarizeThread`](./summarizeThread) | Generates a summarized view of a mail thread's conversation. |
| [`updateThread`](./updateThread) | Partially updates a mail thread's metadata. |

## Methods

---

### `acknowledgeMessage`

```typescript
client.mail.acknowledgeMessage(messageId: string): Promise<void>
```

Acknowledges receipt and processing of a message.

Signals that the receiving agent has processed the message content and taken
any required action. This is distinct from marking as read and indicates explicit
acknowledgment of the message's intent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to acknowledge |

**Returns:** `Promise<void>` — A promise that resolves when the acknowledgment has been recorded

[Full reference →](./acknowledgeMessage)

---

### `checkReservationConflicts`

```typescript
client.mail.checkReservationConflicts(data: CheckReservationConflictsRequest): Promise<object>
```

Checks whether a proposed reservation would conflict with existing ones.

Validates that a resource is available before attempting to reserve it. Use this to
implement optimistic locking patterns where agents check availability before acting.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckReservationConflictsRequest` | Yes | The conflict check payload |

**Returns:** `Promise<object>` — A promise that resolves to an object indicating whether a conflict exists

[Full reference →](./checkReservationConflicts)

---

### `createAgent`

```typescript
client.mail.createAgent(data: CreateMailAgentRequest): Promise<MailAgent>
```

Registers a new agent in the mail system.

Creates a mail identity for an agent, enabling it to send messages, receive mail in
its inbox, and participate in threaded conversations with other agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMailAgentRequest` | Yes | The agent registration payload |

**Returns:** `Promise<MailAgent>` — A promise that resolves to the newly registered mail agent

[Full reference →](./createAgent)

---

### `createReservation`

```typescript
client.mail.createReservation(data: CreateReservationRequest): Promise<MailReservation>
```

Creates a resource reservation for an agent.

Reserves exclusive access to a shared resource (e.g., a file, tool, or service) for
the requesting agent. Other agents can check for conflicts before attempting to access
the same resource.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateReservationRequest` | Yes | The reservation request payload |

**Returns:** `Promise<MailReservation>` — A promise that resolves to the created reservation

[Full reference →](./createReservation)

---

### `createThread`

```typescript
client.mail.createThread(data: CreateMailThreadRequest): Promise<MailThread>
```

Creates a new mail thread for agent-to-agent communication.

Initiates a new conversation thread that messages can be posted to. Threads provide
a structured way to organize multi-message exchanges between agents on a specific topic.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMailThreadRequest` | Yes | The thread creation payload |

**Returns:** `Promise<MailThread>` — A promise that resolves to the newly created mail thread

[Full reference →](./createThread)

---

### `createThreadMessage`

```typescript
client.mail.createThreadMessage(threadId: string, data: SendMailMessageRequest): Promise<MailMessage>
```

Adds a new message to an existing mail thread.

Posts a message to the specified thread, making it visible to all thread participants.
This is the primary way agents communicate within an established conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to post to |
| `data` | `SendMailMessageRequest` | Yes | The message payload including body and optional metadata |

**Returns:** `Promise<MailMessage>` — A promise that resolves to the newly created message

[Full reference →](./createThreadMessage)

---

### `deleteThread`

```typescript
client.mail.deleteThread(threadId: string): Promise<void>
```

Permanently deletes a mail thread and all its messages.

Removes the thread and its entire message history. This action cannot be undone.
Consider archiving threads instead if you may need to reference them later.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to delete |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been deleted

[Full reference →](./deleteThread)

---

### `forceReservation`

```typescript
client.mail.forceReservation(data: ForceReservationRequest): Promise<void>
```

Force-releases a reservation, overriding the owning agent's hold.

Forcefully frees a resource reservation regardless of the current owner. Use this as
an administrative override when an agent has become unresponsive or the reservation
is stale.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ForceReservationRequest` | Yes | The force-release payload |

**Returns:** `Promise<void>` — A promise that resolves when the reservation has been forcefully released

[Full reference →](./forceReservation)

---

### `getAgent`

```typescript
client.mail.getAgent(agentId: string): Promise<MailAgent>
```

Retrieves a specific mail agent by its unique identifier.

Returns the agent's registration details including name, capabilities, and
configuration metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent to retrieve |

**Returns:** `Promise<MailAgent>` — A promise that resolves to the mail agent details

[Full reference →](./getAgent)

---

### `getAgentInbox`

```typescript
client.mail.getAgentInbox(agentId: string): Promise<MailMessage[]>
```

Retrieves the inbox messages for a specific agent.

Returns all unread and pending messages directed to the specified agent. This is the
primary way an agent checks for new incoming communications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent whose inbox to fetch |

**Returns:** `Promise<MailMessage[]>` — A promise that resolves to an array of inbox messages

[Full reference →](./getAgentInbox)

---

### `getAgents`

```typescript
client.mail.getAgents(): Promise<MailAgent[]>
```

Lists all registered mail agents in the system.

Returns the complete list of agents that are registered to send and receive mail.
Each agent has a unique identity and inbox for receiving messages.

_No parameters._

**Returns:** `Promise<MailAgent[]>` — A promise that resolves to an array of mail agent registrations

[Full reference →](./getAgents)

---

### `getReservations`

```typescript
client.mail.getReservations(params?: Record<string, unknown>): Promise<MailReservation[]>
```

Lists all currently active resource reservations.

Returns all reservations that have not been released, providing visibility into which
resources are currently claimed by which agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering reservations |

**Returns:** `Promise<MailReservation[]>` — A promise that resolves to an array of active reservations

[Full reference →](./getReservations)

---

### `getThread`

```typescript
client.mail.getThread(threadId: string): Promise<MailThread>
```

Retrieves a specific mail thread by its unique identifier.

Returns the full thread metadata including subject, participants, timestamps, and status.
Use  to fetch the actual messages within the thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

**Returns:** `Promise<MailThread>` — A promise that resolves to the mail thread details

[Full reference →](./getThread)

---

### `getThreadMessages`

```typescript
client.mail.getThreadMessages(threadId: string): Promise<MailMessage[]>
```

Retrieves all messages within a specific mail thread.

Returns the complete ordered list of messages in a thread, useful for displaying
the full conversation history between agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread whose messages to fetch |

**Returns:** `Promise<MailMessage[]>` — A promise that resolves to an array of messages in chronological order

[Full reference →](./getThreadMessages)

---

### `getThreads`

```typescript
client.mail.getThreads(params?: MailThreadListParams): Promise<MailThread[]>
```

Lists all mail threads with optional filtering and pagination.

Returns conversation threads that group related messages together. Threads can be
filtered by participants, status, or other criteria using the params argument.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `MailThreadListParams` | No | Optional query parameters for filtering and pagination |

**Returns:** `Promise<MailThread[]>` — A promise that resolves to an array of mail threads

[Full reference →](./getThreads)

---

### `markMessageRead`

```typescript
client.mail.markMessageRead(messageId: string): Promise<void>
```

Marks a specific message as read by the current agent.

Updates the read status of a message, which can be used to track which messages
have been processed by each agent in a conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to mark as read |

**Returns:** `Promise<void>` — A promise that resolves when the read status has been updated

[Full reference →](./markMessageRead)

---

### `releaseReservation`

```typescript
client.mail.releaseReservation(data: ReleaseReservationRequest): Promise<void>
```

Releases a previously held resource reservation.

Frees the reserved resource so other agents can access it. Agents should release
reservations promptly when they no longer need exclusive access.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ReleaseReservationRequest` | Yes | The release payload identifying the reservation to free |

**Returns:** `Promise<void>` — A promise that resolves when the reservation has been released

[Full reference →](./releaseReservation)

---

### `replyToMessage`

```typescript
client.mail.replyToMessage(data: ReplyToMessageRequest): Promise<MailMessage>
```

Sends a reply to an existing message.

Creates a response that is linked to a specific parent message, maintaining the
conversation thread structure. The reply is posted to the same thread as the
original message.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ReplyToMessageRequest` | Yes | The reply payload including the parent message reference and body |

**Returns:** `Promise<MailMessage>` — A promise that resolves to the newly created reply message

[Full reference →](./replyToMessage)

---

### `searchMessages`

```typescript
client.mail.searchMessages(params?: MailSearchParams): Promise<MailMessage[]>
```

Searches messages across all threads using the provided query parameters.

Performs a full-text or filtered search across the mail system, returning messages
that match the specified criteria such as keywords, sender, date range, or thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `MailSearchParams` | No | Search query parameters for filtering results |

**Returns:** `Promise<MailMessage[]>` — A promise that resolves to an array of matching messages

[Full reference →](./searchMessages)

---

### `send`

```typescript
client.mail.send(data: SendMailMessageRequest): Promise<MailMessage>
```

Sends a new standalone mail message.

Delivers a message directly without requiring an existing thread. This is useful for
one-off notifications or messages that do not belong to an ongoing conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SendMailMessageRequest` | Yes | The message payload |

**Returns:** `Promise<MailMessage>` — A promise that resolves to the sent message

[Full reference →](./send)

---

### `summarizeThread`

```typescript
client.mail.summarizeThread(threadId: string): Promise<MailThreadSummary>
```

Generates a summarized view of a mail thread's conversation.

Produces a concise summary of the thread's messages, useful for quickly understanding
the key points of a long conversation without reading every message.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to summarize |

**Returns:** `Promise<MailThreadSummary>` — A promise that resolves to the thread summary

[Full reference →](./summarizeThread)

---

### `updateThread`

```typescript
client.mail.updateThread(threadId: string, data: UpdateMailThreadRequest): Promise<MailThread>
```

Partially updates a mail thread's metadata.

Applies a partial update (PATCH) to the thread, allowing you to modify specific fields
such as the subject, status, or participants without affecting other properties.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateMailThreadRequest` | Yes | The fields to patch on the thread |

**Returns:** `Promise<MailThread>` — A promise that resolves to the updated mail thread

[Full reference →](./updateThread)

