---
sidebar_position: 1
title: Codebolt CLI
---

# Codebolt CLI Reference

The `codebolt` CLI is the command-line interface for running the CodeBolt server, launching the TUI, executing headless prompts, scaffolding extensions, and talking to a running server over the command bridge.

This reference is based on the source in `packages/cli/src`.

## What's In This Section

| Section | What it covers |
|---|---|
| [Root Command](./02_root-command.md) | Top-level `codebolt` options, runtime modes, and the top-level command groups |
| [Action Commands](./actions/index.md) | `codebolt action ...` for creating, publishing, and listing extensions |
| [Gateway Commands](./commands/index.md) | `codebolt command ...` for registered gateway tools |

## CLI Surfaces

| Surface | Purpose |
|---|---|
| `codebolt` | Start the server, launch the TUI, connect to an existing server, or run a headless prompt |
| `codebolt action ...` | Manage extension types like agents, tools, plugins, skills, capabilities, executors, and action blocks |
| `codebolt mcp start` | Expose CodeBolt tools to an MCP client |
| `codebolt command ...` | Connect to a running CodeBolt server and execute server-backed command modules |

## Implementation Notes

- The root CLI is defined in `packages/cli/src/index.ts`.
- `codebolt action ...` is built from `packages/cli/src/actions/*.ts`.
- `codebolt command ...` registers tools from the generated gateway command registry.
- The `codebolt action ...` flow starts a temporary local server context via `executeAction()` before calling extension endpoints.
- The `codebolt command ...` flow expects a running server and accepts `--cli-connect-port`, `--host`, and `--json` from `codebolt command`.

## See Also

- [codeboltjs Reference](../02_codeboltjs/01_overview.md) — agent SDK reference
- [Agent Framework Reference](../05_agent-framework/01_overview.md) — runtime/framework internals
