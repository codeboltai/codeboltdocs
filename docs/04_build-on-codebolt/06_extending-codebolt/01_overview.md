---
sidebar_position: 1
title: Extending Codebolt
description: Choose a plugin, model provider, or execution backend for your Codebolt project.
---

# Extending Codebolt

Choose the workflow based on what you want to add to Codebolt.

| What you want to do | Where to start |
| --- | --- |
| Add a command or respond to an application event | [Create a plugin](../05_plugins/01_overview.md). Register a [custom command](./05_custom-commands.md) on startup. |
| Make a model available to agents | [Build an LLM provider](./03_build-your-first-llm-provider.md). Register a model, configure its endpoint, and test a reply. |
| Run an agent in a different environment | [Build an execution backend](./07_build-your-first-execution-backend.md). Resolve the workspace and connect to the environment where the agent runs. |
| Add a view to the desktop app | [Build a plugin panel](../04_custom-uis/07_build-your-first-dynamic-panel.md). |
| Change the appearance of Desktop | [Develop a theme](./04_themes.md). |

## See also

- [Plugin SDK](../05_plugins/01_overview.md) — the lifecycle and API surface
- [Building Integrations](../10_building-integrations/01_overview.md) — connecting Codebolt to external services
