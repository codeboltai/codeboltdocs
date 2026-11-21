---
title: getEpisodicEventTypes
---

# `getEpisodicEventTypes`

```typescript
client.memory.getEpisodicEventTypes(id: string): Promise<string[]>
```

Retrieves the distinct event types used in an episodic memory.

Returns the unique set of event type strings present in the memory, useful for
building filter UIs or understanding the kinds of events that were recorded.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

## Returns

`Promise<string[]>` — A promise that resolves to an array of event type strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getEpisodicEventTypes('id');
console.log(result);
```
