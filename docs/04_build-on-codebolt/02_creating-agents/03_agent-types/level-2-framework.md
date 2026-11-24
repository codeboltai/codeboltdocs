---
sidebar_position: 2
title: Level 1 — Framework
description: Write a code-based agent on top of @codebolt/agent
---

# Level 1 — Framework

Use the Codebolt Agent Framework when you want to write your own instructions, tools, or message handling. The framework sends requests to the model, runs the tools it asks for, and passes the results back for the next turn.

If you haven’t built an agent yet, follow [Create your first custom agent](../02_quickstart.md) to get one running in Chat.

<span id="creating-custom-tools" />
<span id="when-level-1-is-the-right-choice" />

## Choose what to customize

| I want my agent to… | What to edit |
| --- | --- |
| Answer in a particular style or take on a role | Set `systemPrompt` in `src/index.ts`. [Change the agent’s instructions](../02_quickstart.md#edit-typescript). |
| Perform an operation I write | Define a function as a tool and add it to `tools`. Your agent can call it alongside its available Codebolt tools. [Write and test a custom tool](../12_custom-agent-tools.md). |
| Change the text the model receives | Add a message modifier while assembling the prompt, or a pre-inference processor just before the model call. [Write a processor and choose when it runs](../07_processors/04_writing-a-custom-processor.md). |

<span id="what-the-framework-actually-gives-you" />
<span id="the-normal-entry-point" />

## How a Chat message reaches your agent

In `src/index.ts`, `createAgent()` configures your agent once. Each time someone sends it a Chat message, the handler passes the request to `agent.run()` and returns the reply. Here’s the pattern used by the `act-updated` sample.

```ts
import codebolt from '@codebolt/codeboltjs';
import { createAgent } from '@codebolt/agent/unified';
import type { FlatUserMessage } from '@codebolt/types/sdk';

const agent = createAgent({
  systemPrompt: 'Help with the current project and explain your findings.',
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

During a run, the framework prepares the prompt, calls the model, and executes any requested tools. It carries tool results into the next turn until the agent finishes or reaches its turn limit. The [built-in processors](../07_processors/03_built-in-processors.md#default-agent-message-pipeline) supply context such as chat history and open files.

## Customizing the pipeline

To add a single modifier, register it in `processors.messageModifiers` alongside the defaults. For logic that should run immediately before or after a model call or tool call, choose the corresponding [processor type](../07_processors/02_processor-types.md).

This variant supplies a smaller message pipeline.

```ts
import {
  Agent,
  LoopDetectionService,
} from '@codebolt/agent/unified';
import {
  EnvironmentContextModifier,
  CoreSystemPromptModifier,
  DirectoryContextModifier,
  IdeContextModifier,
  AtFileProcessorModifier,
  ToolInjectionModifier,
  ChatHistoryMessageModifier,
} from '@codebolt/agent/processor-pieces';

const loopDetectionService = new LoopDetectionService({ debug: true });

const agent = new Agent({
  instructions: systemPrompt,
  includeDefaultModifiers: false,
  enableLogging: true,
  loopDetectionService,
  maxTurns: 30,
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
      new CoreSystemPromptModifier({ customSystemPrompt: systemPrompt }),
      new ToolInjectionModifier({ includeToolDescriptions: true }),
      new AtFileProcessorModifier({ enableRecursiveSearch: true }),
    ],
  },
});
```

The constructor keeps the inference and tool loop. The explicit modifiers assemble the prompt, and the built-in event queue can still inject queued messages.

## When `Agent` is not enough

You can drop one layer lower without leaving level 1. The framework exposes its building blocks directly:

- `InitialPromptGenerator`
- `AgentStep`
- `ResponseExecutor`

Use them when you need to change the turn logic but still want framework components instead of raw `@codebolt/codeboltjs`.

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

If you need to own the entire loop, event wiring, or low-level SDK interaction yourself, move to [level 2](./level-1-codeboltjs.md).

## Carrying context across calls

`run()` returns the final prompt in `state`. Use it to continue in a later call.

```ts
const firstResult = await agent.run(reqMessage);

if (firstResult.success && firstResult.state) {
  const secondResult = await agent.run(nextMessage, { state: firstResult.state });
  console.log(secondResult.finalMessage ?? secondResult.error);
}
```

## Processing external events

The default event-queue processors pull in steering messages, inter-agent messages, and background completions. To take over that behavior with a custom processor, set `eventQueue: false` and use `codebolt.agentEventQueue` to read and inject the events.

### The event queue

```ts
const eventQueue = codebolt.agentEventQueue;

