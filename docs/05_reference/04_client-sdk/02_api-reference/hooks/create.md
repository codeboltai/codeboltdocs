---
title: create
---

# `create`

```typescript
client.hooks.create(data: CreateHookRequest): Promise<Hook>
```

Creates a new hook.

Registers a hook that will fire when the specified event occurs.
The hook is enabled by default upon creation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateHookRequest` | Yes | Hook creation payload including event type and action |

## Returns

`Promise<Hook>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.create(/* CreateHookRequest */);
console.log(result);
```
