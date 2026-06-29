---
sidebar_position: 3
title: AI Models
description: Toggle which AI models are available to your agents from the portal's AI Models page.
---

# AI Models

The **AI Models** page (`/aiModels`) is where you control which models appear in your agents' model selectors. It's a simple on/off table: each model has a toggle, and only models you switch **on** are offered when picking a model in chat or in agent settings.

## What it does

Models here are the first-party and curated models Codebolt exposes — for example the **CodeLoom Model**. Flipping a model off hides it from selectors across the portal without removing any configuration; flipping it back on restores it instantly.

This is useful when:

- You want to **limit the model list** to a small approved set for simplicity or cost control.
- You're **testing a new model** and want to expose it to your agents before rolling it out everywhere.
- You want to **hide deprecated models** without losing the ability to re-enable them later.

## Where the toggle applies

The on/off state governs model availability for:

- **Remote Chat** model selectors
- **Agent** default-model configuration
- Any portal surface that lets you pick a model

It does **not** remove provider API keys or change your [LLM Provider Settings](../05_settings/05_llm-provider-settings.md) — it only controls which models are selectable.

## Related

- [LLM Provider Settings](../05_settings/05_llm-provider-settings.md) — configuring providers and API keys
- [Remote Chat](../04_running-agents/01_remote-chat.md) — where models are selected
- [Registry Overview](./01_overview.md)
