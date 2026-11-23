---
sidebar_position: 1
title: Plugin SDK
---

# Plugin SDK Reference

The `@codebolt/plugin-sdk` package is what plugin authors use to extend the Codebolt application — hooks, UI panels, custom commands, LLM providers, execution backends, and more.

## What's in this section

| Section | What it covers |
|---|---|
| [Plugin Lifecycle](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md#lifecycle-hooks) | Plugin context and lifecycle callbacks |
| [Hooks API](./02_api-reference/hook/index.md) | Create, inspect, and manage hooks |
| [Dynamic Panel API](./02_api-reference/dynamicPanel/index.md) | Register and update panels |
| [Custom AI Providers](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/01_overview.md) | Build LLM and embedding provider plugins |
| [HTTP API Access](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md#2-http-apis) | Call the server API through the plugin SDK |
| [Type Reference](./type-reference/index.md) | Full TypeScript types for the plugin SDK |

## See also

- [Plugin System](../../04_build-on-codebolt/05_plugins/01_overview.md) — authoring guide
- [Extending Codebolt](../../04_build-on-codebolt/06_extending-codebolt/01_overview.md) — patterns using this SDK
- [codeboltjs Reference](../02_codeboltjs/01_overview.md) — agent SDK
