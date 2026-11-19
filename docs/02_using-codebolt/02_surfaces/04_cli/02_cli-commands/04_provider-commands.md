---
sidebar_position: 4
title: Provider Commands
description: Inspect configured providers and set provider options for headless runs.
---

# Provider Commands

Use **Settings → LLMs** in the desktop app to save credentials and set the default model. Inspect configured providers through a running CodeBolt server:

```bash
codebolt command llm get-configured-providers
```

For a headless run, pass `--provider` and `--model`. Set the provider credential through `CODEBOLT_API_KEY` when required.

Use [Provider Action Commands](../../../../05_reference/06_codebolt-cli/actions/provider.md) to author provider extensions or the [LLM Gateway Commands](../../../../05_reference/06_codebolt-cli/commands/llm.md) for inference and roles.
