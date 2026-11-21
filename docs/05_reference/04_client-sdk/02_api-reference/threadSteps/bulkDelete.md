---
title: bulkDelete
---

# `bulkDelete`

```typescript
client.threadSteps.bulkDelete(data: BulkDeleteStepsRequest): Promise<void>
```

Bulk delete steps

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkDeleteStepsRequest` | Yes |  |

## Returns

`Promise<void>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.bulkDelete(/* BulkDeleteStepsRequest */);
console.log(result);
```
