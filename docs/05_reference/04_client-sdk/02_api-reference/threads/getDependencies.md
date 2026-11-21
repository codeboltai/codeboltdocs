---
title: getDependencies
---

# `getDependencies`

```typescript
client.threads.getDependencies(threadId: string): Promise<Thread[]>
```

Retrieves all threads that the specified thread depends on.

Returns threads that are prerequisites or dependencies of the given thread.
This is useful for understanding execution order requirements and managing
complex thread relationships.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<Thread[]>` — A promise that resolves to an array of dependent Thread objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getDependencies('threadId');
console.log(result);
```
