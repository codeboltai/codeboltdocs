---
title: AutoTesting API
---

# AutoTesting API

Auto Testing API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addCaseToSuite`](./addCaseToSuite) | Adds a test case to a test suite. |
| [`createCase`](./createCase) | Creates a new test case. |
| [`createRun`](./createRun) | Creates a new test run. |
| [`createSuite`](./createSuite) | Creates a new test suite. |
| [`deleteCase`](./deleteCase) | Deletes a test case. |
| [`deleteSuite`](./deleteSuite) | Deletes a test suite. |
| [`getCase`](./getCase) | Retrieves a specific test case by ID. |
| [`getRun`](./getRun) | Retrieves a specific test run by ID. |
| [`getSuite`](./getSuite) | Retrieves a specific test suite by ID. |
| [`listCases`](./listCases) | Retrieves all test cases. |
| [`listRuns`](./listRuns) | Retrieves all test runs. |
| [`listSuites`](./listSuites) | Retrieves all test suites. |
| [`patchRunCase`](./patchRunCase) | Patches a specific test case result within a test run. |
| [`patchRunCaseStep`](./patchRunCaseStep) | Patches a specific step result within a test case of a test run. |
| [`removeCaseFromSuite`](./removeCaseFromSuite) | Removes a test case from a test suite. |
| [`updateCase`](./updateCase) | Updates a test case. |
| [`updateRun`](./updateRun) | Updates a test run. |
| [`updateSuite`](./updateSuite) | Updates a test suite. |

## Methods

---

### `addCaseToSuite`

```typescript
client.autoTesting.addCaseToSuite(suiteId: string, data: AddTestCaseToSuiteRequest): Promise<unknown>
```

Adds a test case to a test suite.

Associates an existing test case with the specified suite, making
it part of the suite's execution set.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `suiteId` | `string` | Yes | The unique identifier of the test suite |
| `data` | `AddTestCaseToSuiteRequest` | Yes | The test case association payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the case has been added to the suite

[Full reference →](./addCaseToSuite)

---

### `createCase`

```typescript
client.autoTesting.createCase(data: CreateTestCaseRequest): Promise<TestCase>
```

Creates a new test case.

Defines an individual test scenario with steps, expected outcomes,
and validation criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestCaseRequest` | Yes | The test case creation payload |

**Returns:** `Promise<TestCase>` — A promise that resolves to the newly created TestCase

[Full reference →](./createCase)

---

### `createRun`

```typescript
client.autoTesting.createRun(data: CreateTestRunRequest): Promise<TestRun>
```

Creates a new test run.

Initiates an execution of one or more test suites or cases,
tracking the results as they complete.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestRunRequest` | Yes | The test run creation payload |

**Returns:** `Promise<TestRun>` — A promise that resolves to the newly created TestRun

[Full reference →](./createRun)

---

### `createSuite`

```typescript
client.autoTesting.createSuite(data: CreateTestSuiteRequest): Promise<TestSuite>
```

Creates a new test suite.

Defines a new collection of test cases that can be executed together.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestSuiteRequest` | Yes | The test suite creation payload |

**Returns:** `Promise<TestSuite>` — A promise that resolves to the newly created TestSuite

[Full reference →](./createSuite)

---

### `deleteCase`

```typescript
client.autoTesting.deleteCase(id: string): Promise<unknown>
```

Deletes a test case.

Permanently removes the specified test case from the system.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the test case has been deleted

[Full reference →](./deleteCase)

---

### `deleteSuite`

```typescript
client.autoTesting.deleteSuite(id: string): Promise<unknown>
```

Deletes a test suite.

Permanently removes the specified test suite. This does not delete
the test cases themselves, only their association with the suite.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the suite has been deleted

[Full reference →](./deleteSuite)

---

### `getCase`

```typescript
client.autoTesting.getCase(id: string): Promise<TestCase>
```

Retrieves a specific test case by ID.

Returns the full test case definition including its steps,
expected results, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case |

**Returns:** `Promise<TestCase>` — A promise that resolves to the TestCase object

[Full reference →](./getCase)

---

### `getRun`

```typescript
client.autoTesting.getRun(id: string): Promise<TestRun>
```

Retrieves a specific test run by ID.

Returns the full test run record including per-case results,
timing, and overall status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test run |

**Returns:** `Promise<TestRun>` — A promise that resolves to the TestRun object

[Full reference →](./getRun)

---

### `getSuite`

```typescript
client.autoTesting.getSuite(id: string): Promise<TestSuite>
```

Retrieves a specific test suite by ID.

