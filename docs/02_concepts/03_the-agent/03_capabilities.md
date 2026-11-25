---
displayed_sidebar: getStartedSidebar
sidebar_position: 5
title: Capabilities
description: Discover a capability, identify its executor, and call it from an agent.
---

# Capabilities

A capability packages a named behavior that an agent can invoke. The capability describes the work. Its executor handles requests for that capability type.

## How a skill runs

1. Codebolt discovers a project capability under `.codebolt/capabilities/` or a capability installed globally. The registry reads its definition and identifies the type.
2. For a skill, the built-in **skill-executor** supports the `skill` type. It loads the skill’s `SKILL.md` and returns instructions for the agent loop.
3. The calling agent uses the result in its task.

The shipped skill executor declares its supported type and entry point in `executor.yaml`:

```yaml
name: skill-executor
version: 1.0.0
description: Loads SKILL.md capabilities and returns prompt instructions for the agent loop.
supportedTypes:
  - skill
entryPoint: dist/index.js
author: CodeBolt
```

Inside an agent handler you can inspect what the runtime has discovered:

```ts
const skills = await codebolt.capability.listCapabilitiesByType('skill');
const executors = await codebolt.capability.listExecutors();
```

To run a skill by name from the handler, pass the name you found in the list and the input that skill expects:

```ts
async function runInstalledSkill(name: string, inputs: Record<string, unknown>) {
  return codebolt.capability.startCapability(name, 'skill', inputs);
}
```

Open [Capabilities](../../02_using-codebolt/04b_agent-extensions/02_capabilities.md) for the desktop panel, a capability manifest example and invocation details. See [Executors](../../02_using-codebolt/04b_agent-extensions/05_executors.md) for how an executor maps to a capability type.
