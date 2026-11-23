---
sidebar_position: 1
title: LLM Providers
description: Configure model providers and select the default model used by Codebolt.
---

# LLM Providers

Configure a model provider before choosing its models in Settings or Chat. Available providers include built-in options and any provider plugins you've installed.

## Configuring a provider

1. Open **Settings → LLMs → Providers** and choose **Add Provider**.
2. Choose **Local** for a provider used by the local runtime, or **Cloud BYOK** for a cloud provider using your own credentials.
3. Select a provider and fill in the fields shown. A provider may need an API key, an API URL, or a default model.
4. Save the provider, then use **Models** in LLM Settings to see the models Codebolt lists.

For a local model server, see [Local Models](./02_local-models.md).

## Default provider

Open [LLM Settings](../02_surfaces/02_desktop-app/Settings/02_llm-settings.md) to set the default application model and the embedding model. To use a different model for a specific agent role, see [Model Selection](../02_surfaces/02_desktop-app/03_chat/06_model-selection.md).

## Command mode

This command lists configured providers on the connected server.

```bash
codebolt command llm get-configured-providers
```

Use the provider, API key, and model flags documented in [Headless Prompt](../02_surfaces/04_cli/03_cli-headless/03_headless-prompt.md) to configure the provider for a headless run.

## See also

- [Cloud LLM Provider Settings](../02_surfaces/06_cloud/05_settings/05_llm-provider-settings.md)
- [Build a Custom LLM Provider](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md)
