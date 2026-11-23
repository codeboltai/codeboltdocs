---
sidebar_position: 1
title: Agent Framework
---

# Agent Framework Reference

The `@codebolt/agent` package is the framework agents run on top of. It provides the agent loop, processor pipeline, tool system, and conversation management — everything that makes an agent tick.

## Package Exports

The framework currently ships two sub-path exports:

| Export | Import | What it provides |
|---|---|---|
| **Unified** | `@codebolt/agent/unified` | Core agent classes: `CodeboltAgent`, `Agent`, `AgentStep`, `ResponseExecutor`, `InitialPromptGenerator`, `Tool`, `Workflow`, loop detection, compaction services |
| **Processor Pieces** | `@codebolt/agent/processor-pieces` | Reusable message modifiers and processors for the agent pipeline |

## Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';
import { CodeboltAgent } from '@codebolt/agent/unified';
import { FlatUserMessage } from '@codebolt/types/sdk';

const agent = new CodeboltAgent({
  instructions: 'You are a helpful coding assistant.',
  enableLogging: true,
});

codebolt.onMessage(async (reqMessage: FlatUserMessage) => {
  const result = await agent.processMessage(reqMessage);

  if (!result.success) {
    throw new Error(result.error ?? 'Agent failed');
  }

  return result.finalMessage;
});
```

## What's in this section

| Section | What it covers |
|---|---|
| [Type Reference](./type-reference/) | Full TypeScript types — agent classes, processor pipeline, team coordination |

## See also

- [codeboltjs Reference](../02_codeboltjs/01_overview.md) — `ctx.*` API methods agents call
- [Creating Agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md) — authoring guide
- [Level 1 — Framework](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md) — how to build agents with the framework
- [Processors](../../04_build-on-codebolt/02_creating-agents/07_processors/01_what-are-processors.md) — processor pipeline docs
- [Plugin SDK](../03_plugin-sdk/01_overview.md) — extending the Codebolt app
