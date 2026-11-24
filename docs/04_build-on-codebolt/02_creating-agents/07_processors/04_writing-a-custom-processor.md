---
sidebar_position: 4
title: Writing a Custom Processor
description: Change the text your agent sends to the model and test the result in Chat.
---

# Writing a Custom Processor

A processor lets you run your code at a particular point in an agent’s request. This example replaces email addresses in plain-text messages with `[redacted-email]` before the model sees them.

Start with a [working custom agent](../02_quickstart.md). You’ll add one file and register the processor in the agent’s existing handler file.

## Write the processor {#example-redact-emails-before-inference}

Create `src/processors/redact-emails.ts` inside your agent folder. The `modify` method below returns a copy of the prompt with the email addresses replaced.

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

## Register it with your agent {#wire-it-into-an-agent}

In `src/index.ts`, import the processor next to your existing imports.

```ts
import { RedactEmailsProcessor } from './processors/redact-emails';
```

Add `preInferenceProcessors` to the configuration you pass to `createAgent`. Keep the instructions, tools, and message handler you already use.

```ts
const agent = createAgent({
  systemPrompt,
  processors: {
    preInferenceProcessors: [new RedactEmailsProcessor()],
  },
});
```

## Try it in Chat

Run `npm run build` from the agent folder. In a new Chat tab, select your agent and send **Repeat this line exactly: Contact dev@example.com**. Look for `Contact [redacted-email]` in the reply. The processor changes the text sent to the model. The message you typed still appears in Chat.

## If you need a custom message modifier

A message modifier transforms the prompt during assembly. The `RedactEmailsProcessor` above already implements the `modify(request, createdMessage)` method required by `MessageModifier`. To apply that transformation during prompt assembly, register it in the message modifier slot.

```ts
import { createAgent } from '@codebolt/agent/unified';
import { RedactEmailsProcessor } from './processors/redact-emails';

const agent = createAgent({
  systemPrompt: 'Help with engineering tasks.',
  processors: {
    messageModifiers: [new RedactEmailsProcessor()],
  },
});
```

To test the modifier directly, pass its `modify` method a processed message whose transcript contains `Contact dev@example.com`. Check that the returned transcript contains `Contact [redacted-email]` and that the original transcript still contains the address.

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
