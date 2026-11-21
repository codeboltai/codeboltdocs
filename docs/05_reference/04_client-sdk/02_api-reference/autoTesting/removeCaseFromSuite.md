---
title: removeCaseFromSuite
---

# `removeCaseFromSuite`

```typescript
client.autoTesting.removeCaseFromSuite(suiteId: string, caseId: string): Promise<unknown>
```

Removes a test case from a test suite.

Disassociates a test case from the specified suite without deleting
the test case itself.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `suiteId` | `string` | Yes | The unique identifier of the test suite |
| `caseId` | `string` | Yes | The unique identifier of the test case to remove |

## Returns

`Promise<unknown>` — A promise that resolves when the case has been removed from the suite

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.removeCaseFromSuite('suiteId', 'caseId');
console.log(result);
```
