---
title: Codebolt Agent Manual
description: Agent-oriented manual for finding and applying Codebolt documentation.
kind: manual
audience:
  - agent
  - developer
tags:
  - agent-manual
  - documentation-discovery
  - codebolt
  - tools
  - agents
  - mcp
  - execution-plans
relatedSkills:
  - codebolt.skill.build-custom-agent
  - codebolt.skill.create-custom-tool
  - codebolt.skill.use-execution-plans
  - codebolt.skill.use-mcp-tools
  - codebolt.skill.debug-tool-call
---

# Codebolt Agent Manual

Use this manual as the first routing document when an agent needs to understand Codebolt, choose the right documentation, or complete a repeatable Codebolt workflow.

## How to use this manual

1. Match the user request to a topic below.
2. Load the matching skill when the task is procedural.
3. Search product docs for concepts and workflow details.
4. Search API reference only when exact methods, schemas, or TypeScript declarations are needed.
5. Verify behavior with the local project and relevant tests before claiming completion.

## Find by topic

- `agent`, `custom agent`, `codeboltagent.yaml`, `instructions`: use the build custom agent skill and the Build on Codebolt agent docs.
- `tool`, `custom tool`, `capability`, `processor`, `schema`: use the create custom tool skill and tool/capability docs.
- `execution plan`, `plan`, `task lifecycle`, `delegation`: use the execution plans skill and planning docs.
- `MCP`, `server`, `connector`, `external tool`: use the MCP tools skill and MCP integration docs.
- `failed tool call`, `schema error`, `permission`, `registration`: use the debug tool call skill and troubleshooting records.
- `SDK`, `codeboltjs`, `client-sdk`, `type`, `interface`: search API reference and TypeScript declarations.
- `environment`, `sandbox`, `remote`, `background work`: search environment and multi-agent orchestration docs.

## Codebolt mental model

Codebolt is an AI-native coding environment with agents, tools, MCP integrations, project memory, execution plans, environments, and SDK APIs. Agents should treat documentation as layered:

- Manual: compact routing and safe operating guidance.
- Skills: procedural instructions for repeatable work.
- Product docs: conceptual and workflow documentation.
- API reference: exact symbols, schemas, signatures, and types.
- Examples and troubleshooting: known-good patterns and repair guidance.

## Tool and capability work

When creating or changing a tool, always check both the workflow docs and the exact API or schema definitions. A tool is not complete until its schema, handler, registration path, and agent-facing description all agree.

## Multi-agent and execution work

Use execution plans for complex work that benefits from explicit tasks, lifecycle state, retries, or delegation. Keep task ownership clear, mark progress explicitly, and verify returned work before merging or closing a task.

## MCP and integrations

For MCP work, discover servers and tools before using them. Validate input schemas, handle permission failures, and prefer small test calls before relying on an integration in a larger workflow.

## Safety and verification

- Do not guess Codebolt APIs from names alone.
- Prefer current docs and generated type reference over memory.
- Preserve user changes in the workspace.
- Verify registration, discovery, and execution for tools or agents.
- Cite the source docs or record ids used for non-trivial implementation decisions.

## Source documentation index

Search these sections for deeper details:

- Get Started: product overview and setup.
- Using Codebolt: application workflows.
- Concepts: agents, tools, memory, planning, quality, and orchestration.
- Guides: task-focused walkthroughs.
- Build on Codebolt: extension and runtime documentation.
- Reference: SDK, API, type, event, and MCP reference.
