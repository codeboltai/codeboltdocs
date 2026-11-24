---
title: Write a Custom Agent Tool
description: Define a tool, register it with a Codebolt agent, and test it in Chat.
---

# Write a Custom Agent Tool

A tool gives your agent a function it can call from Chat. In this walkthrough, you’ll add a word counter to an existing agent. You can follow the same steps with your own function.

## Write the tool

Start in your agent’s folder, the one containing its `package.json`. If you need an agent first, follow the [custom agent quickstart](./02_quickstart.md).

Install Zod so the tool can validate its input and output.

```bash
npm install zod@3
```

Create `src/count-words.ts` and add the following code.

```ts
import { createTool } from '@codebolt/agent/unified';
import { z } from 'zod';

export const countWords = createTool({
  id: 'count_words',
  description: 'Count the words in the supplied text, using whitespace to separate words.',
  inputSchema: z.object({ text: z.string() }),
  outputSchema: z.object({ count: z.number().int() }),
  execute: ({ input }) => {
    const words = input.text.match(/\S+/g) ?? [];
    return { count: words.length };
  },
});
```

The model uses the description and input schema to decide when to call the tool and which arguments to send. The SDK validates the input before calling `execute` and checks the returned value when you supply an `outputSchema`.

## Register and use the tool

In `src/index.ts`, add this import alongside your other imports.

```ts
import { countWords } from './count-words';
```

Replace the quickstart’s `createAgent({ systemPrompt })` call with the following definition. Keep your existing `systemPrompt` and `codebolt.onMessage` handler.

```ts
const agent = createAgent({
  systemPrompt,
  tools: [countWords],
});
```

With the default configuration, the agent can call `count_words` alongside the Codebolt tools available to it. If you set a nonempty `allowedTools` list, include `count_words` and the names of the built-in tools you want the model to use.

## Test it in Chat

1. Run `npm run build` from the agent folder.
2. Open a new Chat tab in Codebolt and select your agent.
3. Send this request: **Use the count_words tool to count the words in “Build a custom agent”.**

The tool returns `{"count":4}`. The agent can phrase the reply in its own words. To check the function separately, call it directly in an async test:

```ts
const outcome = await countWords.execute({ text: 'Build a custom agent' }, {});
// Expected: { success: true, result: { count: 4 } }
```

## Modify the tool

To return a character count as well, add `characters: z.number().int()` to the output schema and return `{ count: words.length, characters: input.text.length }` from `execute`. Update the description to mention both counts. Rebuild and ask the agent to use `count_words` on “Build a custom agent” again. The updated tool should return `{"count":4,"characters":20}`.

For tools provided by an MCP server, see [Connect a local MCP server](../03_agent-extensions/04_mcp-tools/02_quickstart-local-mcp.md).
