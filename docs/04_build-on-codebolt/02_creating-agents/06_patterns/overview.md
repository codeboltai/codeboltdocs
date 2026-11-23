---
sidebar_position: 1
title: Patterns Overview
description: "The @codebolt/agent package provides two exports:"
---

# Patterns Overview

The `@codebolt/agent` package provides two exports:

| Export | When to use |
|---|---|
| **`@codebolt/agent/unified`** | Use the default agentic loop as-is — [CodeboltAgent](./unified-agent.md) |
| **`@codebolt/agent/processor-pieces`** | Customize the loop by adding/swapping processors — [Processor Pattern](./processor-pattern.md) |

## Picking one

- **Don't need to change the loop?** → Use [CodeboltAgent](./unified-agent.md). Provide `instructions`, call `processMessage`, done.
- **Need to add processors, swap modifiers, or hook into specific phases?** → Use the [Processor Pattern](./processor-pattern.md). Same `CodeboltAgent` class, but you configure the `processors` slots.
- **Need full control with no defaults?** → Use `Agent` (the bare class, see below).

## The two classes

### CodeboltAgent — use the loop as-is

`CodeboltAgent` is the batteries-included agent class. Use it when you **don't need to change any logic in the agentic loop**. You provide instructions, the framework handles everything else — context assembly, LLM calls, tool execution, compaction, error recovery.

```ts
import { CodeboltAgent } from '@codebolt/agent/unified';

const agent = new CodeboltAgent({
  instructions: 'You are a helpful coding assistant.',
});
```

Use `CodeboltAgent` when:
- The default loop is exactly what you need.
- You just want to set a system prompt and go.
- You don't need custom processors, modifiers, or hooks.

### Agent — the bare class

`Agent` implements the same loop but with **no default message modifiers**. You supply everything yourself through the `processors` config.

```ts
import { Agent } from '@codebolt/agent/unified';
import {
  DirectoryContextModifier,
  CoreSystemPromptModifier,
  ToolInjectionModifier,
} from '@codebolt/agent/processor-pieces';

const agent = new Agent({
  instructions: 'You are a specialist agent.',
  processors: {
    messageModifiers: [
      new DirectoryContextModifier(),
      new CoreSystemPromptModifier({ customSystemPrompt: 'Custom prompt here.' }),
      new ToolInjectionModifier({ includeToolDescriptions: true }),
    ],
  },
});
```

Use `Agent` when:
- You need full control over which modifiers run.
- You're building infrastructure that assembles agents from config.
- The default `CodeboltAgent` pipeline includes modifiers you don't want.

## Building blocks

Both classes are built from lower-level components you can also use directly:

| Component | What it does |
|---|---|
| `InitialPromptGenerator` | Runs message modifiers to build the initial prompt |
| `AgentStep` | Executes one LLM inference step with pre/post-inference processors |
| `ResponseExecutor` | Handles tool execution with pre/post-tool-call processors |
| `Tool` | Wraps a function with Zod input/output validation |
| `Workflow` | Orchestrates multi-step processes with input/output schemas |
| `LoopDetectionService` | Detects and breaks infinite loops |
| `CompactionOrchestrator` | Multi-layer conversation compaction (snip, micro, context collapse, auto, reactive) |

Use these directly when `CodeboltAgent`'s loop shape doesn't match your needs but you still want framework components instead of raw `@codebolt/codeboltjs`.

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

- [CodeboltAgent](./unified-agent.md) — detailed API reference
- [Processor Pattern](./processor-pattern.md) — customizing the pipeline with processor-pieces
- [Level 1 — Framework](../03_agent-types/level-2-framework.md) — full walkthrough
- [Processors](../07_processors/01_what-are-processors.md) — the modifier pipeline
