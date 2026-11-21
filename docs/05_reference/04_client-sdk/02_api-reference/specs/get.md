---
title: get
---

# `get`

```typescript
client.specs.get(params?: GetSpecParams): Promise<Spec>
```

Retrieves a specific specification document.

Returns the spec matching the provided query parameters, typically
by spec ID or project. The document includes all sections, metadata,
and version information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetSpecParams` | No | Query parameters to identify the spec |

## Returns

`Promise<Spec>` — A promise that resolves to the Spec object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.specs.get();
console.log(result);
```
