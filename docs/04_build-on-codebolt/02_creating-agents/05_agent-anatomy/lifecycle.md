---
sidebar_position: 2
title: Agent Lifecycle
description: Follow a Chat request through a custom Codebolt agent, from startup and message handling to tool calls and the final reply.
---

# Agent Lifecycle

When you send a message to a custom agent in Chat, Codebolt delivers the request to the agent’s message handler. For an agent built with the Codebolt Agent SDK, the handler typically calls `agent.run()`. A single run can include several model calls before the agent returns a reply.

## Stages of a Chat request {#the-stages}

The sequence below follows a custom agent that Codebolt launches and that uses `createAgent()` to handle requests.

| Stage | What happens |
| --- | --- |
| 1. Start the agent | Codebolt launches the agent’s entry point. The entry point creates the agent and registers its Chat handler with `codebolt.onMessage`. |
| 2. Receive the request | Codebolt invokes the handler with the incoming message. The handler passes that request to `agent.run()`. |
| 3. Prepare the model input | The SDK builds the initial prompt from the request, the agent’s instructions, and any configured message processors. When resuming with existing context, it uses that context to prepare the next prompt. |
| 4. Run the model and tools | The SDK calls the model and processes its response. If the model requests a tool, the SDK handles the call and includes the result in the next turn. This continues until the response is complete, an error occurs, or the configured turn limit is exceeded. |
| 5. Return the reply | The handler receives the run result. It can return `result.finalMessage` to Chat on success or report `result.error` on failure. |

For a self-executed remote agent, you start the process yourself. See [Register a remote agent](../11_remote-agent.md).

## How the handler returns a result

This handler assumes you have already created `agent` with `createAgent()`. Passing the full request to `agent.run()` preserves the thread information Codebolt supplies with the message.

```ts
codebolt.onMessage(async (request: FlatUserMessage) => {
  const result = await agent.run(request);
  if (!result.success) {
    return result.error || 'Agent execution failed.';
  }
  return result.finalMessage || '';
});
```

For the imports, agent definition, and build steps, see [Create your first custom agent](../02_quickstart.md#edit-typescript).

## Process exit and diagnostics

When a Codebolt-managed agent process exits, the server updates the execution record and closes the debug session. A zero exit code or a prior completion notification marks the execution as completed. An unexpected nonzero exit marks it as failed and can surface an error in the thread.

| Symptom | What to check |
| --- | --- |
| The agent exits before handling a message | Check the runtime entry point in the agent’s `package.json`, confirm the build produced that file, and inspect startup output for missing dependencies. |
| The handler runs but returns an error | Inspect `result.error`. If the SDK reports a turn-limit error, check whether the agent keeps requesting tools without reaching a final reply. |
| The run succeeds but Chat shows no text | Check `result.finalMessage` and the value your `onMessage` handler returns. |

Open [Agent Debug](../../../02_using-codebolt/04_agents/08_agent-debug.md) to inspect the execution output. For the server-side sequence, see [Agent run end to end](../../02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md).
