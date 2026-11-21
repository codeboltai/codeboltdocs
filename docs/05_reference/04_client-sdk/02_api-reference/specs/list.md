---
title: list
---

# `list`

```typescript
client.specs.list(params?: ListSpecsParams): Promise<Spec[]>
```

Lists all specification documents.

Returns every spec document in the system, optionally filtered by
project, type, or other criteria. Use this for browsing specs or
populating specification management UIs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListSpecsParams` | No | Optional query parameters for filtering specs |

## Returns

`Promise<Spec[]>` — A promise that resolves to an array of Spec objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.specs.list();
console.log(result);
```
