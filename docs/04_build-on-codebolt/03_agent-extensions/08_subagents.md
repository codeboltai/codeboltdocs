---
sidebar_position: 8
title: Subagents
description: A subagent is a child agent spawned by a parent agent to handle a sub-task
---

# Subagents

A **subagent** is a child agent spawned by a parent agent to handle a sub-task. Codebolt provides two distinct ways to start a sub-agent, depending on whether you want the child to run in the **same thread** or in a **new thread**.

## Two ways to start a sub-agent

### 1. Same thread — `codebolt.agent.startAgent()`

Starts a sub-agent within the current thread. The call **blocks** until the child finishes and returns a `TaskCompletionResponse`. The child shares the parent's thread context.

```ts
import codebolt from '@codebolt/codeboltjs';

// Start a sub-agent in the same thread (blocking)
const result = await codebolt.agent.startAgent('codebase-explorer', 'Find all usages of ComponentX');

if (result.success) {
  console.log('Agent completed:', result);
}
```

Use this when:
- The parent needs the result before proceeding.
- The sub-task is a focused operation within the current conversation.
- You don't need a separate thread or execution context.

### 2. New thread — `codebolt.thread.createAndStartThread()`

Creates a **new thread** with its own execution context and starts an agent in it. The child gets its own messages, file changes, and status �� fully isolated from the parent thread.

```ts
import codebolt from '@codebolt/codeboltjs';

// Create a new thread and start an agent in it (blocking until done)
const result = await codebolt.thread.createAndStartThread({
  agentId: 'code-reviewer',
  userMessage: 'Review the authentication module for security issues',
  parentId: currentThreadId,  // links to parent thread
  groupId: 'review-group',    // optional grouping
});

console.log('Thread started:', result.threadId);
```

### 3. Background thread — `codebolt.thread.createThreadInBackground()`

Same as above but **non-blocking** — resolves as soon as the agent starts (not when it finishes). The thread is tracked via `backgroundChildThreads`.

```ts
// Start agent in background thread (resolves when agent starts)
const response = await codebolt.thread.createThreadInBackground({
  agentId: 'dep-analyzer',
  userMessage: 'Analyze all dependencies for vulnerabilities',
  parentId: currentThreadId,
  groupId: 'analysis-group',
});

console.log('Agent started in thread:', response.threadId);
// Parent continues working while child runs in background
```

This also supports **remote environments** (see [Multi-Environment Orchestration](../08a_multi-environment-orchestration/01_overview.md) and [Creating a Custom Provider](../08a_multi-environment-orchestration/03_creating-a-custom-provider.md)):

```ts
const response = await codebolt.thread.createThreadInBackground({
  agentId: 'heavy-analyzer',
  userMessage: 'Run full codebase analysis',
  remoteEnv: true,                        // run in a remote sandbox environment
  environmentProvider: { id: 'sandbox' }, // sandbox provider for remote execution
  environmentName: 'analysis-env',        // optional custom name
});
```

## Same thread vs. new thread

| Aspect | Same Thread (`startAgent`) | New Thread (`createAndStartThread`) |
|---|---|---|
| **Execution context** | Shares parent's thread | Own thread with own context |
| **Blocking** | Yes — blocks until done | Yes (or non-blocking with `createThreadInBackground`) |
| **Messages** | Part of parent's conversation | Own message history |
| **File changes** | Tracked under parent thread | Tracked independently |
| **Remote environment** | No | Yes (`remoteEnv: true`) |
| **Use case** | Focused sub-task in current flow | Parallel/isolated work |

## Agent discovery

Before starting a sub-agent, you can discover available agents:

```ts
// Find an agent suitable for a task (uses vector DB matching)
const match = await codebolt.agent.findAgent('analyze code dependencies');

// List all downloaded agents
const agents = await codebolt.agent.getAgentsList();

// Get detailed info about specific agents
const details = await codebolt.agent.getAgentsDetail(['code-reviewer', 'dep-analyzer']);
```

## Automatic subagent handling in the agent framework

The agent framework's response executor automatically handles tool calls prefixed with `subagent--`. When the LLM calls a tool named `subagent--<agentId>`, the framework:

1. Parses the agent ID from the tool name.
2. Extracts the task from the tool arguments.
3. Calls `codebolt.agent.startAgent(agentId, task)` internally.
4. Returns the result back into the agent's reasoning loop.

This means agents can invoke sub-agents as if they were tools, without explicit `startAgent` calls.

## Parallel sub-agents with threads

Spawn multiple sub-agents in parallel using background threads:

```ts
const tasks = [
  { agentId: 'codemap-builder', task: 'Build codemap for src/' },
  { agentId: 'dep-analyzer', task: 'Analyze dependencies' },
  { agentId: 'test-scanner', task: 'Scan for test coverage gaps' },
];

const threads = await Promise.all(
  tasks.map(t => codebolt.thread.createThreadInBackground({
    agentId: t.agentId,
    userMessage: t.task,
    parentId: currentThreadId,
    groupId: 'parallel-analysis',
  }))
);

console.log('Started threads:', threads.map(t => t.threadId));
```

## Thread management

Once threads are created, you can manage them through the full thread API:

```ts
// List threads
const threads = await codebolt.thread.getThreadList({ parentId: currentThreadId });

// Get thread details
const detail = await codebolt.thread.getThreadDetail({ threadId });

// Get messages from a thread
const messages = await codebolt.thread.getThreadMessages({ threadId });

// Get file changes made by the agent in a thread
const changes = await codebolt.thread.getThreadFileChanges(threadId);

// Update thread status
await codebolt.thread.updateThreadStatus(threadId, 'completed');

// Delete a thread
await codebolt.thread.deleteThread(threadId);
```

## When to use what

| Need | Use |
|---|---|
| Focused sub-task, need result immediately | `codebolt.agent.startAgent()` |
| Isolated execution with own context | `codebolt.thread.createAndStartThread()` |
| Background/parallel work | `codebolt.thread.createThreadInBackground()` |
| One-shot operation, no reasoning needed | [Action Block](./05_action-blocks/01_overview.md) |
| Background side-task with inline code | [Side Execution](./07_side-execution.md) |

## Available tools for LLM agents

| Tool | Description |
|---|---|
| `AgentFindTool` | Find agents matching a task description |
| `AgentStartTool` | Start an agent with a task |
| `AgentListTool` | List all available agents |
| `AgentDetailsTool` | Get detailed info about specific agents |

## See also

- [Side Execution](./07_side-execution.md) — background work via action blocks or inline code
- [Action Blocks](./05_action-blocks/01_overview.md) — reusable operations without a full agent loop
- [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md) — patterns for coordinating multiple agents
