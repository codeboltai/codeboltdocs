---
sidebar_position: 1
title: Introduction
description: Explore Codebolt, an AI-native development environment for planning projects, writing code, reviewing changes, and working with agents.
---

# Introduction

Codebolt is an AI-native development environment. In Codebolt Desktop, you can plan a feature, edit project files, run tests in the terminal, and review changes in Source Control. You can also bring a coding agent into that workflow or extend Codebolt with your own agents, tools, and plugins.

Follow the [installation guide](./installation.md) to set up Desktop, Terminal, or Cloud. Already have Codebolt Desktop open? Try the [Quickstart](./03_quickstart.md) with your own project.

## What you can do with Codebolt

- **Develop in your project.** Open a feature plan, edit the implementation, run its tests, and inspect the diff. You can do this in the Desktop workspace or ask an agent in Chat to handle part of it. For example, ask it to add a test for a bug, then review the change before committing. [Desktop workspace](../02_using-codebolt/02_surfaces/02_desktop-app/00_get-started.md)
- **Give agents project context.** Mention a file in Chat to focus the next answer. For work that spans tasks, an agent can retrieve saved project knowledge through memory. [Context and Memory](../02_concepts/04_runtime/02_context-and-memory.md)
- **Control and review changes.** A guardrail profile can require approval for a tool request. If a chat message has a checkpoint, you can restore the project files captured in that snapshot. Workflows can also record events for later inspection. [Guardrails](../02_concepts/06_quality/01_guardrails.md) · [Checkpoints](../02_concepts/05_persistence/01_shadow-git-and-checkpoints.md) · [Event Log](../02_concepts/05_persistence/02_event-log.md)
- **Build and coordinate agents.** Create a custom agent with instructions for your codebase, connect internal tools through MCP, or divide a task among agents that plan, implement, and review the work. [Custom agents](../04_build-on-codebolt/02_creating-agents/01_overview.md) · [MCP tools](../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md) · [Multi-agent orchestration](../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md)

## Where Codebolt runs

Use Desktop for the editor, the CLI for interactive terminal sessions and headless runs, or Cloud for browser access to a connected environment. You can run your own server and configure a local model provider. [Desktop, CLI, and Cloud](../02_using-codebolt/02_surfaces/01_overview.md) · [Local models](../02_using-codebolt/08_integrations/02_local-models.md) · [Agent infrastructure](../04_build-on-codebolt/11_agent-infrastructure/01_overview.md)

## Explore Codebolt

| You want to | Continue with |
|---|---|
| Understand threads, tools, context, and approvals | [Core Concepts](../02_concepts/01_overview.md) |
| Find a feature | [Features overview](../02_using-codebolt/01_features-overview.md) |
| Follow a task walkthrough | [Guides and tutorials](../03_guides/01_overview.md) |
| Create an agent, plugin, or application | [Build with Agents](../04_build-on-codebolt/01_overview.md) |
| Look up an SDK method or CLI command | [Reference](../05_reference/01_overview.md) |
