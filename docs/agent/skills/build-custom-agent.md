---
title: Build a custom Codebolt agent
id: codebolt.skill.build-custom-agent
summary: Create, configure, test, and package a custom Codebolt agent.
kind: skill
audience:
  - agent
  - developer
tags:
  - custom-agent
  - codeboltagent
  - instructions
  - runtime
triggers:
  - build custom agent
  - create agent
  - codeboltagent.yaml
  - agent instructions
required_docs:
  - /llms/build-on-codebolt/creating-agents/overview.md
  - /llms/concepts/the-agent/agents.md
relatedApiSymbols:
  - createAgent
  - codeboltagent.yaml
---

# Build a custom Codebolt agent

Use this skill when the user asks to create, modify, package, or debug a custom Codebolt agent.

## Inputs to collect

- Agent purpose and target users.
- Required tools, MCP servers, and permissions.
- Runtime language and entry point.
- Agent instructions and behavior constraints.
- Verification command or expected demo task.

## Procedure

1. Read the nearest existing agent and the current agent creation docs.
2. Define the agent identity, description, instructions, and allowed tools.
3. Create or update the agent manifest and runtime entry point.
4. Keep instructions procedural, testable, and scoped to the agent purpose.
5. Add any tool or MCP dependencies explicitly.
6. Run manifest validation or build checks available in the project.
7. Start the agent with a minimal task and confirm it can use its required tools.

## Common failure modes

- Agent manifest exists but is not discoverable by the runtime.
- Instructions mention tools that are not registered or allowed.
- The agent can start but has no verification workflow.
- The description is too vague for agent selection.

## Verification

- Agent appears in discovery or marketplace listing.
- Agent starts without runtime errors.
- Agent completes a small task using its expected tools.
- Build, typecheck, or package command passes.
