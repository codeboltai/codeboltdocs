---
title: getActiveThreadStep
---

# `getActiveThreadStep`

```typescript
client.chat.getActiveThreadStep(threadId: string): Promise<ChatThreadStep | null>
```

Retrieves the currently active step for a thread.

Returns the step that is currently in progress, or null if no
step is active.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<ChatThreadStep | null>` — A promise that resolves to the active ChatThreadStep or null

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getActiveThreadStep('threadId');
console.log(result);
```
