---
title: Minimal custom tool workflow
description: A compact implementation checklist for adding and validating a custom tool.
kind: examples
audience:
  - agent
  - developer
tags:
  - example
  - custom-tool
  - verification
relatedSkills:
  - codebolt.skill.create-custom-tool
relatedApiSymbols:
  - createTool
  - ToolSchema
---

# Minimal custom tool workflow

Use this example as a checklist when implementing a small custom tool.

## Workflow

1. Name the tool with a specific verb and object, such as `project_read_config`.
2. Write a one-sentence description that includes when the agent should use it.
3. Define the input schema with only the fields the handler needs.
4. Implement the handler and return a predictable JSON-compatible result.
5. Register the tool in the local registry or MCP server.
6. Run discovery and confirm the tool appears.
7. Call it with one valid input and one invalid input.

## Verification record

Capture these facts after implementation:

- Discovery result includes the tool name.
- Valid call result matches the documented output shape.
- Invalid call reports a schema or validation error.
- Any required permission is documented with the tool.
