---
sidebar_position: 6
title: Hooks and Processors
description: Choose a project hook for a runtime event or an Agent SDK processor for a stage of a framework agent.
---

import HookPhases from '@site/src/components/diagrams/HookPhases';

# Hooks and Processors

Use a project hook when you want Codebolt to run a handler at a supported runtime event. Use a processor when you are writing a framework agent and want to change how that agent handles a model call or tool request.

## Project hooks

For example, a `preToolUse` hook can inspect a requested tool before it runs. A `postToolUse` hook receives its outcome. Other supported events include `userPromptSubmit`, `agentSessionStart`, `agentSessionEnd`, and the compaction and subprocess events.

<HookPhases />

Open **Agents → Hooks** to create a handler and test it with sample input. See [Hooks](../../02_using-codebolt/08d_auto-interactivity/04_hooks.md) for the complete event list and [Write a Simple Hook](../../03_guides/05_mcp-and-tools/write-a-simple-hook.md) for a working example.

## Framework processors

In `createAgent`, register processors in the slot for the work they perform. Use `preInferenceProcessors` or `postInferenceProcessors` around a model call, and `preToolCallProcessors` or `postToolCallProcessors` around a tool call. For example, a post-tool processor can inspect the result before the agent continues.

See [Processors](../../04_build-on-codebolt/02_creating-agents/07_processors/01_what-are-processors.md) for the framework interfaces. For project and thread tool permissions, see [Guardrails](../06_quality/01_guardrails.md).
