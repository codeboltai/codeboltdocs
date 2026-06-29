---
sidebar_position: 2
title: Agent Extension Loop
description: Extend a working agent with local code or server-registered capabilities, skills, tools, hooks, and action blocks
---

import AgentExtensionLoopDiagram from '@site/src/components/diagrams/AgentExtensionLoopDiagram';

# Agent Extension Loop

An agent extension loop is how you improve an existing agent without rebuilding it from scratch.

Start with a working agent, identify the missing behavior, add the smallest useful extension, run a real task, and refine until the workflow is reliable.

**Use case:** your agent already works, but it needs one more capability such as a domain-specific tool, a shared MCP tool, a reusable skill, a packaged action block, better prompt context, or policy around tool calls.

<AgentExtensionLoopDiagram />

## What you can add

Codebolt supports both agent-local extensions and server-registered extensions.

| Extension surface | What it adds |
|---|---|
| **Custom tools** | Local TypeScript actions registered directly in the agent with `createTool`. |
| **Message modifiers** | Context changes before the model is called. |
| **Pre-inference processors** | Message preparation, filtering, or compaction before inference. |
| **Post-inference processors** | Response inspection before tool execution. |
| **Pre-tool-call processors** | Parameter validation or adjustment before a tool runs. |
| **Post-tool-call processors** | Tool-result cleanup, history compaction, or follow-up behavior. |
| **MCP and local project tools** | Shared tools from MCP servers or `.codebolt/tools/`. |
| **Capabilities and skills** | Versioned, discoverable units of behavior that can be executed by name. |
| **Action blocks and side execution** | Isolated structured operations that can run alongside the main loop. |
| **Hooks** | Event-driven policy, approval, audit, rewrite, or automation around loop checkpoints. |
| **Context rule engines** | Automatic memory/context injection based on scope and input conditions. |
| **Subagents** | A separate agent loop for delegated work that needs its own reasoning state. |

## Choose the extension surface

| If the missing behavior is... | Use... |
|---|---|
| One project-specific typed action | A custom tool in the agent. |
| A tool that should be shared across agents or projects | An MCP server or local project tool. |
| Reusable cognitive task knowledge | A skill. |
| A versioned bundle of prompts, skills, tools, config, and optional hooks | A capability. |
| A structured operation with inputs and outputs | An action block. |
| Background or isolated work that may run outside the main loop | Side execution. |
| Prompt, tool, compaction, subprocess, or session policy | A hook. |
| Conditional memory or context assembly | A context rule engine. |
| Open-ended delegated reasoning | A subagent. |

## The loop

1. **Identify the missing behavior.** Name the concrete capability the current agent lacks.
2. **Pick the smallest extension surface.** Start local when the behavior is agent-specific; promote to server-backed when it should be shared, versioned, or triggered by runtime events.
3. **Define the schema or manifest.** Describe inputs, outputs, metadata, and the conditions that should trigger the extension.
4. **Wire or register it.** Add local tools/processors to the agent config, or register capabilities, skills, MCP tools, action blocks, hooks, and rules through their server-backed locations.
5. **Run a real task.** Use a prompt or workflow that should exercise the extension.
6. **Inspect behavior.** Check tool calls, capability/action-block results, hook history, side execution status, context assembly, and final output.
7. **Refine or promote.** Tighten schemas, descriptions, matchers, or prompts; move repeated local behavior into a shared extension when it becomes reusable.

## Local example

```ts
import { Agent, createTool } from '@codebolt/agent/unified';
import { ChatCompressionModifier } from '@codebolt/agent/processor-pieces';
import { z } from 'zod';

const projectPolicyTool = createTool({
  id: 'check_project_policy',
  description: 'Checks whether a requested action follows the project policy.',
  inputSchema: z.object({
    action: z.string(),
  }),
  execute: async ({ input }) => ({
    allowed: input.action !== 'delete-production-data',
  }),
});

const agent = new Agent({
  instructions: 'Help maintain this repository safely.',
  tools: [projectPolicyTool],
  preInferenceProcessors: [new ChatCompressionModifier()],
  maxTurns: 12,
});

const result = await agent.run('Check whether deleting production data is allowed.');
```

This keeps the extension local to the existing loop. The agent still prepares context, calls the model, runs tools, and observes results, but it now has one local tool and one SDK processor in the run.

## Server-backed example

```ts
import { Agent } from '@codebolt/agent/unified';
import { CapabilityContextModifier } from '@codebolt/agent/processor-pieces';

const agent = new Agent({
  instructions: 'Use selected Codebolt capabilities when they help the task.',
  messageModifiers: [
    new CapabilityContextModifier({ timeout: 30000 }),
  ],
  maxTurns: 12,
});

const result = await agent.run({
  userMessage: 'Apply the selected refactoring skill to this file.',
  selectedCapabilities: ['refactor-to-pattern'],
  mentionedFiles: ['src/handler.ts'],
  mentionedAgents: [],
  messageId: 'msg-refactor-1',
  threadId: 'thread-refactor-1',
});
```

This uses the agent SDK's `CapabilityContextModifier`. The modifier resolves selected capabilities through the server, auto-loads selected `skill` capabilities as prompt context, and leaves other capability types selected for explicit invocation when the task needs them.

## See also

- [Processor pattern](../../04_build-on-codebolt/02_creating-agents/06_patterns/processor-pattern.md)
- [What are processors?](../../04_build-on-codebolt/02_creating-agents/07_processors/01_what-are-processors.md)
- [Capabilities](../../04_build-on-codebolt/03_agent-extensions/02_capabilities/01_overview.md)
- [Skills](../../04_build-on-codebolt/03_agent-extensions/03_skills/01_overview.md)
- [MCP tools overview](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [Custom tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md)
- [Action blocks](../../04_build-on-codebolt/03_agent-extensions/05_action-blocks/01_overview.md)
- [Side execution](../../04_build-on-codebolt/03_agent-extensions/07_side-execution.md)
- [Subagents](../../04_build-on-codebolt/03_agent-extensions/08_subagents.md)
- [Hooks and processors](../../02_concepts/04_runtime/01_hooks-and-processors.md)
