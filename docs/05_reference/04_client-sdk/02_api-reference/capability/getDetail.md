---
title: getDetail
---

# `getDetail`

```typescript
client.capability.getDetail(name: string): Promise<Capability>
```

Retrieves detailed information for a specific capability.

Returns the full definition of a capability including its
configuration, executors, and usage documentation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the capability |

## Returns

`Promise<Capability>` — A promise that resolves to the Capability object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.getDetail('name');
console.log(result);
```
