---
sidebar_position: 5
title: LLM Provider Settings
description: Configure which LLM providers and models are available to your cloud agents, written into each sandbox's settings.json.
---

# LLM Provider Settings

**LLM Provider Settings** (`/settings/providers`) controls which LLM providers and models your **cloud** agents can use. It mirrors the provider settings format from the desktop app, and the portal writes your configuration into each sandbox's `settings.json` when a runtime starts.

## What it governs

When a cloud runtime boots, the portal copies your LLM provider keys, selected default model, and agent into `/home/user/.codebolt/settings.json` before launching the Codebolt server. This page is where that provider/model configuration is authored.

- **Providers** — add an LLM provider (OpenAI, Anthropic, a custom endpoint, etc.) with its API key and base URL.
- **Models** — choose which models from each provider are offered.
- **Default** — set the default model a new chat uses.

## How it differs from AI Models

- [AI Models](../03_registry/03_ai-models.md) is a simple on/off toggle over the models already configured.
- **LLM Provider Settings** is where you actually add providers and keys.

Both interact: a model toggled off in AI Models won't appear in selectors even if its provider is configured here.

## Relationship to Remote Sandboxes

Don't confuse LLM providers (this page — *models/inference*) with [Remote Sandboxes](./03_remote-sandboxes.md) (*compute sandboxes*). They're independent:

- **Remote Sandboxes** — where the agent *runs* (E2B, Daytona, etc.)
- **LLM Provider Settings** — which models the agent *thinks with* (OpenAI, Anthropic, etc.)

A cloud agent needs both: a sandbox to execute in and an LLM provider to reason with.

## Security

Like Remote Sandbox credentials, LLM provider keys you enter here are kept in your browser's local storage and written into the sandbox at startup — they are not persisted on the portal backend.

## See also

- [AI Models](../03_registry/03_ai-models.md) — toggling model availability
- [Remote Sandboxes](./03_remote-sandboxes.md) — compute (not model) providers
- [Remote Chat](../04_running-agents/01_remote-chat.md) — where settings.json gets written at startup
