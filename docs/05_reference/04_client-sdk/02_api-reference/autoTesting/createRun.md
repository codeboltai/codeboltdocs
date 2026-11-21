---
title: createRun
---

# `createRun`

```typescript
client.autoTesting.createRun(data: CreateTestRunRequest): Promise<TestRun>
```

Creates a new test run.

Initiates an execution of one or more test suites or cases,
tracking the results as they complete.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestRunRequest` | Yes | The test run creation payload |

## Returns

`Promise<TestRun>` — A promise that resolves to the newly created TestRun

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.createRun(/* CreateTestRunRequest */);
console.log(result);
```
