---
title: create
---

# `create`

```typescript
client.threads.create(data: CreateThreadRequest): Promise<Thread>
```

Creates a new thread with the specified configuration.

Initializes a new thread with the provided settings and parameters.
The thread will be created in an initial state and can be executed
when ready. Use this to set up new execution units.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateThreadRequest` | Yes | The thread creation request with configuration details |

## Returns

`Promise<Thread>` — A promise that resolves to the newly created Thread object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.create(/* CreateThreadRequest */);
console.log(result);
```
