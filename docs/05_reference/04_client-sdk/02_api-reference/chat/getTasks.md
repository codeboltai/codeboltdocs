---
title: getTasks
---

# `getTasks`

```typescript
client.chat.getTasks(): Promise<unknown[]>
```

Retrieves all chat tasks.

Returns the list of tasks that have been created through the
chat system.

## Parameters

_No parameters._

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of task objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getTasks();
console.log(result);
```
