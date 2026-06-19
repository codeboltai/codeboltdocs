---
sidebar_position: 2
sidebar_label: Managing Settings
title: Settings and Profiles
description: "Settings are layered across scopes. Profiles let you switch between pre-configured sets of settings quickly."
---

# Settings and Profiles

Settings are layered across scopes. Profiles let you switch between pre-configured sets of settings quickly.

## The four scopes

Settings resolve in this order (highest wins):

1. **Project** — `.codebolt/settings.yaml` in the project root
2. **Workspace** — your workspace-level preferences
3. **User** — your per-user defaults
4. **Server** — admin-set defaults on self-hosted instances

When the same setting is defined at multiple scopes, the higher one wins. This lets you have user defaults for everything, workspace overrides for certain projects, and project overrides for one-off specifics.

**Settings → Preferences** shows the merged view and marks where each value comes from.

## What's in settings

| Area | Examples |
|---|---|
| **Appearance** | Theme, font size, panel layout |
| **Editor** | Tab size, word wrap, auto-save, format-on-save |
| **Chat** | Default agent, default model, compression thresholds |
| **Agents** | Default tool allowlist, default limits |
| **Providers** | API keys, endpoints, fallback chains |
| **Guardrails** | Workspace-level rules |
| **Indexing** | What to include/exclude, codemap budget |
| **Memory** | Ingestion policy, retention |
| **Updates** | Channel, auto-update behaviour |
| **Telemetry** | Opt in/out |
| **Keyboard** | Shortcuts and bindings |

## Profiles

A **profile** is a named set of settings you can switch between. Use cases:

- **Personal vs work.** Different providers, different themes, different default agents.
- **High privacy mode.** All local models, no telemetry, aggressive redaction hooks.
- **Demo mode.** Read-only tools, safe defaults, no external calls.

Create a profile: **Settings → Profiles → New profile** → name it → save current settings to it.

Switch profiles: **Settings → Profiles → Activate** or command palette `Switch profile`.

Profiles apply at the **user** scope. Project and workspace settings still override the profile.

## Where settings live on disk

- **User:** `~/.codebolt/settings.yaml`
- **Workspace:** `~/.codebolt/workspaces/<workspace-id>/settings.yaml`
- **Project:** `<project>/.codebolt/settings.yaml`
- **Server:** `/etc/codebolt/codebolt-server.yaml`

Commit the project file to git so teammates share it. User and workspace files are per-machine.

## Example settings.yaml

```yaml
appearance:
  theme: dark
  font_size: 14

chat:
  default_agent: generalist
  default_model: claude-sonnet-4-6
  compression:
    threshold: 0.8

agents:
  default_limits:
    max_tool_calls: 100
    max_tokens: 200000
    max_cost_usd: 5.00

indexing:
  exclude:
    - "node_modules"
    - "dist"
    - ".next"
    - "generated"
  codemap_budget_tokens: 3000

memory:
  ingestion:
    enabled: true
    persistent_from_vector: top_k_5
  retention_days: 365
```

## Reset to defaults

**Settings → Reset** restores all settings at the current scope to defaults. Does not affect other scopes. Does not delete data (projects, memory, history).

## See also

- [Workspace and Projects](../01_workspace-and-projects/01_overview.md)
- [Environments](../04_environments/01_overview.md)
- [Themes](../05_themes.md)
