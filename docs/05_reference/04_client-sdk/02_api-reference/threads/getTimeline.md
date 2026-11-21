---
title: getTimeline
---

# `getTimeline`

```typescript
client.threads.getTimeline(threadId: string): Promise<ThreadTimelineEvent[]>
```

Retrieves the timeline of events for a specific thread.

Returns a chronological list of all events associated with the thread,
including status changes, executions, and other significant occurrences.
Use this to track thread activity and audit execution history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<ThreadTimelineEvent[]>` — A promise that resolves to an array of ThreadTimelineEvent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getTimeline('threadId');
console.log(result);
```
