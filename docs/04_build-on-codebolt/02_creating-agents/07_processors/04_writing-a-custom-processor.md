---
sidebar_position: 4
title: Writing a Custom Processor
description: The current framework does not use the older modify(messages, ctx) shape. Custom processors should match the real interfaces from @codebolt/types/agent.
---

# Writing a Custom Processor

The current framework does not use the older `modify(messages, ctx)` shape. Custom processors should match the real interfaces from `@codebolt/types/agent`.

Choose the slot that matches the behavior. A pre-inference processor can adjust the prompt immediately before the model call.

## Example: redact emails before inference

This processor runs after prompt assembly and before the LLM call.

```ts
import type {
  PreInferenceProcessor,
  ProcessedMessage,
} from "@codebolt/types/agent";
import type { FlatUserMessage } from "@codebolt/types/sdk";

export class RedactEmailsProcessor implements PreInferenceProcessor {
  async modify(
    _originalRequest: FlatUserMessage,
    createdMessage: ProcessedMessage
  ): Promise<ProcessedMessage> {
    const messages = createdMessage.message.messages.map((message) => {
      if (typeof message.content !== "string") {
        return message;
      }

      return {
        ...message,
        content: message.content.replace(
          /[\w.+-]+@[\w-]+(\.[\w-]+)+/g,
          "[redacted-email]"
        ),
      };
    });

    return {
      ...createdMessage,
      message: {
        ...createdMessage.message,
        messages,
      },
      metadata: {
        ...createdMessage.metadata,
        redactedEmails: true,
      },
    };
  }
}
```

## Wire it into an agent

```ts
import { Agent } from "@codebolt/agent/unified";
import { RedactEmailsProcessor } from "./processors/redact-emails";

const agent = new Agent({
  instructions: "Help with engineering tasks.",
  processors: {
    preInferenceProcessors: [new RedactEmailsProcessor()],
  },
});
```

The constructor merges the custom pre-inference processor into the pipeline. The event queue can inject events in the same slot.

## If you need a custom message modifier

The constructor merges message modifiers by identity. Add your modifier alongside the defaults with this configuration.

```ts
processors: {
  messageModifiers: [new MyModifier()],
}
```

Set `includeDefaultModifiers: false` to provide the entire standard list yourself. The event queue remains controlled by `eventQueue`.

## Real interface shapes

These are the current signatures:

```ts
interface MessageModifier {
  modify(
    originalRequest: FlatUserMessage,
    createdMessage: ProcessedMessage
  ): Promise<ProcessedMessage>;
}

interface PreInferenceProcessor {
  modify(
    originalRequest: FlatUserMessage,
    createdMessage: ProcessedMessage
  ): Promise<ProcessedMessage>;
}

interface PostInferenceProcessor {
  modify(
    llmMessageSent: ProcessedMessage,
    llmResponseMessage: LLMCompletion,
    nextPrompt: ProcessedMessage
  ): Promise<ProcessedMessage>;
}
```

Tool-call families use input/output objects:

```ts
interface PreToolCallProcessor {
  modify(input: PreToolCallProcessorInput): Promise<PreToolCallProcessorOutput>;
}

interface PostToolCallProcessor {
  modify(input: PostToolCallProcessorInput): Promise<PostToolCallProcessorOutput>;
}
```

## Rules for writing one

- Return a new `ProcessedMessage` or a new processor output object. Do not mutate inputs in place.
- Write any bookkeeping to `metadata` if the next stage needs to observe it.
- Keep work cheap. Processors run on the critical path of the loop.
- Pick the slot where the processor can see the information it needs.
- Only tool-call processors can stop the loop with `shouldExit`.

## A post-tool-call example

If you need to end execution after inspecting tool results, use a post-tool-call processor:

```ts
import type {
  PostToolCallProcessor,
  PostToolCallProcessorInput,
  PostToolCallProcessorOutput,
} from "@codebolt/types/agent";

export class StopOnFailureProcessor implements PostToolCallProcessor {
  async modify(
    input: PostToolCallProcessorInput
  ): Promise<PostToolCallProcessorOutput> {
    const hasFailure = (input.toolResults || []).some((result) => {
      return typeof result.content === "string" && result.content.includes("error");
    });

    return {
      nextPrompt: input.nextPrompt,
      shouldExit: hasFailure,
    };
  }
}
```

## Testing a processor

Processors are easiest to test directly by passing in a small `ProcessedMessage` and checking the returned value.

For message/pre-inference/post-inference processors, assert:

- the returned transcript content
- metadata flags you added
- unchanged behavior for messages you did not intend to touch

For tool-call processors, also assert `shouldExit`.

## See also

- [What are processors](./01_what-are-processors.md)
- [Processor types](./02_processor-types.md)
- [Built-in processors](./03_built-in-processors.md)
