---
sidebar_position: 2
title: Unified Agent
description: Run the Codebolt agent loop with createAgent, as the Act sample does.
---

# Unified Agent

`@codebolt/agent/unified` exports the `Agent` class and the `createAgent` factory. The factory constructs an `Agent` and uses `systemPrompt` as `instructions` when `instructions` is omitted.

## Quick start

This is the entry point used by the `act-updated` sample, with a short prompt substituted for Act's prompt.

```ts
import codebolt from '@codebolt/codeboltjs';
import { createAgent } from '@codebolt/agent/unified';
import type { FlatUserMessage } from '@codebolt/types/sdk';

const systemPrompt = 'Help with the current project and explain your findings.';

const agent = createAgent({
  systemPrompt,
  enableLogging: true,
  structuredToolResults: true,
});

codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const result = await agent.run(reqMessage);
  return result.success
    ? result.finalMessage ?? ''
    : result.error ?? 'Agent execution failed.';
});
```

Create the agent once to set its instructions and configuration. The SDK registers the callback once the connection is ready. Codebolt calls it with the incoming Chat message, including its thread and attachments. `agent.run()` processes that request, and the callback returns the final text or error to Codebolt on completion.

Act opts into `structuredToolResults`. This lets the response executor preserve structured tool outcomes and native screenshots when available.

## What it does under the hood

1. `InitialPromptGenerator` prepares the prompt with message modifiers. The run also checks the server for compacted context for the current thread and merges it when available.
2. Before each inference turn, `Agent` refreshes discovered tools when the prompt calls for tool refresh and merges any registered local tools.
3. `AgentStep` applies the inference processors and calls the model.
4. `ResponseExecutor` handles model output, sends assistant messages to Chat, and runs requested tools with the tool-call processors. It produces the next prompt, any tool results, and a completion status.
5. The loop feeds the next prompt back into inference until the executor reports completion or failure, or the run reaches its turn limit.

## Calling the agent

`agent.run(message, options?)` accepts a `FlatUserMessage` or a string. Use the incoming `FlatUserMessage` in a Chat handler to retain its thread ID and context. For direct calls, the library wraps a string as a new request.

`agent.processMessage()` takes the same arguments and delegates to `run()`. To let the library register the Chat handler, call `agent.start()`.

| Result field | Meaning |
|---|---|
| `success` | Whether the run completed successfully. |
| `state` | The final prompt, exposed as `state.prompt` when available. |
| `toolResults` | Tool results accumulated by the run. |
| `finalMessage` | Final response text, when present. |
| `error` | Failure details, when present. |

The older `result` and `context` fields are deprecated aliases for the prompt.

## Continuing a conversation

Pass the previous state explicitly. The library runs the resume modifiers against the supplied prompt and skips the chat-history modifier so it can reuse the history in that prompt.

```ts
const first = await agent.run(firstMessage);

if (first.success && first.state) {
  const followUp = await agent.run(nextMessage, { state: first.state });
  console.log(followUp.finalMessage ?? followUp.error);
}
```

## Configuration

| Option | Behavior |
|---|---|
| `instructions` | The system prompt. `createAgent()` also accepts `systemPrompt`. |
| `maxTurns` | Defaults to 100 inference turns. A value of `0` removes the explicit turn limit. Hitting the limit returns a failure result. |
| `loopDetectionService` | The library creates a detector per run by default. Pass `false` to disable it, or pass a configured detector. |
| `allowedTools`, `tools` | Select available tool names and register local tool implementations, respectively. |
| `processors` | Add message, inference, and tool-call processors. The library merges them by processor identity. |
| `includeDefaultModifiers` | Set to `false` to supply your own message-modifier pipeline. Event-queue injection has its own setting. |
| `eventQueue`, `toolEventGuidance` | Control the built-in event injection and post-tool guidance. Both are enabled by default. |
| `structuredToolResults` | Opt in to structured tool outcomes and supported native screenshots. Defaults to `false`. |

See [Built-in Processors](../07_processors/03_built-in-processors.md) for the default message pipeline and [Processor Pattern](./processor-pattern.md) for customization examples.

## See also

- [Level 1 — Framework](../03_agent-types/level-2-framework.md)
- [Custom Agent Quickstart](../02_quickstart.md)
- [Patterns Overview](./overview.md)
