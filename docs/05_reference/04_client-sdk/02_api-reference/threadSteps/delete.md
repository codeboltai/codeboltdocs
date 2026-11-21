---
title: delete
---

# `delete`

```typescript
client.threadSteps.delete(stepId: string): Promise<void>
```

Delete a step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |

## Returns

`Promise<void>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.delete('stepId');
console.log(result);
```
