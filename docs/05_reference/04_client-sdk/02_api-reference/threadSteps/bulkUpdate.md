---
title: bulkUpdate
---

# `bulkUpdate`

```typescript
client.threadSteps.bulkUpdate(data: BulkUpdateStepsRequest): Promise<void>
```

Bulk update steps

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkUpdateStepsRequest` | Yes |  |

## Returns

`Promise<void>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.bulkUpdate(/* BulkUpdateStepsRequest */);
console.log(result);
```
