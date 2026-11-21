---
title: listCases
---

# `listCases`

```typescript
client.autoTesting.listCases(params?: Record<string, unknown>): Promise<TestCase[]>
```

Retrieves all test cases.

Returns every test case in the system, regardless of suite membership.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<TestCase[]>` — A promise that resolves to an array of TestCase objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.listCases();
console.log(result);
```
