---
sidebar_position: 2
title: CodeboltAgent
description: Use CodeboltAgent when you don't need to change any logic in the agentic loop
---

# CodeboltAgent

Use `CodeboltAgent` when you don't need to change any logic in the agentic loop. You provide `instructions`, call `processMessage`, and the framework handles everything — context assembly, LLM calls, tool execution, compaction, and error recovery.

If you need to customize the loop — add processors, swap modifiers, inject pre/post hooks — use the [Processor Pattern](./processor-pattern.md) instead.

Source: `packages/agent/src/unified/agent/codeboltAgent.ts`

## Quick start

```ts
import codebolt from '@codebolt/codeboltjs';
import { CodeboltAgent } from '@codebolt/agent/unified';
import { FlatUserMessage } from '@codebolt/types/sdk';

const agent = new CodeboltAgent({
  instructions: 'You are a helpful coding assistant.',
});

codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const result = await agent.processMessage(reqMessage);

  if (!result.success) {
    throw new Error(result.error ?? 'Agent failed');
  }

  return result.finalMessage;
});
```

## processMessage

```ts
const result = await agent.processMessage(message);
const result = await agent.processMessage(message, context);
```

| Parameter | Type | Description |
|---|---|---|
| `message` | `string \| FlatUserMessage` | The user message. A plain string is auto-wrapped into a `FlatUserMessage` |
| `context` | `ProcessedMessage` (optional) | Continue from a previous conversation state — skips initial prompt generation |

### Return value

| Field | Type | Description |
|---|---|---|
| `success` | `boolean` | Whether the run completed without errors |
| `result` | `ProcessedMessage \| null` | The final conversation state |
| `context` | `ProcessedMessage \| null` | Same as `result` — pass to a follow-up call to continue |
| `finalMessage` | `string \| undefined` | The agent's final text response |
| `error` | `string \| undefined` | Error message (only when `success` is `false`) |

## Continuing a conversation

```ts
const firstResult = await agent.processMessage(reqMessage);

const secondResult = await agent.processMessage(
  'Continue from the previous result.',
  firstResult.context,
);
```

Or create a new agent with the context:

```ts
const followUpAgent = new CodeboltAgent({
  instructions: 'Continue the previous task.',
  context: firstResult.context ?? undefined,
});

const secondResult = await followUpAgent.processMessage('What was the outcome?');
```

## Configuration

| Field | Type | Default | Description |
|---|---|---|---|
| `instructions` | `string` | `'Based on User Message send reply'` | System prompt |
| `enableLogging` | `boolean` | `true` | Log execution events to console |
| `maxTurns` | `number` | `25` | Maximum LLM turns before the agent throws |
| `allowedTools` | `string[]` | all tools | Restrict available tools by name |
| `context` | `ProcessedMessage` | — | Resume from a previous conversation |
| `loopDetectionService` | `LoopDetectionService` | — | Detect and break infinite loops |
| `compaction` | `CompactionOrchestratorOptions` | `{}` | Conversation compaction settings |

Need to customize the pipeline? See [Processor Pattern](./processor-pattern.md).

## What it does under the hood

Each turn:

1. **Compaction** — compresses the conversation if it's getting long.
2. **Tool refresh** — re-fetches available tools from MCP servers.
3. **LLM call** — sends the prompt, gets back text or tool calls.
4. **Tool execution** — runs any tool calls the LLM requested.
5. **Check** — if the LLM produced a final answer, return. Otherwise, next turn.

If the LLM hits a token limit, the agent automatically tries reactive compaction and retries.

## Default message modifiers

When you don't customize `processors.messageModifiers`, these run automatically:

1. `ChatHistoryMessageModifier` — prior thread history
2. `EnvironmentContextModifier` — date, platform, workspace path
3. `DirectoryContextModifier` — workspace file tree
4. `IdeContextModifier` — active file, open files, cursor, selection
5. `CoreSystemPromptModifier` — your `instructions`
6. `ToolInjectionModifier` — available tools from Codebolt + MCP servers
7. `AtFileProcessorModifier` — resolves @file mentions

To customize the pipeline, see [Processor Pattern](./processor-pattern.md).

## createCodeboltAgent helper

Maps `systemPrompt` to `instructions`:

```ts
import { createCodeboltAgent } from '@codebolt/agent/unified';

const agent = createCodeboltAgent({
  systemPrompt: 'You are a helpful assistant.',
  maxTurns: 20,
});
```

## See also

- [Patterns Overview](./overview.md)
- [Processor Pattern](./processor-pattern.md) — customizing the pipeline
- [Level 1 — Framework](../03_agent-types/level-2-framework.md) — project layout and build
- [Built-in Processors](../07_processors/03_built-in-processors.md) — all shipped processors
