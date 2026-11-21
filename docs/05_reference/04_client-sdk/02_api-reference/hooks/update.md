---
title: update
---

# `update`

```typescript
client.hooks.update(id: string, data: UpdateHookRequest): Promise<Hook>
```

Updates an existing hook's configuration.

Modifies hook properties such as its name, event trigger, or action.
Only the fields provided in the request body are updated.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to update |
| `data` | `UpdateHookRequest` | Yes | The fields to update |

## Returns

`Promise<Hook>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.update('id', /* UpdateHookRequest */);
console.log(result);
```
