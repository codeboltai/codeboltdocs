---
title: clearThreadsMemory
---

# `clearThreadsMemory`

```typescript
client.chat.clearThreadsMemory(): Promise<void>
```

Clears all threads from memory.

Removes all thread data from the in-memory cache, typically used
when switching projects to ensure a clean state.

## Parameters

_No parameters._

## Returns

`Promise<void>` — A promise that resolves when the memory has been cleared

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.clearThreadsMemory();
console.log(result);
```
