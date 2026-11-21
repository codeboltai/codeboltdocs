---
title: autoUpdateName
---

# `autoUpdateName`

```typescript
client.threads.autoUpdateName(data: AutoUpdateNameRequest): Promise<void>
```

Automatically updates a thread's name based on its content.

Analyzes the thread's execution history, messages, and context to generate
an appropriate name that reflects its purpose and activity. This is useful
for maintaining descriptive thread labels without manual intervention.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AutoUpdateNameRequest` | Yes | The request containing the thread ID to rename |

## Returns

`Promise<void>` — A promise that resolves when the thread name has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.autoUpdateName(/* AutoUpdateNameRequest */);
console.log(result);
```
