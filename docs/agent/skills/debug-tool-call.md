---
title: Debug a failed tool call
id: codebolt.skill.debug-tool-call
summary: Diagnose schema, registration, runtime, permission, and integration failures in Codebolt tool calls.
kind: skill
audience:
  - agent
  - developer
tags:
  - troubleshooting
  - tool-call
  - schema-error
  - permissions
  - registration
triggers:
  - failed tool call
  - tool error
  - schema mismatch
  - tool not found
required_docs:
  - /llms/concepts/the-agent/tools-and-mcp.md
relatedApiSymbols:
  - ToolDefinition
  - ToolSchema
---

# Debug a failed tool call

Use this skill when a Codebolt, custom, or MCP tool fails during discovery, validation, execution, or result handling.

## Procedure

1. Identify the failure stage: discovery, schema validation, permission, runtime handler, external service, or result parsing.
2. Compare the call arguments with the tool schema.
3. Confirm the tool is registered in the expected namespace or server.
4. Check whether the current agent has permission to call it.
5. Inspect logs or error payloads from the handler.
6. Reproduce with the smallest valid call.
7. Patch the schema, registration, permissions, or handler depending on the confirmed failure stage.

## Common failure modes

- Tool is implemented but absent from discovery.
- Required field is missing or has the wrong type.
- Handler throws because it assumes optional data is present.
- Permission or auth failure is reported as a generic execution error.
- Result shape differs from what the caller expects.

## Verification

- The failing call now succeeds or fails with a clearer expected error.
- A minimal regression check exists for the repaired path.
- The agent-facing description and schema still match the handler behavior.
