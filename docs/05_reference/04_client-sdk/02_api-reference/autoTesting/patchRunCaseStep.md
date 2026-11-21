---
title: patchRunCaseStep
---

# `patchRunCaseStep`

```typescript
client.autoTesting.patchRunCaseStep(runId: string, caseId: string, stepId: string, data: PatchTestRunCaseStepRequest): Promise<unknown>
```

Patches a specific step result within a test case of a test run.

Updates the status or outcome of an individual step within a
test case, providing granular progress tracking.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `runId` | `string` | Yes | The unique identifier of the test run |
| `caseId` | `string` | Yes | The unique identifier of the test case |
| `stepId` | `string` | Yes | The unique identifier of the step within the case |
| `data` | `PatchTestRunCaseStepRequest` | Yes | The patch data to apply to the step result |

## Returns

`Promise<unknown>` — A promise that resolves when the patch has been applied

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.autoTesting.patchRunCaseStep('runId', 'caseId', 'stepId', /* PatchTestRunCaseStepRequest */);
console.log(result);
```
