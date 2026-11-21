---
title: createCase
---

# `createCase`

```typescript
client.autoTesting.createCase(data: CreateTestCaseRequest): Promise<TestCase>
```

Creates a new test case.

Defines an individual test scenario with steps, expected outcomes,
and validation criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestCaseRequest` | Yes | The test case creation payload |

## Returns

`Promise<TestCase>` — A promise that resolves to the newly created TestCase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.createCase(/* CreateTestCaseRequest */);
console.log(result);
```
