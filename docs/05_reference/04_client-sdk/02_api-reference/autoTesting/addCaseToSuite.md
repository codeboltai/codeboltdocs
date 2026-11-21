---
title: addCaseToSuite
---

# `addCaseToSuite`

```typescript
client.autoTesting.addCaseToSuite(suiteId: string, data: AddTestCaseToSuiteRequest): Promise<unknown>
```

Adds a test case to a test suite.

Associates an existing test case with the specified suite, making
it part of the suite's execution set.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `suiteId` | `string` | Yes | The unique identifier of the test suite |
| `data` | `AddTestCaseToSuiteRequest` | Yes | The test case association payload |

## Returns

`Promise<unknown>` — A promise that resolves when the case has been added to the suite

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.addCaseToSuite('suiteId', /* AddTestCaseToSuiteRequest */);
console.log(result);
```
