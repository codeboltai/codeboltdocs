---
sidebar_position: 1
title: Single Agent Loop
description: Run one agent through a focused context, act, verify, and refine loop
---

import SingleAgentLoop from '@site/src/components/diagrams/SingleAgentLoop';
import SingleAgentWhileLoop from '@site/src/components/diagrams/SingleAgentWhileLoop';

# Single Agent Loop

A single agent loop is the simplest reliable way to use Codebolt for iterative work. One agent owns the task, builds the working context, chooses and runs tools, observes the result, and continues until the goal is complete or the loop reaches a safety limit.

**Use case:** you want one agent to complete a scoped task without coordinating with other agents or environments.


<SingleAgentLoop />


There are two common ways to tell a single-agent loop how to verify its work.

### Option 1: Using a prompt

For one-off tasks, put the task and the verification instructions in the user message. the prompt itself carries both the goal and the checks the agent should use before finishing.

The user prompt itself includes the task and the verification rules:

```text
Write a TypeScript function named isEven(value: number): boolean.

After writing it, verify the function by checking:
- isEven(2) returns true
- isEven(3) returns false
- isEven(0) returns true
- isEven(-4) returns true

If any check fails, fix the function and test again before returning the final answer.
```

Use this when the test is specific to the current request and you do not need to reuse the same verification logic across many runs.

### Option 2: Using a custom agent

For repeated workflows, move the verification into the custom agent. The user only gives the task, and the agent decides how to verify the output after each agent step run.

```ts
codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const agent = createCodeboltAgent({ systemPrompt:"You are a careful coding agent. Inspect, edit, verify, and summarize." });
  let nextMessage= reqMessage, testResult='fail';
  while (testResult=='fail') {
    const result = await agent.processMessage(nextMessage);
    const testResult = testOutput(finalMessage);
    nextMessage = 'The previous output failed verification: ' + testResult.feedback+ ' Fix it and try again.';
  }
});
```

<SingleAgentWhileLoop />

Use this when every request should pass the same verification policy, such as TypeScript checks, Jest tests, or a project-specific `testOutput` function.

To know more about creating agent refer to [Creating Agent](/docs/build-on-codebolt/creating-agents/overview)


## See also

- [Build your first agent](../02_first-steps/build-your-first-agent.md)
- [Debug a hung agent](../04_everyday-workflows/debug-a-hung-agent.md)
