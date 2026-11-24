---
sidebar_position: 3
title: Processor Pattern
description: Customize the agent loop by plugging processors into Agent's five pipeline slots
---

# Processor Pattern

Customize the agent loop by plugging processors into `Agent`'s five pipeline slots. Every shipped processor lives in `@codebolt/agent/processor-pieces` — import the ones you need, wire them into the `processors` config, and the framework runs them at the right point in the loop.

## The five slots

```
┌─ messageModifiers ──────────────────────────┐
│  Shape the prompt before inference           │
└───────────────────────────────────────��──────┘
        │
┌─ preInferenceProcessors ────────────────────┐
│  Last-minute prompt changes before LLM call  │
└──────────────────────────────────────────────┘
        │
        ▼  LLM inference
        │
┌─ postInferenceProcessors ───────────────────┐
│  Inspect/annotate the LLM response           │
└──────────────────────────────────────────────┘
        │
┌─ preToolCallProcessors ─────────────────────┐
│  Validate or intercept tool calls            │
└──────────────────────────────────────────────┘
        │
        ▼  Tool execution
        │
┌─ postToolCallProcessors ────────────────────┐
│  Compact, process results, decide next step  │
└──────────────────────────────────────────────┘
```

## Minimal example

Use `Agent` defaults for message assembly but add compression, loop detection, and compaction:

```ts
import { Agent } from '@codebolt/agent/unified';
import {
  ChatCompressionModifier,
  LoopDetectionModifier,
  ConversationCompactorModifier,
} from '@codebolt/agent/processor-pieces';

const agent = new Agent({
  instructions: 'Work carefully through larger coding tasks.',
  processors: {
    preInferenceProcessors: [
      new ChatCompressionModifier({ contextPercentageThreshold: 0.7 }),
    ],
    postInferenceProcessors: [
      new LoopDetectionModifier({ maxSimilarMessages: 3 }),
    ],
    postToolCallProcessors: [
      new ConversationCompactorModifier({ compactStrategy: 'smart' }),
    ],
  },
});
```

This adds processors to the default pipeline. When two processors in a slot share an identity, the merged pipeline keeps a single entry.

## Replacing the default message pipeline

Set `includeDefaultModifiers: false` to supply the message pipeline explicitly. Event-queue injection can be configured separately.

```ts
import { Agent } from '@codebolt/agent/unified';
import {
  ChatHistoryMessageModifier,
  EnvironmentContextModifier,
  DirectoryContextModifier,
  IdeContextModifier,
  CoreSystemPromptModifier,
  ToolInjectionModifier,
  AtFileProcessorModifier,
  ContextAssemblyModifier,
} from '@codebolt/agent/processor-pieces';

const agent = new Agent({
  instructions: 'A memory-aware assistant.',
  includeDefaultModifiers: false,
  processors: {
    messageModifiers: [
      new ChatHistoryMessageModifier({ enableChatHistory: true }),
      new EnvironmentContextModifier({ enableFullContext: false }),
      new DirectoryContextModifier(),
      new IdeContextModifier({
        includeActiveFile: true,
        includeOpenFiles: true,
        includeCursorPosition: true,
        includeSelectedText: true,
      }),
      new CoreSystemPromptModifier({ customSystemPrompt: 'You are a memory-aware assistant.' }),
      new ToolInjectionModifier({ includeToolDescriptions: true }),
      new AtFileProcessorModifier({ enableRecursiveSearch: true }),
      // Added: context assembly for memory integration
      new ContextAssemblyModifier({
        scopeVariables: { area: 'workspace' },
      }),
    ],
  },
});
```

## All shipped processors

### Message modifiers

| Class | What it does |
|---|---|
| `ChatHistoryMessageModifier` | Prepends prior thread history; injects synthetic tool-response messages for unresolved tool calls |
| `EnvironmentContextModifier` | Adds date, platform, workspace path, directory listing |
| `DirectoryContextModifier` | Adds workspace file tree honoring `.gitignore` |
| `IdeContextModifier` | Adds active file, open files, cursor position, selected text |
| `CoreSystemPromptModifier` | Sets the system prompt |
| `ToolInjectionModifier` | Fetches and injects tools from Codebolt and MCP servers |
| `AtFileProcessorModifier` | Resolves `@file` mentions and appends file contents |
| `ArgumentProcessorModifier` | Appends invocation metadata from `createdMessage.metadata.invocation` |
| `MemoryImportModifier` | Replaces `@path` file references with file contents |
| `ChatRecordingModifier` | Records prompts to `.chat-recordings` in jsonl or markdown |
| `ContextAssemblyModifier` | Calls `codebolt.contextAssembly.getContext()` and injects memory context |
| `RuleBasedContextModifier` | Evaluates context rules, fetches only included/forced memories |
| `MemoryTypeContextModifier` | Fetches specific memory types by name |

### Pre-inference processors

| Class | What it does |
|---|---|
| `ChatCompressionModifier` | Summarizes older history when the prompt crosses a token threshold |

### Post-inference processors

| Class | What it does |
|---|---|
| `LoopDetectionModifier` | Tracks message similarity; injects a system warning when repetition is detected |

### Pre-tool-call processors

| Class | What it does |
|---|---|
| `ToolValidationModifier` | Records validation metadata (core logic is TODO) |
| `ToolParameterModifier` | Records parameter metadata (core logic is TODO) |

### Post-tool-call processors

| Class | What it does |
|---|---|
| `ShellProcessorModifier` | Replaces `{{args}}` placeholders and optionally executes `!{...}` shell injections (disabled by default) |
| `ConversationCompactorModifier` | Truncates oversized tool output, deduplicates file reads, compresses history using `simple`, `smart`, or `summarize` strategies |

## Ordering

Within each slot, processors run in array order:

```ts
processors: {
  messageModifiers: [
    new DirectoryContextModifier(),    // runs first
    new AtFileProcessorModifier(),     // runs second
  ],
}
```

## Which slots can stop the loop

Only tool-call processors can return `shouldExit: true`:
- `preToolCallProcessors`
- `postToolCallProcessors`

Message, pre-inference, and post-inference processors always return a `ProcessedMessage` and cannot halt the loop.

## See also

- [Patterns Overview](./overview.md)
- [Unified Agent](./unified-agent.md)
- [What are Processors](../07_processors/01_what-are-processors.md)
- [Built-in Processors](../07_processors/03_built-in-processors.md) — detailed descriptions of each processor
- [Writing a Custom Processor](../07_processors/04_writing-a-custom-processor.md)
