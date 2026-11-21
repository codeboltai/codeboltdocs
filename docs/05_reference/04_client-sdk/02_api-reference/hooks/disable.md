---
title: disable
---

# `disable`

```typescript
client.hooks.disable(id: string): Promise<unknown>
```

Disables a hook without deleting it.

Prevents the hook from firing while preserving its configuration.
The hook can be re-enabled later with .

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to disable |

## Returns

`Promise<unknown>` — A promise that resolves when the hook has been disabled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.disable('id');
console.log(result);
```
