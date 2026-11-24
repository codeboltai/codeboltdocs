---
sidebar_position: 3
title: Hooks and Action Blocks
description: Hooks and action blocks are the event-driven layer of Codebolt's memory system. Hooks watch for lifecycle events and fire automatically
---

# Hooks and Action Blocks

Hooks and action blocks are the event-driven layer of Codebolt's memory system. **Hooks** watch for lifecycle events and fire automatically. **Action blocks** are the modular code units that hooks (and ingestion pipelines) execute. Together they let you build memory automation that runs without an agent prompt.

## Action blocks

An action block is a self-contained code module with a defined entry point. It connects to the Codebolt server over WebSocket like an agent, but it executes a specific task and returns — it doesn't run a full LLM loop.

Action blocks are the recommended way to encapsulate custom memory logic that:
- needs to be reused across multiple hooks or ingestion pipelines
- is too complex for inline code
- needs its own configuration, dependencies, or tests

### Where action blocks live

| Source | Location | Scope |
|---|---|---|
| **Project** | `.codebolt/actionblocks/<name>/` | Available only to this project |
| **Global** | `~/.codebolt/actionblocks/<name>/` | Available to all projects on this machine |
| **Built-in** | Provided by Codebolt | Always available |

### Structure

```
.codebolt/actionblocks/memory-summarizer/
├── actionblock.yaml      ← manifest
├── index.js              ← entry point
└── package.json
```

**`actionblock.yaml`:**

```yaml
name: memory-summarizer
description: Summarizes episodic memory into a markdown note
version: 1.0.0
entryPoint: index.js
metadata:
  author: your-name
  tags: [memory, summarization]
  inputs:
    - name: memoryId
      type: string
      required: true
  outputs:
    - name: summary
      type: string
```

**`index.js`:**

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params }) => {
  const { memoryId } = params;
  const response = await codebolt.episodicMemory.queryEvents({ memoryId, lastMinutes: 60 });
  if (!response.success || !response.data) throw new Error('Could not read episodic events');
  const { completion } = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user',
      content: 'Summarize these events as Markdown: ' + JSON.stringify(response.data.events) }],
  });
  if (!completion.output_text) throw new Error('The model returned no summary');
  return { summary: completion.output_text };
});
```

### Calling an action block from an agent

```typescript
const response = await codebolt.actionBlock.start('memory-summarizer', { memoryId }, {
  waitForCompletion: true,
});
if (!response.success) throw new Error(response.error || 'Summarization failed');
console.log(response.result);
```

## Hooks

Hooks listen for lifecycle events and automatically run an action when one fires. They are JSON files stored in `.codebolt/hooks/` with a `.hook` extension.

### Trigger types

| Trigger | Fires when… |
|---|---|
| `fileCreated` | A file is created in the project |
| `fileUpdated` | A file is modified |
| `fileDeleted` | A file is deleted |
| `gitCommit` | A commit is made |
| `gitPush` | Code is pushed to a remote |
| `threadCreated` | A new chat thread is opened |
| `threadCompleted` | A chat thread ends |
| `agentStarted` | An agent begins execution |
| `agentCompleted` | An agent finishes |

### Hook structure

```json
{
  "name": "summarize-on-thread-end",
  "description": "Summarize the conversation when a thread completes",
  "enabled": true,
  "version": "1.0.0",
  "when": {
    "type": "threadCompleted",
    "creatorFilter": "any",
    "agentTypeFilter": "main"
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "memory-summarizer"
  }
}
```

### Action types

| Action type | What it does |
|---|---|
| `runAgent` | Launches an agent with an instruction |
| `runActionBlock` | Executes an action block |
| `runCommand` | Runs a shell command |
| `sendToGateway` | Routes a message through the chat gateway |

#### `runAgent`

```json
{
  "then": {
    "type": "runAgent",
    "agentId": "memory-optimizer-agent",
    "instruction": "Compact episodic memory for the completed thread.",
    "runInSameThread": false
  }
}
```

#### `runActionBlock`

```json
{
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "memory-summarizer"
  }
}
```

#### `runCommand`

```json
{
  "then": {
    "type": "runCommand",
    "command": "node .codebolt/scripts/prune-old-vectors.js"
  }
}
```

### Filtering triggers

**File pattern filter** (only fire when specific files change):

```json
{
  "when": {
    "type": "fileUpdated",
    "patterns": ["src/services/**/*.ts", "src/models/**/*.ts"]
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "code-entity-extractor"
  }
}
```

**Git branch filter** (only fire on specific branches):

```json
{
  "when": {
    "type": "gitCommit",
    "branches": ["main", "release/*"]
  }
}
```

**Creator filter** (only fire when a human, not an agent, takes the action):

```json
{
  "when": {
    "type": "fileUpdated",
    "creatorFilter": "user"
  }
}
```

**Agent type filter** (only fire for main agents, not sub-agents):

```json
{
  "when": {
    "type": "agentCompleted",
    "agentTypeFilter": "main"
  }
}
```

### Memory-focused hook patterns

#### Embed code changes on commit

```json
{
  "name": "embed-code-on-commit",
  "enabled": true,
  "when": {
    "type": "gitCommit",
    "creatorFilter": "any"
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "diff-embedder"
  }
}
```

The `diff-embedder` action block reads the git diff, chunks it, and writes embeddings to the vector store — so future agents can recall "how did we implement X?" semantically.

#### Summarize episodic memory at session end

```json
{
  "name": "session-memory-summary",
  "enabled": true,
  "when": {
    "type": "threadCompleted",
    "agentTypeFilter": "main"
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "memory-summarizer"
  }
}
```

#### Update knowledge graph on source file change

```json
{
  "name": "sync-kg-on-service-change",
  "enabled": true,
  "when": {
    "type": "fileUpdated",
    "patterns": ["src/services/**/*.ts"],
    "creatorFilter": "any"
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "ts-entity-extractor"
  }
}
```

### Managing hooks via the SDK

Hooks can also be created and managed programmatically from an agent:

```typescript
// List all hooks
const hooks = await codebolt.hooks.list();

// Create a hook
await codebolt.hooks.create({
  name: 'prune-on-push',
  enabled: true,
  when: { type: 'gitPush' },
  then: { type: 'runActionBlock', actionBlockId: 'vector-pruner' }
});

// Enable / disable
await codebolt.hooks.enable('prune-on-push');
await codebolt.hooks.disable('prune-on-push');
```

---

## Hook → action block → memory: the full flow

```
lifecycle event fires
  ↓
HookManager matches event to hook(s)
  ↓
HookExecutor runs the action
  │
  ├─ runActionBlock → ActionBlock executes
  │     ↓ reads/writes via SDK
  │     └─ memory store updated
  │
  ├─ runAgent → Agent runs with instruction
  │     ↓ may call memoryIngestion.execute() etc.
  │     └─ memory store updated
  │
  └─ runCommand → shell script executes
        ↓ may call Codebolt CLI
        └─ memory store updated
```

This flow means memory is kept current without any user prompt. Agents that start a new session find the knowledge graph, vector store, and KV state already reflecting the latest project activity.

## See also

- [Memory Ingestion](./02f_memory-ingestion.md) — ingestion pipelines and processor types
- [Runtime memory APIs](./02_runtime-memory-apis.md) — SDK reference for all memory operations
