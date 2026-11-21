---
title: updateThreadName
---

# `updateThreadName`

```typescript
client.chat.updateThreadName(data: UpdateThreadNameRequest): Promise<void>
```

Updates the display name of a chat thread.

Changes the human-readable name shown in the thread list.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThreadNameRequest` | Yes | The name update payload |

## Returns

`Promise<void>` — A promise that resolves when the name has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.updateThreadName(/* UpdateThreadNameRequest */);
console.log(result);
```
