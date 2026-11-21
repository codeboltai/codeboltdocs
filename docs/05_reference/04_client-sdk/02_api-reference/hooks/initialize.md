---
title: initialize
---

# `initialize`

```typescript
client.hooks.initialize(data?: InitializeHooksRequest): Promise<unknown>
```

Initializes the hooks subsystem.

Sets up the hooks infrastructure, loading any persisted hooks and
preparing event listeners. Should be called once during application
bootstrap before registering or triggering hooks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitializeHooksRequest` | No | Optional initialization configuration |

## Returns

`Promise<unknown>` — A promise that resolves when initialization is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.initialize();
console.log(result);
```
