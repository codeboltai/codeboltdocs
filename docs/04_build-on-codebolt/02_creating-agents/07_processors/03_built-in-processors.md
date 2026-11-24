---
sidebar_position: 3
title: Built-in Processors
description: These are the processor pieces currently exported from @codebolt/agent/processor-pieces.
---

# Built-in Processors

These are the processor pieces currently exported from `@codebolt/agent/processor-pieces`.

## Default `Agent` message pipeline

`Agent` installs the standard modifiers in this order. On resumed runs it skips `ChatHistoryMessageModifier` and reuses the history in the supplied prompt.

| Order | Class | What it does |
|---|---|---|
| 1 | `ChatHistoryMessageModifier` | Loads thread history. |
| 2 | `CapabilityContextModifier` | Adds selected capability context. |
| 3 | `EnvironmentContextModifier` | Adds environment details with `enableFullContext: false`. |
| 4 | `DirectoryContextModifier` | Adds the project’s directory structure. |
| 5 | `IdeContextModifier` | Adds editor context such as open files and the cursor position. |
| 6 | `CoreSystemPromptModifier` | Applies the agent’s instructions. |
| 7 | `CodeboltCapabilitiesSummaryModifier` | Adds a summary of platform capabilities. |
| 8 | `CodeboltPlatformKnowledgeRouterModifier` | Adds guidance for looking up relevant platform knowledge. |
| 9 | `ToolInjectionModifier` | Populates the model’s available tools. |
| 10 | `ConnectorMentionsModifier` | Adds context for mentioned connectors. |
| 11 | `ToolGroupContextModifier` | Adds tool-group context. |
| 12 | `AtFileProcessorModifier` | Resolves file and folder mentions. |
| 13 | `VirtualWorkerContextModifier` | Adds virtual worker context when available. |
| 14 | `ConversationContextModifier` | Adds conversation context. |
| 15 | `ParticipantMentionsModifier` | Adds context for mentioned participants. |

The constructor merges your processors into each slot by identity. Set `includeDefaultModifiers: false` to supply the message list explicitly.

When `eventQueue` is enabled, the constructor also adds an event-queue modifier during prompt assembly and before inference, plus a post-tool-call queue processor. Tool-event guidance adds another post-tool-call processor. Both features default to enabled.

## Other shipped message modifiers

These are exported, but they are **not** part of the default `Agent` pipeline.

| Class | What it does | Notes |
|---|---|---|
| `MemoryImportModifier` | Replaces `@path`-style file references inside the user message with file contents from a configured base path. | This is simple file import logic, not context-assembly memory lookup. |
| `ArgumentProcessorModifier` | Appends invocation data from `createdMessage.metadata.invocation` to the user message. | Useful when an agent is invoked with external command metadata. |
| `ChatRecordingModifier` | Writes prompt messages to `.chat-recordings` in `jsonl` or markdown format. | Disabled unless `enableRecording: true`. |
| `ContextAssemblyModifier` | Calls `codebolt.contextAssembly.getContext(...)` and injects assembled memory context as a system or user message. | Supports scope variables, explicit memory, rule engines, validation, and custom formatting. |
| `RuleBasedContextModifier` | Evaluates context rules first, then fetches only the included/forced memories. | Writes rule-evaluation metadata onto the prompt. |
| `MemoryTypeContextModifier` | Fetches specific memory types by name and injects the resulting context. | Can auto-resolve required variables from message metadata. |

## Pre-inference processors

| Class | Default? | What it does |
|---|---|---|
| `AgentEventQueueModifier` | Yes | Injects pending events before inference. |
| `ChatCompressionModifier` | No | Estimates prompt size and summarizes older history when the prompt crosses a configured fraction of the model token limit. It writes compression metadata onto the prompt. |

Notes:

- This is an opt-in processor.
- When starting a run, `Agent` can load an existing compacted prompt from the server for the current thread.

## Post-inference processors

| Class | Default? | What it does |
|---|---|---|
| `LoopDetectionModifier` | No | Tracks recent user and assistant message similarity. When it detects repetition, it appends a system warning to the next prompt. |

## Pre-tool-call processors

| Class | Default? | What it does |
|---|---|---|
| `ToolValidationModifier` | No | Currently a pass-through processor. It records validation metadata but does not yet enforce tool validation rules. |
| `ToolParameterModifier` | No | Currently a pass-through processor. It records metadata but does not yet rewrite tool parameters. |

Those two classes exist in the package surface, but their core mutation/validation logic is still marked `TODO` in the current source.

## Post-tool-call processors

| Class | Default? | What it does |
|---|---|---|
| `AgentEventQueuePostToolCallProcessor` | Yes | Injects pending events after tool calls. |
| `ToolEventGuidancePostToolCallProcessor` | Yes | Adds guidance for configured tool events. |
| `ShellProcessorModifier` | No | Replaces `{{args}}` placeholders and optionally executes `!{...}` shell injections found in tool results or prompt messages. |
| `ConversationCompactorModifier` | No | Counts tokens, truncates oversized tool output, deduplicates repeated file reads, and can compress older conversation history using `simple`, `smart`, or `summarize` strategies. |

Important details:

- `ShellProcessorModifier` is disabled by default for security. You must opt in with `enableShellExecution: true`.
- `ConversationCompactorModifier` can use the LLM to generate a structured continuation summary and injects hints telling the agent which files to re-read after compaction.

## A realistic opt-in example

```ts
import { Agent } from "@codebolt/agent/unified";
import {
  ChatCompressionModifier,
  ConversationCompactorModifier,
  LoopDetectionModifier,
} from "@codebolt/agent/processor-pieces";

const agent = new Agent({
  instructions: "Work carefully through larger coding tasks.",
  processors: {
    preInferenceProcessors: [
      new ChatCompressionModifier({ contextPercentageThreshold: 0.7 }),
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

## Choosing which ones to use

- Use the default message pipeline unless you have a concrete reason to replace it.
- Reach for `ContextAssemblyModifier` or its variants when you want memory/context service integration.
- Reach for `ConversationCompactorModifier` when you want explicit post-tool transcript compaction behavior.
- Treat `ToolValidationModifier` and `ToolParameterModifier` as placeholders until their TODO logic is implemented.

## See also

- [What are processors](./01_what-are-processors.md)
- [Processor types](./02_processor-types.md)
- [Writing a custom processor](./04_writing-a-custom-processor.md)
