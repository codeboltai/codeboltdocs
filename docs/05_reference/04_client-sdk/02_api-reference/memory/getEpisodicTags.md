---
title: getEpisodicTags
---

# `getEpisodicTags`

```typescript
client.memory.getEpisodicTags(id: string): Promise<string[]>
```

Retrieves the distinct tags applied to events in an episodic memory.

Returns the unique set of tag strings used across all events in the memory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

## Returns

`Promise<string[]>` — A promise that resolves to an array of tag strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getEpisodicTags('id');
console.log(result);
```
