---
title: removeWatcher
---

# `removeWatcher`

```typescript
client.updateRequests.removeWatcher(id: string, watcherId: string): Promise<unknown>
```

Remove a watcher from a request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `watcherId` | `string` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.removeWatcher('id', 'watcherId');
console.log(result);
```
