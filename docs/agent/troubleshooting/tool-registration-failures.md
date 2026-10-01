---
title: Tool registration failures
description: Diagnose tools that are implemented but unavailable to agents.
kind: troubleshooting
audience:
  - agent
  - developer
tags:
  - troubleshooting
  - tool-registration
  - discovery
  - capability
relatedSkills:
  - codebolt.skill.create-custom-tool
  - codebolt.skill.debug-tool-call
---

# Tool registration failures

Use this record when a tool exists in code but does not appear in tool discovery or cannot be called by an agent.

## Checks

1. Confirm the tool definition has a stable name, description, and input schema.
2. Confirm the runtime handler is exported or registered in the expected registry.
3. Confirm the agent has access to the namespace, MCP server, or capability surface.
4. Confirm build output includes the changed file.
5. Restart or reload the runtime if discovery is cached.
6. Call the smallest valid input after the tool appears in discovery.

## Likely fixes

- Add the missing registry entry.
- Align the schema name with the handler name.
- Add the required permission or capability declaration.
- Rebuild generated assets or restart the process that hosts the tool.
