---
title: getSuite
---

# `getSuite`

```typescript
client.autoTesting.getSuite(id: string): Promise<TestSuite>
```

Retrieves a specific test suite by ID.

Returns the full suite definition including its metadata and
associated test case references.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite |

## Returns

`Promise<TestSuite>` — A promise that resolves to the TestSuite object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.getSuite('id');
console.log(result);
```
