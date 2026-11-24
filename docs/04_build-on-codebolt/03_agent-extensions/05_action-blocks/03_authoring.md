---
sidebar_position: 3
title: Authoring
description: "Use the CLI to create the initial structure:"
---

# Authoring

## Scaffold a new action block

Use the CLI to create the initial structure:

```bash
codebolt action actionblock create \
  --name my-action-block \
  --description "Description of what this block does"
```

## Project structure

A typical action block project looks like this:

```
my-action-block/
├── src/
│   └── index.ts          # Entry point with onActionBlockInvocation handler
├── actionblock.yml        # Block configuration (see Block Schema)
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Entry point

Every action block registers a handler using `codebolt.onActionBlockInvocation()`. The handler receives a `threadContext` (containing parameters and thread metadata) and returns a result object.

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async (threadContext: any, metadata: any) => {
  try {
    const params = threadContext?.params || {};
    const { plan, task } = params;

    // Validate inputs
    if (!plan || !task) {
      return { success: false, error: 'Missing required parameters' };
    }

    // Your logic here — can use LLM, Codebolt APIs, etc.
    const { completion } = await codebolt.llm.inference({
      input: [
        { type: 'message', role: 'system', content: 'You are a helpful assistant.' },
        { type: 'message', role: 'user', content: `Analyze this task: ${task.description}` },
      ],
    });

    // Send status updates to the chat
    codebolt.chat.sendMessage('Processing complete!', {});

    // Return structured result
    return {
      success: true,
      result: completion.output_text,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});
```

## Build

Action blocks are bundled with webpack for deployment:

```bash
# Install dependencies
pnpm install

# Build the action block
npx webpack
```

The build produces a `dist/index.js` bundle, which is the `entryPoint` referenced in `actionblock.yml`.

## Invoking during development

Test your action block by calling it from an agent:

```ts
const result = await codebolt.actionBlock.start('my-action-block', {
  param1: 'value1',
  param2: 'value2',
});

if (result.success) {
  console.log('Result:', result.result);
} else {
  console.error('Error:', result.error);
}
```

## Development loop

1. Scaffold with `codebolt action actionblock create`
2. Implement the `onActionBlockInvocation` handler in `src/index.ts`
3. Define inputs/outputs in `actionblock.yml`
4. Build with `npx webpack`
5. Test by invoking from an agent with `codebolt.actionBlock.start()`
6. Iterate on the handler logic and rebuild
