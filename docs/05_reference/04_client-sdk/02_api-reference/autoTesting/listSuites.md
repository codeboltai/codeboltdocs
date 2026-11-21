---
title: listSuites
---

# `listSuites`

```typescript
client.autoTesting.listSuites(params?: Record<string, unknown>): Promise<TestSuite[]>
```

Retrieves all test suites.

Returns the complete list of test suites, which are collections of
related test cases grouped for organized execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<TestSuite[]>` — A promise that resolves to an array of TestSuite objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.listSuites();
console.log(result);
```
