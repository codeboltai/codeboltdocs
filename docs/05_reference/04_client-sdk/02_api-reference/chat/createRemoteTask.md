---
title: createRemoteTask
---

# `createRemoteTask`

```typescript
client.chat.createRemoteTask(data: CreateRemoteTaskRequest): Promise<unknown>
```

Creates a new remote task.

Registers a task that will be executed by a remote agent or service,
tracking it within the chat context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRemoteTaskRequest` | Yes | The remote task creation payload |

## Returns

`Promise<unknown>` — A promise that resolves to the created task data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.createRemoteTask(/* CreateRemoteTaskRequest */);
console.log(result);
```
