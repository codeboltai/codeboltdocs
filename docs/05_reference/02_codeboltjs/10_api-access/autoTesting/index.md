# Auto Testing

Manage test suites, cases, steps, and runs.

## When to use it

Group related testing cases in a suite, start a run, and inspect the case and step results when reviewing a change.

## Examples

### Creating Test Suites

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const suite = await codebolt.autoTesting.createSuite({
    name: 'API Integration Tests',
    description: 'Tests for API endpoints',
    testCaseIds: ['case-1', 'case-2', 'case-3']
  });
});
```

### Running Test Suites

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create run
  const run = await codebolt.autoTesting.createRun({
    testSuiteId: 'suite-123',
    name: 'Daily Test Run'
  });

  // Monitor execution
  const status = await codebolt.autoTesting.getRun({ id: run.payload.run.id });
  console.log('Run status:', status.payload.run.status);
});
```

### Tracking Test Results

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update case status
  await codebolt.autoTesting.updateRunCaseStatus({
    runId: 'run-123',
    caseId: 'case-456',
    status: 'failed',
    userOverride: true
  });

  // Update step status
  await codebolt.autoTesting.updateRunStepStatus({
    runId: 'run-123',
    caseId: 'case-456',
    stepId: 'step-789',
    status: 'failed',
    logs: 'Expected 200 but got 500'
  });
});
```

### Organizing Tests

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add case to suite
  await codebolt.autoTesting.addCaseToSuite({
    suiteId: 'suite-123',
    caseId: 'case-456'
  });

  // Remove case from suite
  await codebolt.autoTesting.removeCaseFromSuite({
    suiteId: 'suite-123',
    caseId: 'case-456'
  });
});
```

## SDK methods

### createSuite

[`createSuite`](createSuite.md)

### getSuite

[`getSuite`](getSuite.md)

### listSuites

[`listSuites`](listSuites.md)

### updateSuite

[`updateSuite`](updateSuite.md)

### deleteSuite

[`deleteSuite`](deleteSuite.md)

### addCaseToSuite

[`addCaseToSuite`](addCaseToSuite.md)

### removeCaseFromSuite

[`removeCaseFromSuite`](removeCaseFromSuite.md)

### createCase

[`createCase`](createCase.md)

### getCase

[`getCase`](getCase.md)

### listCases

[`listCases`](listCases.md)

### updateCase

[`updateCase`](updateCase.md)

### deleteCase

[`deleteCase`](deleteCase.md)

### createRun

[`createRun`](createRun.md)

### getRun

[`getRun`](getRun.md)

### listRuns

[`listRuns`](listRuns.md)

### updateRunStatus

[`updateRunStatus`](updateRunStatus.md)

### updateRunCaseStatus

[`updateRunCaseStatus`](updateRunCaseStatus.md)

### updateRunStepStatus

[`updateRunStepStatus`](updateRunStepStatus.md)
