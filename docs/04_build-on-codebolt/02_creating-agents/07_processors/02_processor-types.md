---
sidebar_position: 2
title: Processor Types
description: The current framework has five processor families, not four. Each family has a different signature and runs at a different point in the loop.
---

# Processor Types

The current framework has **five** processor families, not four. Each family has a different signature and runs at a different point in the loop.

## Family 1 — Message Modifiers

Run during prompt assembly in `InitialPromptGenerator`.

```ts
interface MessageModifier {
  modify(
    originalRequest: FlatUserMessage,
    createdMessage: ProcessedMessage
  ): Promise<ProcessedMessage>;
}
```

Use these for:

- adding environment or directory context
- injecting tools
- resolving `@file` mentions
- adding memory or context-assembly output

Important:

- `Agent` merges custom message modifiers with the defaults by processor identity. Set `includeDefaultModifiers: false` to supply your own default list.

## Family 2 — Pre-Inference Processors

Run in `AgentStep` after prompt assembly and before `codebolt.llm.inference(...)`.

```ts
interface PreInferenceProcessor {
  modify(
    originalRequest: FlatUserMessage,
    createdMessage: ProcessedMessage
  ): Promise<ProcessedMessage>;
}
```

Use these for:

- last-minute redaction
- prompt compression
- final prompt normalization before inference

## Family 3 — Post-Inference Processors

Run in `AgentStep` after the LLM response has been appended to the transcript, but before tool execution.

```ts
interface PostInferenceProcessor {
  modify(
    llmMessageSent: ProcessedMessage,
    llmResponseMessage: LLMCompletion,
    nextPrompt: ProcessedMessage
  ): Promise<ProcessedMessage>;
}
```

Use these for:

- response inspection
- loop warnings
- transcript annotations before tool handling

## Family 4 — Pre-Tool Call Processors

Run in `ResponseExecutor` before tools are executed.

```ts
interface PreToolCallProcessor {
  modify(input: {
    llmMessageSent: ProcessedMessage;
    rawLLMResponseMessage: LLMCompletion;
    nextPrompt: ProcessedMessage;
  }): Promise<{
    nextPrompt: ProcessedMessage;
    shouldExit?: boolean;
  }>;
}
```

Use these for:

- validating tool-call flow
- intercepting tool execution
- stopping execution before tools run

Important:

- This is the first family that can short-circuit the loop with `shouldExit: true`.

## Family 5 — Post-Tool Call Processors

Run in `ResponseExecutor` after tool results have been appended to the prompt.

```ts
interface PostToolCallProcessor {
  modify(input: {
    llmMessageSent: ProcessedMessage;
    rawLLMResponseMessage: LLMCompletion;
    nextPrompt: ProcessedMessage;
    toolResults?: ToolResult[];
    tokenLimit?: number;
    maxOutputTokens?: number;
  }): Promise<{
    nextPrompt: ProcessedMessage;
    shouldExit: boolean;
  }>;
}
```

Use these for:

- transcript compaction
- processing shell-style placeholders from tool results
- deciding whether the loop should continue

## Ordering

Within each family, processors run in the array order you provide:

```ts
processors: {
  messageModifiers: [
    new DirectoryContextModifier(),
    new AtFileProcessorModifier(),
  ],
  postInferenceProcessors: [
    new LoopDetectionModifier(),
  ],
}
```

There is no shipped `before` / `after` insertion syntax in the current framework.

## Which families can stop the loop

Only tool-call processors can return `shouldExit`:

- `preToolCallProcessors`
- `postToolCallProcessors`

Message, pre-inference, and post-inference processors always return a `ProcessedMessage`.

## Public imports

Use:

- `@codebolt/agent/processor-pieces` for shipped processor classes
- `@codebolt/types/agent` for processor interfaces and `ProcessedMessage`
- `@codebolt/types/sdk` for `FlatUserMessage` and `LLMCompletion`

One minor oddity in the current export surface:

- `LoopDetectionModifier` belongs to the **post-inference** family
- but it is re-exported through the `processor-pieces` barrel alongside message modifiers

## See also

- [What are processors](./01_what-are-processors.md)
- [Built-in processors](./03_built-in-processors.md)
- [Writing a custom processor](./04_writing-a-custom-processor.md)
