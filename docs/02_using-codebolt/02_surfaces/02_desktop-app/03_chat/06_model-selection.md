---
sidebar_position: 6
title: Model Selection
description: Configure a default provider and model, or set models for an agent’s roles.
---

# Model Selection

![Model Selection](/productImages/chat/model_selection.gif)

## Picking a model

In Chat, open **Select AI Model** using the lightning-bolt control in the composer. Choose a provider and model. This saves the application default. If the model supports configurable reasoning effort, the popup shows that option.

To add a provider or configure the default model from Settings, see [LLM Settings](../Settings/02_llm-settings.md).

## Picking per agent

Some agents define model roles for different parts of their work. Assign a provider and model to a role in the chat model popup or in [Agent Settings](../Settings/03_agent-settings.md). The agent determines which roles it uses.

## CLI prompts

This headless prompt uses an OpenAI model and reads the API key from the environment.

```bash
CODEBOLT_API_KEY="$OPENAI_API_KEY" codebolt --prompt "Explain this project" --provider openai --model YOUR_MODEL_ID
```

See [Headless Prompt](../../04_cli/03_cli-headless/03_headless-prompt.md) for the CLI options.

## See also

- [Chat Overview](./01_overview.md)
- [Local models](../../../08_integrations/02_local-models.md)
