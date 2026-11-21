---
title: addWatcher
---

# `addWatcher`

```typescript
client.updateRequests.addWatcher(id: string, data: AddWatcherRequest): Promise<unknown>
```

Add a watcher to a request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `AddWatcherRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.addWatcher('id', /* AddWatcherRequest */);
console.log(result);
```
