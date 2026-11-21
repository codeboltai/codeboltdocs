---
title: patchRunCase
---

# `patchRunCase`

```typescript
client.autoTesting.patchRunCase(runId: string, caseId: string, data: PatchTestRunCaseRequest): Promise<unknown>
```

Patches a specific test case result within a test run.

Updates the status or outcome of an individual test case within
an active test run, allowing incremental result reporting.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `runId` | `string` | Yes | The unique identifier of the test run |
| `caseId` | `string` | Yes | The unique identifier of the test case within the run |
| `data` | `PatchTestRunCaseRequest` | Yes | The patch data to apply to the case result |

## Returns

`Promise<unknown>` — A promise that resolves when the patch has been applied

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.patchRunCase('runId', 'caseId', /* PatchTestRunCaseRequest */);
console.log(result);
```
