---
title: get
---

# `get`

```typescript
client.hooks.get(id: string): Promise<Hook>
```

Retrieves a specific hook by its ID.

Returns the full configuration and state of a single hook.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook |

## Returns

`Promise<Hook>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.get('id');
console.log(result);
```
