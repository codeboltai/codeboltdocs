---
title: create
---

# `create`

```typescript
client.updateRequests.create(data: CreateUpdateRequestRequest): Promise<UpdateRequest>
```

Create a new update request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateUpdateRequestRequest` | Yes |  |

## Returns

`Promise<UpdateRequest>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.create(/* CreateUpdateRequestRequest */);
console.log(result);
```
