---
title: updateRun
---

# `updateRun`

```typescript
client.autoTesting.updateRun(id: string, data: UpdateTestRunRequest): Promise<TestRun>
```

Updates a test run.

Modifies the status or metadata of an in-progress or completed test run.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test run to update |
| `data` | `UpdateTestRunRequest` | Yes | The fields to update on the test run |

## Returns

`Promise<TestRun>` — A promise that resolves to the updated TestRun

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.updateRun('id', /* UpdateTestRunRequest */);
console.log(result);
```
