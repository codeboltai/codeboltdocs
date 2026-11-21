---
title: getRun
---

# `getRun`

```typescript
client.autoTesting.getRun(id: string): Promise<TestRun>
```

Retrieves a specific test run by ID.

Returns the full test run record including per-case results,
timing, and overall status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test run |

## Returns

`Promise<TestRun>` — A promise that resolves to the TestRun object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.getRun('id');
console.log(result);
```
