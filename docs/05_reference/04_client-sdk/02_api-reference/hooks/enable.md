---
title: enable
---

# `enable`

```typescript
client.hooks.enable(id: string): Promise<unknown>
```

Enables a previously disabled hook.

Re-activates the hook so it will fire again when its event occurs.
Has no effect if the hook is already enabled.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to enable |

## Returns

`Promise<unknown>` — A promise that resolves when the hook has been enabled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.enable('id');
console.log(result);
```
