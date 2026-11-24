---
sidebar_position: 1
title: Patterns Overview
description: "The @codebolt/agent package provides two exports:"
---

# Patterns Overview

The `@codebolt/agent` package provides two exports:

| Export | When to use |
|---|---|
| **`@codebolt/agent/unified`** | Use the default agentic loop as-is — [Unified Agent](./unified-agent.md) |
| **`@codebolt/agent/processor-pieces`** | Customize the loop by adding/swapping processors — [Processor Pattern](./processor-pattern.md) |

## Configure the unified agent

Use [Unified Agent](./unified-agent.md) to run the default loop. Set instructions through `createAgent()` or the `Agent` constructor, then call `agent.run()` from a Chat handler. Use the [Processor Pattern](./processor-pattern.md) to add or replace processors in the same loop.

### Default pipeline

```ts
import { createAgent } from '@codebolt/agent/unified';

const agent = createAgent({
  systemPrompt: 'You are a helpful coding assistant.',
});
```

### Explicit message pipeline

Set `includeDefaultModifiers: false` to supply the message pipeline explicitly. Event-queue injection and tool-event guidance have their own settings.

```ts
import { Agent } from '@codebolt/agent/unified';
import {
  DirectoryContextModifier,
  CoreSystemPromptModifier,
  ToolInjectionModifier,
} from '@codebolt/agent/processor-pieces';

const systemPrompt = 'Help with the current project and cite the relevant files.';

const agent = new Agent({
  instructions: systemPrompt,
  includeDefaultModifiers: false,
  processors: {
    messageModifiers: [
      new DirectoryContextModifier(),
      new CoreSystemPromptModifier({ customSystemPrompt: systemPrompt }),
      new ToolInjectionModifier({ includeToolDescriptions: true }),
    ],
  },
});
```

## Building blocks

`Agent` composes the following components.

| Component | What it does |
|---|---|
| `InitialPromptGenerator` | Runs message modifiers to build the initial prompt |
| `AgentStep` | Executes one LLM inference step with pre/post-inference processors |
| `ResponseExecutor` | Handles tool execution with pre/post-tool-call processors |
| `Tool` | Wraps a function with Zod input/output validation |
| `Workflow` | Orchestrates multi-step processes with input/output schemas |
| `LoopDetectionService` | Detects and breaks infinite loops |

Use these directly when `Agent`'s loop shape doesn't match your needs but you still want framework components instead of raw `@codebolt/codeboltjs`.

```ts
const prompt = await promptGenerator.processMessage(reqMessage);
const stepResult = await agentStep.executeStep(reqMessage, prompt);
const execution = await responseExecutor.executeResponse({
  initialUserMessage: reqMessage,
  actualMessageSentToLLM: stepResult.actualMessageSentToLLM,
  rawLLMOutput: stepResult.rawLLMResponse,
  nextMessage: stepResult.nextMessage,
});
```

## See also

- [Unified Agent](./unified-agent.md) — detailed API reference
- [Processor Pattern](./processor-pattern.md) — customizing the pipeline with processor-pieces
- [Level 1 — Framework](../03_agent-types/level-2-framework.md) — full walkthrough
- [Processors](../07_processors/01_what-are-processors.md) — the modifier pipeline
