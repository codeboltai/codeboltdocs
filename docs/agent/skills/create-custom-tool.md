---
title: Create a custom Codebolt tool
id: codebolt.skill.create-custom-tool
summary: Create, register, test, and debug a custom Codebolt tool or capability.
kind: skill
audience:
  - agent
  - developer
tags:
  - custom-tool
  - capability
  - schema
  - processor
  - registration
triggers:
  - create tool
  - custom tool
  - add capability
  - tool schema
required_docs:
  - /llms/build-on-codebolt/agent-extensions/mcp-tools/overview.md
  - /llms/concepts/the-agent/tools-and-mcp.md
relatedApiSymbols:
  - ToolDefinition
  - ToolSchema
  - createTool
---

# Create a custom Codebolt tool

Use this skill when adding, modifying, registering, or debugging an agent-facing tool.

## Inputs to collect

- Tool name and namespace.
- Natural language purpose.
- Input schema and required fields.
- Output shape and error behavior.
- Runtime handler location.
- Permissions and side effects.

## Procedure

1. Search for an existing similar tool and follow its local pattern.
2. Define the input schema before writing handler logic.
3. Write a precise tool description that tells an agent when to use the tool.
4. Implement the runtime handler with validation and useful error messages.
5. Register the tool in the same registry or capability surface used by nearby tools.
6. Add or update tests, examples, or smoke checks.
7. Exercise the tool with the smallest valid input and one invalid input.

## Common failure modes

- Handler is implemented but not registered.
- Schema and handler drift apart.
- Tool description is too generic for reliable discovery.
- Required permissions are missing.
- Error responses hide the real failure source.

## Verification

- Tool appears in discovery.
- Valid input reaches the handler and returns the documented output shape.
- Invalid input fails with a schema or validation error.
- The agent can decide when to use the tool from its description.
