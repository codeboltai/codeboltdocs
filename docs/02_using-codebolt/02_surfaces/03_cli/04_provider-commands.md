---
sidebar_position: 4
title: Provider Commands
description: The current CLI exposes LLM inspection and configuration under `codebolt command llm`, plus provider extension authoring under `codebolt action provider`.
---

# Provider Commands

The current CLI does not use the older end-user provider-management command family.

Provider-related work is split into:

- `codebolt command llm ...` for server-backed LLM inspection and configuration
- `codebolt action provider ...` for building provider extensions

## Inspect providers and models

When a Codebolt server is running, use:

```bash
codebolt command llm providers
codebolt command llm models
codebolt command llm get-models --provider openai
codebolt command llm local-models
codebolt command llm embedding-providers
codebolt command llm pricing
```

## Configure defaults and keys

The current configuration commands are:

```bash
codebolt command llm set-default --provider openai --model gpt-5
codebolt command llm update-key --provider openai --key "$OPENAI_API_KEY"
```

Use `--json` when you need structured output.

## Build and publish provider extensions

For provider extension authors:

```bash
codebolt action provider create --name my-provider
codebolt action provider publish --path ./my-provider
codebolt action provider list
```

## Current limitation

The current `packages/cli` implementation does not expose the older end-user provider setup, fallback, usage, and reload subcommands from previous drafts.

Most provider setup for end users happens through the desktop settings UI, or through launch-time flags such as `--provider`, `--model`, `--api-key`, and `--api-url`.

## See also

- [LLM Providers](../../08_integrations/01_llm-providers.md)
- [Local Models](../../08_integrations/02_local-models.md)