Returns the full suite definition including its metadata and
associated test case references.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite |

**Returns:** `Promise<TestSuite>` — A promise that resolves to the TestSuite object

[Full reference →](./getSuite)

---

### `listCases`

```typescript
client.autoTesting.listCases(params?: Record<string, unknown>): Promise<TestCase[]>
```

Retrieves all test cases.

Returns every test case in the system, regardless of suite membership.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<TestCase[]>` — A promise that resolves to an array of TestCase objects

[Full reference →](./listCases)

---

### `listRuns`

```typescript
client.autoTesting.listRuns(params?: Record<string, unknown>): Promise<TestRun[]>
```

Retrieves all test runs.

Returns the history of test run executions, including their status,
results, and timing information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<TestRun[]>` — A promise that resolves to an array of TestRun objects

[Full reference →](./listRuns)

---

### `listSuites`

```typescript
client.autoTesting.listSuites(params?: Record<string, unknown>): Promise<TestSuite[]>
```

Retrieves all test suites.

Returns the complete list of test suites, which are collections of
related test cases grouped for organized execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<TestSuite[]>` — A promise that resolves to an array of TestSuite objects

[Full reference →](./listSuites)

---

### `patchRunCase`

```typescript
client.autoTesting.patchRunCase(runId: string, caseId: string, data: PatchTestRunCaseRequest): Promise<unknown>
```

Patches a specific test case result within a test run.

Updates the status or outcome of an individual test case within
an active test run, allowing incremental result reporting.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `runId` | `string` | Yes | The unique identifier of the test run |
| `caseId` | `string` | Yes | The unique identifier of the test case within the run |
| `data` | `PatchTestRunCaseRequest` | Yes | The patch data to apply to the case result |

**Returns:** `Promise<unknown>` — A promise that resolves when the patch has been applied

[Full reference →](./patchRunCase)

---

### `patchRunCaseStep`

```typescript
client.autoTesting.patchRunCaseStep(runId: string, caseId: string, stepId: string, data: PatchTestRunCaseStepRequest): Promise<unknown>
```

Patches a specific step result within a test case of a test run.

Updates the status or outcome of an individual step within a
test case, providing granular progress tracking.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `runId` | `string` | Yes | The unique identifier of the test run |
| `caseId` | `string` | Yes | The unique identifier of the test case |
| `stepId` | `string` | Yes | The unique identifier of the step within the case |
| `data` | `PatchTestRunCaseStepRequest` | Yes | The patch data to apply to the step result |

**Returns:** `Promise<unknown>` — A promise that resolves when the patch has been applied

[Full reference →](./patchRunCaseStep)

---

### `removeCaseFromSuite`

```typescript
client.autoTesting.removeCaseFromSuite(suiteId: string, caseId: string): Promise<unknown>
```

Removes a test case from a test suite.

Disassociates a test case from the specified suite without deleting
the test case itself.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `suiteId` | `string` | Yes | The unique identifier of the test suite |
| `caseId` | `string` | Yes | The unique identifier of the test case to remove |

**Returns:** `Promise<unknown>` — A promise that resolves when the case has been removed from the suite

[Full reference →](./removeCaseFromSuite)

---

### `updateCase`

```typescript
client.autoTesting.updateCase(id: string, data: UpdateTestCaseRequest): Promise<TestCase>
```

Updates a test case.

Modifies the steps, name, or other properties of an existing test case.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test case to update |
| `data` | `UpdateTestCaseRequest` | Yes | The fields to update on the test case |

**Returns:** `Promise<TestCase>` — A promise that resolves to the updated TestCase

[Full reference →](./updateCase)

---

### `updateRun`

```typescript
client.autoTesting.updateRun(id: string, data: UpdateTestRunRequest): Promise<TestRun>
```

Updates a test run.

Modifies the status or metadata of an in-progress or completed test run.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test run to update |
| `data` | `UpdateTestRunRequest` | Yes | The fields to update on the test run |

**Returns:** `Promise<TestRun>` — A promise that resolves to the updated TestRun

[Full reference →](./updateRun)

---

### `updateSuite`

```typescript
client.autoTesting.updateSuite(id: string, data: UpdateTestSuiteRequest): Promise<TestSuite>
```

Updates a test suite.

Modifies the name, description, or other properties of an
existing test suite.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the test suite to update |
| `data` | `UpdateTestSuiteRequest` | Yes | The fields to update on the suite |

**Returns:** `Promise<TestSuite>` — A promise that resolves to the updated TestSuite

[Full reference →](./updateSuite)

