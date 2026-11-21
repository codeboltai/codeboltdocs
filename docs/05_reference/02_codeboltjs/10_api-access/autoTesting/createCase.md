---
name: createCase
description: Creates a new test case with steps, labels, and priority.
cbbaseinfo:
  description: Creates a new test case with steps, labels, and priority.
data:
  name: createCase
  category: autoTesting
  link: createCase.md
---

# createCase

```text
codebolt.autoTesting.createCase(params: ICreateCaseParams): Promise<ICreateCaseResponse>
```

Creates a new test case with steps, labels, and priority.

## When to use it

Create a repeatable check inside a suite. Describe the target, expected result, and flow steps in the testing plan.

## Example

### Create a login case in an existing suite

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.autoTesting.createCase({
    suiteId: 'suite-id',
    key: 'LOGIN-001',
    name: 'Open the login page',
    testingPlan: {
      specVersion: 'agent-check/v1',
      kind: 'TestingPlan',
      metadata: { id: 'login-page', title: 'Open the login page' },
      target: { appRef: 'web-app' },
      intent: {
        summary: 'Verify that a visitor can reach the login form.',
        acceptance: ['The page displays the sign-in form.'],
      },
      flow: [{ id: 'open-login', goal: 'Open the login page and look for the form.' }],
    },
  });
  console.log(result);
});
```
