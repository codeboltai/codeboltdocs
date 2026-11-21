---
title: deleteCase
---

# `deleteCase`

```typescript
client.autoTesting.deleteCase(id: string): Promise<unknown>
```

Deletes a test case.

Permanently removes the specified test case from the system.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the test case has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.deleteCase('id');
console.log(result);
```
