---
sidebar_position: 3
title: Hooks and Action Blocks
description: Hooks and action blocks are the event-driven layer of Codebolt's memory system. Hooks watch for lifecycle events and fire automatically
---

# Hooks and Action Blocks

Use a session hook to run a custom action block when an agent finishes. This example reads recent events from an episodic memory you choose and saves a Markdown summary.

## Action blocks

[Create an action block](../03_agent-extensions/05_action-blocks/03_authoring.md) named `memory-summarizer`. Put this handler in its entry point and build the block. It needs a configured inference provider and an episodic memory containing events.

**`index.js`:**

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params }) => {
  const { memoryId, noteId, serverUrl } = params;
  const response = await codebolt.episodicMemory.queryEvents({ memoryId, lastMinutes: 60 });
  if (!response.success || !response.data) throw new Error('Could not read episodic events');
  const { completion } = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user',
      content: 'Summarize these events as Markdown: ' + JSON.stringify(response.data.events) }],
  });
  if (!completion.output_text) throw new Error('The model returned no summary');
  const saved = await fetch(serverUrl + '/memories/markdown/threads/' + encodeURIComponent(noteId) + '/content', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: completion.output_text }),
  });
  if (!saved.ok) throw new Error(await saved.text());
  return { summary: completion.output_text };
});
```

### Calling an action block from an agent

Use the registered block ID, an episodic memory ID, your server URL, and the ID of an existing [Markdown thread](./02_runtime-memory-apis.md). Use a dedicated note because each run replaces its contents.

```typescript
const response = await codebolt.actionBlock.start(actionBlockId, { memoryId, noteId, serverUrl }, {
  waitForCompletion: true,
});
if (!response.success) throw new Error(response.error || 'Summarization failed');
console.log(response.result);
```

## Hooks

Open **Agents → Hooks** or create a `.hook` file under `.codebolt/hooks/`. Set the IDs and server address to the same values you used when testing the block.

```json
{
  "name": "Save session summary",
  "enabled": true,
  "event": "agentSessionEnd",
  "handler": {
    "type": "actionBlock",
    "actionBlockId": "YOUR_ACTION_BLOCK_ID",
    "inputs": {
      "memoryId": "YOUR_EPISODIC_MEMORY_ID",
      "noteId": "YOUR_MARKDOWN_THREAD_ID",
      "serverUrl": "http://localhost:2719"
    }
  }
}
```

The hook passes the lifecycle event to the block as `params.hookInput` and the configured memory ID as `params.memoryId`. With this configuration, each invocation reads the same episodic memory. To summarize different memories by session, have your agent pass the corresponding ID when it calls the block directly.

Inspect the invocation in **Agents → Hooks** and check the saved Markdown note. See [Hooks](../../02_using-codebolt/08d_auto-interactivity/04_hooks.md) for supported events and matchers.
