---
sidebar_position: 1
sidebar_label: Overview
title: Headless CLI
description: Run Codebolt without launching the interactive CLI interface, either as a server for API clients or as a one-shot prompt runner.
---

# Headless CLI

Headless CLI mode runs Codebolt without launching the interactive terminal interface. Use it when you want Codebolt as a background server, a script target, or a one-shot prompt runner.

There are two main headless patterns:

- **[Headless Server](./02_headless-server.md)** - start the Codebolt server and connect to it from commands, scripts, or the Client SDK.
- **[Headless Prompt](./03_headless-prompt.md)** - start a server, send one prompt to an agent, stream the agent response, then shut down.

## When to use each mode

Use **Headless Server** when multiple commands or API calls need to share one process:

1. start a server process with `codebolt --server`
2. call it with `codebolt command ...` or `@codebolt/client-sdk`
3. stop the server through your shell or process manager

Use **Headless Prompt** when a single prompt should own the whole lifecycle:

```bash
codebolt --prompt "Review the current repository" \
  --project "$GITHUB_WORKSPACE" \
  --agent generalist
```

## See also

- [Headless Server](./02_headless-server.md)
- [Headless Prompt](./03_headless-prompt.md)
- [Command Mode Overview](../02_cli-commands/01_overview.md)
- [Agent Commands](../02_cli-commands/02_agent-commands.md)
- [Build on Codebolt -> Client SDK](../../../../04_build-on-codebolt/04_custom-uis/02_client-sdk.md)
