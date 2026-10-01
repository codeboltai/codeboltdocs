---
title: Use MCP tools
id: codebolt.skill.use-mcp-tools
summary: Discover, validate, and call MCP tools safely inside Codebolt workflows.
kind: skill
audience:
  - agent
  - developer
tags:
  - mcp
  - tools
  - integrations
  - schema
triggers:
  - use mcp
  - mcp server
  - connector
  - external tool
required_docs:
  - /llms/concepts/the-agent/tools-and-mcp.md
  - /llms/build-on-codebolt/agent-extensions/mcp-tools/overview.md
relatedApiSymbols:
  - MCP
  - tools/list
  - tools/call
---

# Use MCP tools

Use this skill when a task requires an external tool, connector, or MCP server.

## Procedure

1. Discover available MCP servers before assuming a tool exists.
2. List tools for the relevant server and inspect the input schema.
3. Choose the smallest tool that satisfies the task.
4. Prepare arguments that exactly match the schema.
5. Make a low-risk call first when the tool has side effects.
6. Handle permission, auth, and schema errors separately.
7. Record the tool result and cite it in the final work summary when it informed a decision.

## Common failure modes

- Tool name is guessed instead of discovered.
- Arguments use natural language instead of schema fields.
- Auth failure is mistaken for missing functionality.
- A side-effecting call is made before validating inputs.

## Verification

- Server and tool were discovered.
- Input schema was followed.
- Tool result was checked before dependent work continued.
