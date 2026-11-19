---
sidebar_position: 1
title: Reference Overview
---

# Reference

Dry, complete, mostly auto-generated. This section is for when you need the exact signature, schema, or type — not for learning how Codebolt works.

The reference is organized by **SDK**, since each targets a different developer:

| SDK / Package | Who it's for | Start here |
|---|---|---|
| **codeboltjs** | Agent authors — writing or extending agents | [codeboltjs Reference](./02_codeboltjs/01_overview.md) |
| **Codebolt CLI** | Command-line users — running CodeBolt, scaffolding extensions, and server commands | [Codebolt CLI Reference](./06_codebolt-cli/01_overview.md) |
| **Agent Framework** | Framework internals — processor pipeline, tool system, multi-agent teams | [Agent Framework Reference](./05_agent-framework/01_overview.md) |
| **Plugin SDK** | Plugin authors — hooks, UI panels, providers, commands | [Plugin SDK Reference](./03_plugin-sdk/01_overview.md) |
| **Client SDK** | UI / integration authors — bots, IDE extensions, CI runners | [Client SDK Reference](./04_client-sdk/01_overview.md) |
| **Cloud SDK** | Runtime and preview-provider developers connecting to CodeBolt Cloud | [Cloud SDK](./07_cloud-sdk/01_overview.md) |
| **External SDK** | Node.js integration developers connecting to a direct execution gateway | [External SDK](./08_external-sdk/01_overview.md) |

## Which reference for which job

**"I'm building an agent"**
→ [codeboltjs → API Access](./02_codeboltjs/10_api-access/1-index.md) for every `ctx.*` method.
→ [codeboltjs → Type Reference](./02_codeboltjs/09_type-reference/index.md) for TypeScript types.

**"I need the agent loop internals — processors, tools, team coordination"**
→ [Agent Framework Reference](./05_agent-framework/01_overview.md).

**"I'm using the CLI"**
→ [Codebolt CLI Reference](./06_codebolt-cli/01_overview.md).

**"I'm building a plugin"**
→ [Plugin SDK Reference](./03_plugin-sdk/01_overview.md).

**"I'm building a custom UI, bot, or integration"**
→ [Client SDK Reference](./04_client-sdk/01_overview.md).

**"I'm exposing tools via MCP"**
→ [codeboltjs → MCP Access](./02_codeboltjs/11_mcp-access/1-index.md).

## Auto-generation

Most of this reference is generated from TypeScript source — TypeDoc for class/interface/function docs, regenerated on every release. Hand-editing reference pages is discouraged; they drift. The prose guides in [Build on Codebolt](../04_build-on-codebolt/01_overview.md) are the right place for explanations and examples.

## See also

- [Build on Codebolt](../04_build-on-codebolt/01_overview.md) — the guides that the reference complements
- [System Internals](../04_build-on-codebolt/09_internals/01_architecture-overview.md) — the mental model
