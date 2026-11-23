---
sidebar_position: 1
title: What are Processors
description: Processors are typed hook points inside the @codebolt/agent loop
---

# What are Processors

Processors are typed hook points inside the `@codebolt/agent` loop. They let you change prompt assembly, LLM preparation, post-response handling, or tool execution without rewriting the whole agent.

In the current framework, the reusable built-ins live in `@codebolt/agent/processor-pieces`, and `CodeboltAgent` consumes them through its `processors` config.

## Where processors run

`CodeboltAgent` runs processors in this order:

1. `messageModifiers`
2. `preInferenceProcessors`
3. `postInferenceProcessors`
4. `preToolCallProcessors`
5. `postToolCallProcessors`

Those are the real slot names in the shipped code. They map to the three runtime stages:

- `InitialPromptGenerator` runs `messageModifiers`
- `AgentStep` runs `preInferenceProcessors` and `postInferenceProcessors`
- `ResponseExecutor` runs `preToolCallProcessors` and `postToolCallProcessors`

## What processors operate on

Processors do **not** receive a generic `ctx` object or a raw `Message[]`.

The current framework passes typed loop objects instead:

- `FlatUserMessage` for the original request
- `ProcessedMessage` for the working prompt/transcript
- `LLMCompletion` for the raw model response
- `ToolResult[]` for executed tools

That matters because most built-ins work by returning a new `ProcessedMessage`, often with extra `metadata`.

## When to use one

Use a processor when you want to change one phase of the loop:

- add extra prompt context
- rewrite or annotate the prompt before inference
- inspect the model response and inject follow-up guidance
- validate or rewrite tool-call flow
- compact or summarize the transcript between turns

If you need a new capability, build a tool. If you need a different loop, write a custom agent.

## The real `processors` shape

```ts
import { CodeboltAgent } from "@codebolt/agent/unified";
import {
  AtFileProcessorModifier,
  ConversationCompactorModifier,
  DirectoryContextModifier,
  LoopDetectionModifier,
} from "@codebolt/agent/processor-pieces";

const agent = new CodeboltAgent({
  instructions: "Help with repository maintenance.",
  processors: {
    messageModifiers: [
      new DirectoryContextModifier(),
      new AtFileProcessorModifier({ enableRecursiveSearch: true }),
    ],
    postInferenceProcessors: [
      new LoopDetectionModifier({ maxSimilarMessages: 3 }),
    ],
    postToolCallProcessors: [
      new ConversationCompactorModifier({ compactStrategy: "smart" }),
    ],
  },
});
```

Two important details from the current implementation:

- `processors.messageModifiers` **replaces** the default `CodeboltAgent` message pipeline.
- The other processor arrays default to empty, so adding to them is additive.

## Defaults vs opt-in processors

Only `messageModifiers` have built-in defaults in `CodeboltAgent`. The default order is:

1. `ChatHistoryMessageModifier`
2. `EnvironmentContextModifier`
3. `DirectoryContextModifier`
4. `IdeContextModifier`
5. `CoreSystemPromptModifier`
6. `ToolInjectionModifier`
7. `AtFileProcessorModifier`

Everything else in `processor-pieces` is opt-in.

## What processors are not

Processors are not:

- global application hooks
- generic event listeners
- new tools
- arbitrary middleware with custom `halt` or `deny` return shapes

Those older abstractions do not match the current package.

## See also

- [Processor types](./02_processor-types.md)
- [Built-in processors](./03_built-in-processors.md)
- [Writing a custom processor](./04_writing-a-custom-processor.md)
- [Level 1 — Framework](../03_agent-types/level-2-framework.md)
