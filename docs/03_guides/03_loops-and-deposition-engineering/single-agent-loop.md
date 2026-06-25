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

## How the loop runs

In the `act-updated` agent, the loop starts when Codebolt receives a user message and passes it into `CodeboltAgent.processMessage`. The agent does not act on the raw prompt alone. It first assembles a structured working prompt from chat history, project context, IDE context, selected capabilities, system instructions, tools, and `@file` references.

After that, the agent repeatedly alternates between model reasoning and tool execution. Each turn may produce a direct response, a tool call, or a completion response. Tool results are fed back into the next prompt so the agent can refine its next action.

<SingleAgentLoop />

## Runtime stages

1. **Receive the task.** `codebolt.onMessage` receives the `FlatUserMessage` and starts a single `CodeboltAgent` instance for that request.
2. **Assemble context.** Message modifiers add chat history, capability context, environment details, directory structure, IDE state, system instructions, tool definitions, and `@file` content.
3. **Inject live events.** Pending steering messages, agent queue events, and background agent completion events are inserted into the prompt before inference.
4. **Reason and choose an action.** The model either responds directly or selects a tool from the injected tool set.
5. **Run tools and observe results.** Tool outputs are returned to the agent as new context for the next turn.
6. **Re-check live events after tools.** The agent checks for new steering or background completion events after tool execution so it can adjust mid-loop.
7. **Prevent runaway behavior.** `LoopDetectionService` watches repeated behavior, and `maxTurns: 30` caps the loop.
8. **Return the final message.** When the task is complete, blocked, or stopped by safety controls, the agent returns the final response to Codebolt.

## Basic code structure

`createCodeboltAgent` wraps `CodeboltAgent` and is the simplest way to create the default CodeBolt-aware runtime. It uses the standard message modifiers unless you pass a custom `messageModifiers` array. That default chain includes chat history, environment context, directory context, IDE context, the system prompt, tool injection, and `@file` processing.

That means the basic loop can stay small:

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

## Testing the loop

There are two common ways to tell a single-agent loop how to verify its work.

### Option 1: Using a prompt

For one-off tasks, put the task and the verification instructions in the same prompt. The agent receives both the goal and the checks it should use before finishing.

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

For repeated workflows, move the verification into the custom agent. The user only gives the task, and the agent decides how to verify the output after each `processMessage` run.

```ts
codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const agent = createCodeboltAgent({
    systemPrompt: 'Write the requested code, then rely on the agent verification step before finishing.',
  });

  let nextMessage = reqMessage;
  let testResult = { status: 'fail', feedback: '' };

  while (testResult.status === 'fail') {
    const result = await agent.processMessage(nextMessage);
    testResult = testOutput(result.finalMessage);

    if (testResult.status === 'fail') {
      nextMessage = 'Verification failed: ' + testResult.feedback + ' Fix it and try again.';
    }
  }

  return testResult;
});
```

Use this when every request should pass the same verification policy, such as TypeScript checks, Jest tests, or a project-specific `testOutput` function.

To know more about creating agent refer to [Creating Agent](/docs/build-on-codebolt/creating-agents/overview)

## When to use it

Use a single agent loop when:

- **One agent should own the outcome:** the task does not need a planner, reviewer, or specialist agent.
- **The work has a clear scope:** the files, feature area, or bug boundary are reasonably constrained.
- **One project environment is enough:** build, typecheck, lint, and tests can run in the current project context.
- **Sequential tool use is acceptable:** the agent can inspect, edit, verify, and refine in one thread.
- **Mid-loop steering is useful:** you may need to nudge the same agent while it is already working.

Avoid it when the work requires parallel exploration, independent review, multiple runtime environments, or separate agents with different responsibilities.

## Practical tips

- **Keep the goal concrete.** A precise target produces a tighter loop.
- **Give the agent useful anchors.** Mention important files, folders, errors, screenshots, or `@file` references when you know them.
- **Let context gathering happen first.** The loop works best when the agent inspects the codebase before editing.
- **Use steering messages sparingly.** Mid-loop steering is supported, but frequent changes can make the loop less focused.
- **Ask for verification.** The loop is incomplete until relevant checks pass, unless you intentionally skip them for documentation-only or exploratory work.
- **Limit the scope.** Split broad product changes into multiple single-agent loops.
- **Review the final diff.** The agent should explain the impact, but the code remains the source of truth.

## See also

- [Build your first agent](../02_first-steps/build-your-first-agent.md)
- [Debug a hung agent](../04_everyday-workflows/debug-a-hung-agent.md)
