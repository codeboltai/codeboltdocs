---
sidebar_position: 2
title: Agent Extension Loop
description: Extend an agent with tools, MCP, message modifiers, and processors
---

import AgentExtensionLoopDiagram from '@site/src/components/diagrams/AgentExtensionLoopDiagram';

# Agent Extension Loop

An agent extension loop is how you improve an existing agent without rebuilding it from scratch.

Start with a working agent, add one focused extension, test it, and refine until the agent handles the new workflow reliably.

**Use case:** your agent already works, but it needs one more capability such as a domain-specific tool, a shared MCP tool, better prompt context, or validation around tool calls.

<AgentExtensionLoopDiagram />

## What you can add

Codebolt agents can be extended in a few common ways:

- **Custom tools:** add local TypeScript tools with `createTool` when the agent needs a new project-specific action.
- **MCP tools:** use MCP when the tool should be shared across agents, projects, or runtimes.
- **Message modifiers:** change what context goes into the prompt before the model is called.
- **Pre-inference processors:** prepare or compress the message before inference.
- **Post-inference processors:** inspect the model response before tool execution.
- **Pre-tool-call processors:** validate or adjust tool parameters before a tool runs.
- **Post-tool-call processors:** process tool results, compact history, or add follow-up behavior.

## The loop

1. **Pick one extension point.** Add the smallest thing that gives the agent the missing capability.
2. **Wire it into the agent.** Register tools in `tools`, MCP tools through the MCP layer, and processors through the `processors` configuration.
3. **Run a real task.** Use a prompt that should trigger the new behavior.
4. **Inspect the result.** Check whether the agent saw the right context, selected the right tool, and passed valid parameters.
5. **Refine and test again.** Adjust the tool schema, prompt context, or processor logic until the workflow is reliable.

## Example

```ts
import { createCodeboltAgent, createTool, ToolValidationModifier } from '@codebolt/agent/unified';
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

const agent = createCodeboltAgent({
  systemPrompt: 'Help maintain this repository safely.',
  tools: [projectPolicyTool],
  preToolCallProcessors: [new ToolValidationModifier()],
  maxTurns: 12,
});
```

This keeps the extension local to the existing loop. The agent still prepares context, calls the model, runs tools, and observes results, but it now has one new capability and validation around tool calls.

## See also

- [Processor pattern](../../04_build-on-codebolt/02_creating-agents/06_patterns/processor-pattern.md)
- [What are processors?](../../04_build-on-codebolt/02_creating-agents/07_processors/01_what-are-processors.md)
- [MCP tools overview](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [Custom tools](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/04_custom-tools.md)