// Returns pending events and clears them from the queue
const events = eventQueue.getPendingExternalEvents();
```

### Event types

| Event type | Source | What it means |
|---|---|---|
| `agentQueueEvent` with `payload.type === 'steering'` | User sent a message while the agent is working | Redirect the agent's current approach |
| `agentQueueEvent` (other) | Another agent sent a message | Inter-agent communication |
| `backgroundAgentCompletion` | A background agent finished | Notify the LLM about completed background work |

### Injecting events as a message modifier

Create a custom processor that polls the queue and pushes events into the prompt's message array:

```ts
import { ProcessedMessage } from '@codebolt/types/agent';
import { FlatUserMessage } from '@codebolt/types/sdk';

const eventQueue = codebolt.agentEventQueue;

function processExternalEvent(event: any, prompt: ProcessedMessage): ProcessedMessage {
  if (!event || !prompt?.message?.messages) return prompt;

  const eventType = event.type || event.eventType;
  const eventData = event.data || event;

  if (eventType === 'agentQueueEvent') {
    const payload = eventData?.payload || {};

    // Steering: user sent a follow-up while the agent is working
    if (payload.type === 'steering') {
      const instruction = payload.instruction || payload.content || JSON.stringify(payload);
      prompt.message.messages.push({
        role: 'user' as const,
        content: `<steering_message>
<instruction>${instruction}</instruction>
<context>The user has sent a steering message while you are working. Adjust your approach accordingly.</context>
</steering_message>`,
      });
      return prompt;
    }

    // Inter-agent message
    const content = payload.content || JSON.stringify(payload);
    prompt.message.messages.push({
      role: 'user' as const,
      content: `<agent_event>
<source>${eventData.sourceAgentId || 'system'}</source>
<content>${content}</content>
</agent_event>`,
    });
    return prompt;
  }

  if (eventType === 'backgroundAgentCompletion') {
    prompt.message.messages.push({
      role: 'assistant' as const,
      content: `Background agent completed:\n${JSON.stringify(eventData, null, 2)}`,
    });
    return prompt;
  }

  return prompt;
}
```

### Wiring into Agent

Register the processor in two slots so events are picked up both during initial prompt assembly and after tool calls:

```ts
// As a message modifier — runs during prompt assembly
const externalEventProcessor = {
  async modify(_originalRequest: FlatUserMessage, createdMessage: ProcessedMessage) {
    let prompt = createdMessage;
    for (const event of eventQueue.getPendingExternalEvents()) {
      prompt = processExternalEvent(event, prompt);
    }
    return prompt;
  },
};

// As a post-tool-call processor — runs after each tool execution
const externalEventPostToolProcessor = {
  async modify({ nextPrompt }: { nextPrompt: ProcessedMessage }) {
    let prompt = nextPrompt;
    for (const event of eventQueue.getPendingExternalEvents()) {
      prompt = processExternalEvent(event, prompt);
    }
    return { nextPrompt: prompt, shouldExit: false };
  },
};

const agent = new Agent({
  instructions: systemPrompt,
  eventQueue: false,
  processors: {
    messageModifiers: [
      // ... your other modifiers ...
      externalEventProcessor,       // Add at the end of message modifiers
    ],
    postToolCallProcessors: [
      externalEventPostToolProcessor, // Check for events after every tool call
    ],
  },
});
```

In this custom pipeline, events enter the prompt during initial assembly and after tool calls.

## Building blocks API

When `Agent`'s loop doesn't fit your needs, use the building blocks directly:

### InitialPromptGenerator

Runs message modifiers to build the initial prompt:

```ts
import { InitialPromptGenerator } from '@codebolt/agent/unified';

const promptGenerator = new InitialPromptGenerator({
  processors: myMessageModifiers,     // MessageModifier[]
  baseSystemPrompt: 'You are ...',
  enableLogging: true,
});

const prompt = await promptGenerator.processMessage(reqMessage);
```

### AgentStep

Executes one LLM call with pre/post-inference processors:

```ts
import { AgentStep } from '@codebolt/agent/unified';

const agentStep = new AgentStep({
  preInferenceProcessors: [],
  postInferenceProcessors: [],
});

const stepResult = await agentStep.executeStep(reqMessage, prompt);
// stepResult.rawLLMResponse — the LLM's raw response
// stepResult.nextMessage — the prompt with LLM response appended
// stepResult.actualMessageSentToLLM — what was actually sent to the LLM
```

### ResponseExecutor

Handles tool execution with pre/post-tool-call processors:

```ts
import { ResponseExecutor } from '@codebolt/agent/unified';

const responseExecutor = new ResponseExecutor({
  preToolCallProcessors: [],
  postToolCallProcessors: [],
  loopDetectionService: myLoopDetection, // optional
});

