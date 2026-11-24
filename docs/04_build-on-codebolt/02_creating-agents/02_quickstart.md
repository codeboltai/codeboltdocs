---
sidebar_position: 2
title: Create Your First Custom Agent
description: Create a Codebolt agent, give it instructions, and test its replies in Chat.
---

# Create Your First Custom Agent

Create a custom agent for your Codebolt project. You’ll choose what it should do, write the handler that runs when someone messages it, and test it in Chat.

Already created your custom agent? [Edit its message handler](#edit-typescript).

You’ll need Node.js, npm, and an open project with a model provider configured in Codebolt Desktop. [Set up Codebolt](../../01_get-started/03_quickstart.md).

<span id="part-2--framework-agent-level-1" />
<span id="create-an-agent-in-the-desktop-app" />

## 1. Create the agent in Desktop {#step-1--create-the-project}

In Chat, open the agent picker and select **Create Agent → Create Custom Agent**. Enter a name for your agent and select **Create Agent**. This guide uses `my-agent`. If you choose another name, use it in the paths and Chat picker below. Your agent’s files are in `.codebolt/agents/my-agent/`.

<details>
<summary>Create the same agent from the CLI</summary>

Run this command from your project root to create the agent.

```bash
codebolt action agent create --framework --name my-agent --path ./.codebolt/agents/my-agent
```

</details>

<details id="step-2--read-and-edit-the-generated-files">
<summary>What’s in the generated project?</summary>

| File | Purpose |
| --- | --- |
| `codeboltagent.yaml` | Sets the agent’s identity and title in the Chat picker. |
| `src/index.ts` | Contains the handler you’ll edit in the next step. |
| `package.json` | Lists the SDK dependencies, build script, and runtime entry point. |
| `tsconfig.json` | Configures the TypeScript build from `src` to `dist`. |

</details>

## 2. Define what your agent does {#edit-typescript}

Open `.codebolt/agents/my-agent/src/index.ts` and replace its contents with the handler below. Set `systemPrompt` to describe the task you want your agent to handle and what a useful response looks like. You can also keep the sample instructions for your first run.

```ts
import codebolt from '@codebolt/codeboltjs';
import { createAgent } from '@codebolt/agent/unified';
import type { FlatUserMessage } from '@codebolt/types/sdk';

const systemPrompt = 'Answer the user’s question in one sentence.';

const agent = createAgent({ systemPrompt });

codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const result = await agent.run(reqMessage);
  if (!result.success) {
    return result.error || 'Agent execution failed.';
  }
  return result.finalMessage || '';
});
```

`createAgent({ systemPrompt })` creates the agent with your instructions. `codebolt.onMessage` registers the handler Codebolt calls for each incoming Chat message. The handler passes the request to `agent.run` and returns the final reply or an error message.

## 3. Test it in Chat

From your project root, install the agent’s dependencies and build it.

```bash
cd .codebolt/agents/my-agent
npm install
npm run build
```

Open a new Chat tab, select **my-agent** in the agent picker, and send a request that matches the task you chose. If you kept the sample instructions, try “What is a unit test?” and check that the agent answers in one sentence.

## 4. Customize and test again

Edit `systemPrompt` in `src/index.ts` to refine the agent’s instructions. For example, ask it to include a concrete example in each answer. To change how incoming messages are processed, edit the `onMessage` handler.

Save the file and run `npm run build` from the agent folder. In a new Chat tab, select your agent and repeat your earlier request. Check the reply against your updated instructions.

## Next steps

- [Write and use a custom tool in your agent](./12_custom-agent-tools.md).
- [Write an echo handler that replies without a model](./03_agent-types/level-1-codeboltjs.md#try-a-handler-that-replies-without-a-model).
- [Customize an existing agent with Remix](./03_agent-types/level-3-remix.md#create-and-test-a-remix-in-desktop).
- [Register an agent from another folder or repository](./11_remote-agent.md).
- [Explore the unified agent and its configuration](./06_patterns/unified-agent.md#quick-start).
