---
name: startAgent
description: Starts an agent for the specified task.
cbbaseinfo:
  description: Starts an agent for the specified task.
data:
  name: startAgent
  category: agent
  link: startAgent.md
---

# startAgent

```text
codebolt.agent.startAgent(agentId: string, task: string, options?: { llm?: any; }): Promise<TaskCompletionResponse>
```

Starts an agent for the specified task.

## Parameters

- `agentId` — The identifier of the agent to run.
- `task` — The task to send to that agent.
- `options.llm` — Optional model override for the child agent.

## Returns

A promise that resolves with the child agent's completion response. On success, `task` contains the completion text and `result` contains the completion event.

## When to use it

Use this method when you already know the agent ID and the task to delegate. For a message in an existing agent thread, use [sendMessage](./index.md#sendmessage) with its thread ID.

## Delegate a task to a known agent

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const completion = await codebolt.agent.startAgent(
    'your-code-review-agent-id',
    'Review the latest changes and list potential bugs.',
  );
  if (!completion.success) throw new Error(completion.message ?? 'The agent failed.');
  console.log(completion.task);
});
```

## Return a delegated result in an agent reply

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const result = await codebolt.agent.startAgent(
    'your-reviewer-agent-id',
    'Read the README and list missing setup steps.',
  );
  if (!result.success) return result.message ?? 'The delegated task failed.';
  return result.task ?? 'The reviewer returned no text.';
});
```
