---
sidebar_position: 3
sidebar_label: Headless Prompt
title: Headless Prompt
description: Run one Codebolt agent prompt from the command line without opening the interactive CLI interface.
---

# Headless Prompt

## What it is

Headless Prompt mode starts a Codebolt server, opens the `/chat` WebSocket, sends one user prompt to an agent, prints agent messages to stdout, waits for the process-stop event, and then shuts the server down.

Use it for one-off automation:

```bash
codebolt --prompt "Explain this codebase"
codebolt --prompt "Review the project" --agent generalist
codebolt --prompt "Summarize the repo" --project /path/to/project
```

## Get the response back

The current `--prompt` implementation streams the response to stdout. Internally, the CLI:

1. starts a local Codebolt server
2. opens the `/chat` WebSocket
3. sends a `messageResponse` payload with your prompt and selected agent
4. prints each agent message's `content` field as it arrives
5. exits after receiving the process-stop event

For shell scripts, capture stdout:

```bash
response="$(codebolt --prompt "Summarize this repo" --agent generalist)"
printf '%s\n' "$response"
```

Because the command also prints lifecycle text such as `Prompt sent, waiting for agent...` and `--- Agent Finished ---`, stdout is useful for human-readable automation but is not a stable JSON API.

If you need structured data, use [Headless Server](./02_headless-server.md) with `codebolt command ... --json` or the Client SDK instead of `--prompt`.

## Prompt options

The current prompt path uses the root CLI options from `packages/cli/src/index.ts`:

| Option | Applies to prompt? | What it does |
|---|---:|---|
| `--prompt <text>` | Yes | Runs one headless agent prompt. |
| `--agent <name>` | Yes | Selects the agent for the prompt. If omitted, the CLI checks `CODEBOLT_AGENT`, then falls back to the built-in default agent ID. |
| `-d, --project <path>` | Yes | Runs against a project directory. Can also come from `CODEBOLT_PROJECT_PATH`. |
| `-p, --port <number>` | Yes | Requests the temporary server port. If omitted, the CLI starts at `2719` or the next free port. |
| `--provider <name>` | Yes | Configures the LLM provider before sending the prompt. Can also come from `CODEBOLT_LLM_PROVIDER`. |
| `--model <name>` | Yes | Sets the default model. Can also come from `CODEBOLT_LLM_MODEL`. |
| `--api-key <key>` | Yes | Sets the LLM provider API key. Can also come from `CODEBOLT_API_KEY`. |
| `--api-url <url>` | Yes | Uses a custom provider API base URL. Can also come from `CODEBOLT_API_URL`. |
| `--embedding-provider <name>` | Yes | Sets the embedding provider. Can also come from `CODEBOLT_EMBEDDING_PROVIDER`. |
| `--embedding-model <name>` | Yes | Sets the embedding model. Can also come from `CODEBOLT_EMBEDDING_MODEL`. |
| `--team <username>` | Yes | Runs cloud sync scoped to a team workspace. |
| `-w, --web` | Usually no | Requires the web frontend during server startup. Not needed for normal prompt runs. |
| `--debug` | Limited | Enables debug mode for supported launch paths. |
| `-c, --connect <port>` | No | The current implementation handles `--connect` before `--prompt`, so do not combine them. |
| `-s, --server` | No | Use `--server` for a long-running Headless Server. Use `--prompt` for one-shot execution. |

Provider configuration is applied only when both provider and API key are available:

```bash
codebolt --prompt "Summarize this repo" \
  --provider openai \
  --model gpt-5 \
  --api-key "$OPENAI_API_KEY"
```

For OpenAI-compatible proxies or self-hosted provider gateways:

```bash
codebolt --prompt "Review this service" \
  --provider openai \
  --model gpt-5 \
  --api-key "$OPENAI_API_KEY" \
  --api-url "https://llm-gateway.example.com/v1"
```

## CI and automation

Use Headless Prompt when a single prompt should own the whole lifecycle:

```bash
codebolt --prompt "Review the current repository" \
  --project "$GITHUB_WORKSPACE" \
  --agent generalist
```

## Important limitations

- The current CLI does not expose the older `codebolt app ...` management commands.
- The current CLI does not expose old `codebolt provider ...` or `codebolt project ...` helper commands.
- `codebolt --prompt ...` streams agent text to stdout but does not expose a stable structured JSON result mode.
- `--connect` is for connecting the interactive CLI interface to an existing server; it is not a prompt transport.

For richer automation and observability, prefer [Headless Server](./02_headless-server.md) plus `codebolt command ...` or the Client SDK.

## See also

- [Headless CLI Overview](./01_overview.md)
- [Headless Server](./02_headless-server.md)
- [Command Mode Overview](../02_cli-commands/01_overview.md)
