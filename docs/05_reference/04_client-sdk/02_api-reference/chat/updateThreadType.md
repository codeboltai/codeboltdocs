---
title: updateThreadType
---

# `updateThreadType`

```typescript
client.chat.updateThreadType(data: UpdateThreadTypeRequest): Promise<void>
```

Updates the type of a chat thread.

Changes the thread's type classification, which can affect routing,
display, and agent behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThreadTypeRequest` | Yes | The type update payload |

## Returns

`Promise<void>` — A promise that resolves when the type has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.updateThreadType(/* UpdateThreadTypeRequest */);
console.log(result);
```