const execution = await responseExecutor.executeResponse({
  initialUserMessage: reqMessage,
  actualMessageSentToLLM: stepResult.actualMessageSentToLLM,
  rawLLMOutput: stepResult.rawLLMResponse,
  nextMessage: stepResult.nextMessage,
});
// execution.completed — true if LLM produced a final answer
// execution.nextMessage — updated prompt for next turn
// execution.finalMessage — the agent's text response (if completed)
```

### LoopDetectionService

Detects repeated tool calls:

```ts
import { LoopDetectionService } from '@codebolt/agent/unified';

const loopDetection = new LoopDetectionService({
  toolCallLoopThreshold: 5,  // trigger after 5 identical calls (default)
  debug: true,                // log detection events
});

// Check inside your loop:
const loopEvent = loopDetection.checkToolCallLoop(toolName, toolArgs);
if (loopEvent) {
  console.warn('Loop detected:', loopEvent);
}

// Reset between runs:
loopDetection.reset();
```

## codeboltagent.yaml reference

The manifest describes your agent to the UI and routing system:

```yaml
# Required
title: My Agent
version: 1.0.0
unique_id: my-agent
description: What this agent does in one line.

# Optional identity
initial_message: Hi! I'm ready to help.
tags: [coding, typescript]
longDescription: |
  A longer description shown on the agent detail page.
avatarSrc: https://example.com/icon.png
avatarFallback: MA
author: your-name
supportRemix: true

# Agent routing — tells Codebolt when to suggest this agent
metadata:
  agent_routing:
    worksonblankcode: true
    worksonexistingcode: true
    supportedlanguages: [javascript, typescript, python]
    supportedframeworks: [react, node, express]
    supportRemix: true

  # Default LLM configuration
  defaultagentllm:
    strict: true
    modelorder:
      - claude-sonnet-4-20250514
      - gpt-4-turbo

  # Specialized LLM roles (optional)
  llm_role:
    - name: documentationllm
      description: LLM for documentation tasks.
      strict: true
      modelorder: [gpt-4-turbo, gpt-3.5-turbo]
    - name: testingllm
      description: LLM for testing tasks.
      strict: true
      modelorder: [gpt-4-turbo]

# Actions — buttons shown in the agent UI
actions:
  - name: Execute
    description: Run the task.
    actionPrompt: Let's build this
  - name: Plan
    actionPrompt: /plan

# Pre-completion verification (optional)
verification:
  enabled: true
  checks:
    lint: true
    test: true
    build: true
    typecheck: true
  timeout: 60000
  skipOnNoConfig: true
  skipForNonCodeTasks: true
  maxRetries: -1  # -1 = keep retrying until fixed
```

## Project layout

```text
my-agent/
├── codeboltagent.yaml
├── package.json
├── tsconfig.json
├── webpack.config.js
├── src/
│   └── index.ts
└── dist/
    ├── index.js
    └── codeboltagent.yaml   # copied by webpack
```

## Build with webpack

Most agents use webpack to bundle into a single `dist/index.js`. Key requirements:

- **Target `node`** — agents run in Node.js
- **Copy `codeboltagent.yaml` to `dist/`** — Codebolt reads it from the dist folder
- **Externalize `@codebolt` packages** — they're provided at runtime

```js
// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'codeboltagent.yaml', to: 'codeboltagent.yaml' }],
    }),
  ],
  // Don't bundle Node built-ins
  externals: {
    '@codebolt/codeboltjs': 'commonjs @codebolt/codeboltjs',
    '@codebolt/agent': 'commonjs @codebolt/agent',
  },
};
```

### package.json scripts

```json
{
  "scripts": {
    "build": "npx webpack",
    "dev": "npx tsx src/index.ts",
    "clean": "rimraf dist"
  },
  "dependencies": {
    "@codebolt/codeboltjs": "^5.1.32",
    "@codebolt/agent": "^6.0.0"
  },
  "devDependencies": {
    "copy-webpack-plugin": "^12.0.2",
    "ts-loader": "^9.5.0",
    "typescript": "^5.4.5",
    "webpack": "^5.90.0",
    "webpack-cli": "^5.1.4"
  }
}
```

## When to graduate to level 2

Move to [level 2](./level-1-codeboltjs.md) when:

- You need a fully custom agent loop.
- You need raw `@codebolt/codeboltjs` APIs the framework does not wrap.
- You are building infrastructure or orchestration primitives rather than a normal chat agent.

For most code-based agents, level 1 is the right level.

## See also

- [Level 0 — Remix](./level-3-remix.md)
- [Level 2 — codeboltjs](./level-1-codeboltjs.md)
- [Patterns overview](../06_patterns/overview.md)
- [Processors](../07_processors/01_what-are-processors.md)
