---
sidebar_position: 1
title: codeboltagent.yaml
description: "Note: Earlier versions of this documentation referred to this file as agent.yaml. The actual config"
---

# codeboltagent.yaml

Every custom agent has a `codeboltagent.yaml` at its root. This file is the agent's manifest: identity, runtime, entry point, tool allowlist, inputs, outputs, limits, metadata. Understanding every field is the shortest path to understanding what an agent actually is.

> **Note:** Earlier versions of this documentation referred to this file as `agent.yaml`. The actual config
> file name is the codebase is `codeboltagent.yaml`.

> The CLI commands shown below (`codebolt agent validate`, `codebolt agent reload`) are planned and
> not yet available in the current flag-based CLI.

## Locations

| Where | Scope |
|---|---|
| `.codebolt/agents/<name>/codeboltagent.yaml` | Project-local agent |
| `~/.codebolt/agents/<name>/codeboltagent.yaml` | User-wide agent |
| Installed from marketplace | Under the server's agent storage directory |

## Minimal codeboltagent.yaml (remix)

```yaml
name: my-reviewer
version: 0.1.0
description: A stricter code reviewer.
remix_of: generalist
remix:
  system_prompt: |
    You review code for runtime bugs.
```

## Minimal codeboltagent.yaml (framework)
```yaml
name: my-planner
version: 0.1.0
description: Produces structured plans.
framework: true
entrypoint: index.ts
default_model: claude-sonnet-4-6
```

## Full reference
```yaml
# ── Identity ───────────────────────────────────────────
name: my-agent                    # required, unique within its scope
version: 0.1.0                    # semver; marketplace agents must bump it
description: One-line description.
author: your-name
license: MIT
tags: [reviewer, typescript]

# ── Kind ───────────────────────────────────────────────
# Exactly one of the following:
remix_of: generalist              # → this is a level-0 remix
framework: true                   # → this is a level-1/2 code agent
                                  # (framework: false means level-2 codeboltjs directly)
# ── Entry point (code agents only) ─────────────────────
entrypoint: index.ts              # relative to this file
runtime: node                     # node | binary | python | ...
# ── LLM defaults ───────────────────────────────────────
default_model: claude-sonnet-4-6
default_temperature: 0.2
default_max_tokens: 8000
# ── Tools ──────────────────────────────────────────────
tools:
  allow:
    - codebolt_fs.*               # glob patterns supported
    - codebolt_git.read_*
    - my_custom_server.search
  deny:
    - codebolt_fs.write_file      # deny takes precedence over allow
# ── Processors (optional, advanced) ────────────────────
processors:
  message_modifiers:
    - CoreSystemPromptModifier
    - DirectoryContextModifier
    - AtFileProcessorModifier
    - MyCustomRedactor            # from entrypoint
  tool_modifiers:
    - ToolValidationModifier
  response_modifiers: []
# ── Inputs / Outputs (for flow-callable agents) ────────
inputs:
  task:
    type: string
    required: true
    description: The task description
  constraints:
    type: array
    items: { type: string }
    required: false
outputs:
  result:
    type: object
    description: Structured result
# ── Limits ─────────────────────────────────────────────
limits:
  max_tool_calls: 100
  max_tokens: 200000             # total, across all calls in the run
  max_wall_time_seconds: 600
  max_cost_usd: 5.00             # enforced by budget tracking
  max_concurrent_children: 5     # for orchestrator agents
# ── Triggers (optional, for background agents) ─────────
triggers:
  - type: cron
    schedule: "0 9 * * 1"        # every Monday 9 AM
  - type: file_change
    pattern: "src/**/*.ts"
  - type: webhook
    path: /hooks/my-agent
# ── Remix block (remix agents only) ────────────────────
remix:
  system_prompt: |
    Your prompt override goes here.
  # Any field above can appear here and will override the parent.
# ── Metadata (optional) ────────────────────────────────
metadata:
  marketplace:
    icon: ./icon.png
    screenshots: [./ss1.png]
    readme: ./README.md
    categories: [code-review, typescript]
  requires:
    mcp_servers: ["linter-server"]
    capabilities: ["ts-analyzer"]
```
## Field-by-field
### `name`, `version`, `description`, `author`, `license`, `tags`
Standard package metadata. `name` must be unique within its scope. `version` must be valid semver. Marketplace agents must bump the version on every publish.
### `remix_of` vs `framework`
Mutually exclusive. Picks which kind of agent this is.

| Field | Meaning |
|---|---|
| `remix_of: <name>` | Level 0 — inherits from parent, override via `remix:` block |
| `framework: true` | Level 1 or 2 — runs your code through the agent framework |
| `framework: false` + `entrypoint` + `runtime` | Level 2 or 3 — server just spawns your entrypoint |
### `entrypoint`, `runtime`
Only for code agents. `entrypoint` is the path the server runs; `runtime` tells it how (node, binary, python, etc.).
### `default_model`, `default_temperature`, `default_max_tokens`
LLM defaults. Can be overridden per-call from inside the handler.
### `tools.allow`, `tools.deny`
Tool allowlist. Supports globs (`codebolt_fs.*`, `*.read_*`). `deny` always wins over `allow`. If `allow` is omitted, the agent inherits the project-default allowlist.
### `processors`
Optional. Lets you attach processors at specific slots in the loop. If you're using `CodeboltAgent` (see [Patterns](../06_patterns/overview.md)), the framework wires defaults for you.
### `inputs`, `outputs`
The agent's typed contract when called as a flow node or from another agent. Optional for chat-only agents. Validated at invocation time — a malformed input is rejected before the agent even starts.

### `limits`
Budget enforcement. Every limit is checked continuously during the run; exceeding any of them aborts the run with a structured reason. Setting sensible defaults here is one of the most effective guardrails you can add.
### `triggers`
For [background agents](../../07b_subsystems/01_agent-subsystem.md) that run on schedules or events instead of chat. Each trigger type is documented under its own page (cron, file-change, webhook).
### `remix` block
Only valid with `remix_of`. Every field you put inside `remix:` overrides the corresponding field from the parent. Deep-merged for nested objects (`tools`, `processors`), replaced for scalars.
### `metadata`
Optional. Marketplace-specific fields, declared dependencies on other extensions, icons and screenshots. Has no runtime effect — it's all presentation and dependency resolution.

## Validation
The server validates `codeboltagent.yaml` on load.
 Checks:
- Required fields present.
- `remix_of` parent exists.
- `entrypoint` file exists.
- Tool globs match at least one real tool.
- `inputs` / `outputs` schemas are valid JSON Schema.
- `limits` values are sane.
- `processors` names resolve.
A validation failure prevents the agent from being loaded at all — the server will refuse to spawn it.
## Versioning and updates
When the server loads an agent, it caches the manifest. After editing `codeboltagent.yaml`, reload by restarting the server. Marketplace agents are versioned — installing a new version is a separate manifest under the new version directory, and switching versions is explicit.
## See also
- [Lifecycle](./lifecycle.md) — what happens after the manifest is loaded
- [Context](./context.md) — the working state the handler sees
- [Level 0 — Remix](../03_creation-levels/level-0-remix.md)
- [Level 1 — Framework](../03_creation-levels/level-1-framework.md)
- [Publishing](../10_publishing.md)
