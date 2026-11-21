---
title: list
---

# `list`

```typescript
client.capability.list(params?: Record<string, unknown>): Promise<Capability[]>
```

Retrieves all registered capabilities.

Returns the complete list of capabilities available in the system,
representing the skills and actions that agents can perform.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<Capability[]>` — A promise that resolves to an array of Capability objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.list();
console.log(result);
```
