---
title: createSuite
---

# `createSuite`

```typescript
client.autoTesting.createSuite(data: CreateTestSuiteRequest): Promise<TestSuite>
```

Creates a new test suite.

Defines a new collection of test cases that can be executed together.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestSuiteRequest` | Yes | The test suite creation payload |

## Returns

`Promise<TestSuite>` — A promise that resolves to the newly created TestSuite

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.createSuite(/* CreateTestSuiteRequest */);
console.log(result);
```
