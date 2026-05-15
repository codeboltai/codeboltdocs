---
sidebar_position: 7
title: Headless Mode
description: Run Codebolt without launching the TUI, using server-only mode and one-shot prompt execution.
---

# Headless Mode

Headless use in the current CLI means:

- start the server without the TUI using `codebolt --server`
- optionally send one-shot prompts with `codebolt --prompt ...`
- inspect the running server with `codebolt command ...`

## Start server-only mode

```bash
codebolt --server
codebolt --server --project /path/to/project
codebolt --server --port 3457
```

This starts the Codebolt server without launching the interactive terminal UI.

## Run a one-shot prompt

```bash
codebolt --prompt "Explain this codebase"
codebolt --prompt "Review the project" --agent generalist
codebolt --prompt "Summarize the repo" --project /path/to/project
```

You can also configure provider settings at launch time:

```bash
codebolt --prompt "Summarize the repo" \
  --provider openai \
  --model gpt-5 \
  --api-key "$OPENAI_API_KEY"
```

## Inspect a running headless server

The current server-backed inspection surface is `codebolt command ...`:

```bash
codebolt command system health
codebolt command agents list
codebolt command agents running
codebolt command threads list
codebolt command projects info
```

Use `--json` with `codebolt command ...` when you need structured output.

## CI and automation

The current CLI is best suited to simple automation patterns such as:

1. start a server process with `codebolt --server`
2. run one or more `codebolt --prompt ...` commands
3. query supporting state with `codebolt command ...`
4. stop the process through your shell or process manager

Example:

```bash
codebolt --server --project "$GITHUB_WORKSPACE"
codebolt --prompt "Review the current repository" --agent generalist
codebolt command agents running --json
```

## Important limitations

- The current CLI does not expose the older `codebolt app ...` management commands.
- The current CLI does not expose a stable JSON output mode for `codebolt --prompt ...`.
- The current CLI does not expose old `codebolt provider ...` or `codebolt project ...` helper commands.

For richer automation and observability, rely on desktop/server APIs, the TUI, or the self-hosted runtime surfaces that your build exposes.

## See also

- [CLI Overview](./03_cli/01_overview.md)
- [Agent Commands](./03_cli/02_agent-commands.md)
