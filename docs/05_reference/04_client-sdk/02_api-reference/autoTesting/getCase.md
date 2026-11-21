---
title: getCase
---

# `getCase`

```typescript
client.autoTesting.getCase(id: string): Promise<TestCase>
```

Retrieves a specific test case by ID.

Returns the full test case definition including its steps,
expected results, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case |

## Returns

`Promise<TestCase>` — A promise that resolves to the TestCase object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.getCase('id');
console.log(result);
```
