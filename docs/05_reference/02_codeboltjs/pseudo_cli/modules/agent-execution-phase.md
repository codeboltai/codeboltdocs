---
sidebar_label: "Agent Execution Phase"
title: "Agent Execution Phase Pseudo CLI"
description: "Pseudo CLI reference for the Agent Execution Phase module."
---

Generated from `packages/codeboltjs/src/tools/pseudo-cli/commands.ts`. Edit the registry or rerun `node scripts/generate-pseudo-cli-docs.js` instead of updating this file by hand.

The `agentExecutionPhase` pseudo CLI module currently exposes 3 commands. The same registry is also aliased as `agent-execution-phase`.

The phase catalog is **open vocabulary** — calling `set` with a previously unseen `--name` auto-adds it to `.codebolt/agentExecutionPhasesList.json`. See the [SDK docs](../../10_api-access/agentExecutionPhase/index.md) for the full module description.

## Commands At A Glance

| Action | Description | Required flags |
| --- | --- | --- |
| `set` | Set the calling agent's current execution phase on its thread (auto-adds to project catalog if new) | `--name` |
| `get` | Get the current execution phase (omit `--name` for the thread's current phase, pass `--name` to fetch a catalog entry) | None |
| `list` | List all phases in the project catalog | None |

## `set`

Set the calling agent's current execution phase on its thread (auto-adds to project catalog if new).

```text
codebolt agentExecutionPhase set --name <string> [--description <string>]
```

| Name | Flag | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `name` | `--name` | `string` | Yes | Phase name, e.g. `planning`, `coding`. Must match `^[a-z][a-z0-9_-]*$` (max 50 chars). |
| `description` | `--description` | `string` | No | Optional description, used only when the phase is being auto-added to the catalog. |

## `get`

Get the current execution phase (omit `--name` for the thread's current phase, pass `--name` to fetch a catalog entry).

```text
codebolt agentExecutionPhase get [--name <string>]
```

| Name | Flag | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `name` | `--name` | `string` | No | Catalog phase name to look up. Omit to read the calling thread's current phase. |

## `list`

List all phases in the project catalog.

```text
codebolt agentExecutionPhase list
```

This command takes no parameters.

## Examples

```text
# Tell the runtime the agent is now coding
codebolt agentExecutionPhase set --name coding

# Same thing using the kebab alias
codebolt agent-execution-phase set --name coding

# Auto-add a new phase with a description
codebolt agentExecutionPhase set --name debugging --description "Investigating the failing test"

# Read current phase
codebolt agentExecutionPhase get

# Look up a catalog entry
codebolt agentExecutionPhase get --name verification

# List everything seen so far
codebolt agentExecutionPhase list
```
