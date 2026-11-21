---
title: deleteSuite
---

# `deleteSuite`

```typescript
client.autoTesting.deleteSuite(id: string): Promise<unknown>
```

Deletes a test suite.

Permanently removes the specified test suite. This does not delete
the test cases themselves, only their association with the suite.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the suite has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.deleteSuite('id');
console.log(result);
```
