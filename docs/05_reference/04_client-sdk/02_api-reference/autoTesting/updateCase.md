---
title: updateCase
---

# `updateCase`

```typescript
client.autoTesting.updateCase(id: string, data: UpdateTestCaseRequest): Promise<TestCase>
```

Updates a test case.

Modifies the steps, name, or other properties of an existing test case.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case to update |
| `data` | `UpdateTestCaseRequest` | Yes | The fields to update on the test case |

## Returns

`Promise<TestCase>` — A promise that resolves to the updated TestCase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.updateCase('id', /* UpdateTestCaseRequest */);
console.log(result);
```
