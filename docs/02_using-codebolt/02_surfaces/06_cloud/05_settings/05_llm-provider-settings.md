---
sidebar_position: 5
title: LLM Provider Settings
description: Configure which LLM providers and models your cloud agents use for chat and embeddings.
---

# LLM Provider Settings

Open **Settings → Agent Settings → AI Configuration** (`/settings/ai`) to choose the models your cloud agents use. The older `/settings/providers` route opens the same page.

## Configure a provider and choose models

1. Under **Cloud BYOK Keys**, add a provider if you want to use your own key. Enter the credentials requested for that provider. The portal fetches its model list.
2. Under **Default Cloud Chat Model**, select a provider, then a model. **CodeBolt AI** also appears as a provider when it is enabled for your account.
3. To configure embeddings, use **Default Cloud Embedding**. Select a provider you configured with your own credentials, then choose its model.

Use the refresh control beside a configured provider to fetch its model list again. The **CodeBolt AI** section shows account availability and the models supplied by your plan.

## Security

The portal stores configured providers and their keys in browser storage and sends the configuration to your account settings. Cloud runtimes use the provider configuration when starting a sandbox.

## See also

- [AI Models](../03_registry/03_ai-models.md) — the Registry’s CodeLoom Model entry
- [Remote Sandboxes](./03_remote-sandboxes.md) — compute (not model) providers
- [Remote Chat](../04_running-agents/01_remote-chat.md) — where settings.json gets written at startup
