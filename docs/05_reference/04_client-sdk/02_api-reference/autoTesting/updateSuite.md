---
title: updateSuite
---

# `updateSuite`

```typescript
client.autoTesting.updateSuite(id: string, data: UpdateTestSuiteRequest): Promise<TestSuite>
```

Updates a test suite.

Modifies the name, description, or other properties of an
existing test suite.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite to update |
| `data` | `UpdateTestSuiteRequest` | Yes | The fields to update on the suite |

## Returns

`Promise<TestSuite>` — A promise that resolves to the updated TestSuite

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.updateSuite('id', /* UpdateTestSuiteRequest */);
console.log(result);
```
