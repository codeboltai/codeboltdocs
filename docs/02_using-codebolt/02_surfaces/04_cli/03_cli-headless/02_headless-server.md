---
sidebar_position: 2
sidebar_label: Headless Server
title: Headless Server
description: Start the Codebolt backend without the interactive CLI interface and connect to it from commands, scripts, or the Client SDK.
---

# Headless Server

## What it is

Headless Server mode starts the Codebolt backend without the interactive CLI interface. The server hosts the same HTTP routes and WebSocket channels used by the desktop app, CLI interface, and custom clients.

Use it for:

- local automation scripts
- CI jobs that need Codebolt APIs
- custom dashboards or product UIs
- long-running server processes controlled by `codebolt command ...` or `@codebolt/client-sdk`

## Start the server

```bash
codebolt --server
codebolt --server --project /path/to/project
codebolt --server --port 3457
codebolt --server --team my-team
```

Useful server options:

| Option | What it does |
|---|---|
| `-s, --server` | Starts server-only mode. |
| `-p, --port <number>` | Requests a server port. If omitted, the CLI starts at `2719` or the next free port. |
| `-d, --project <path>` | Sets the project directory. Can also come from `CODEBOLT_PROJECT_PATH`. |
| `-w, --web` | Requires the packaged web frontend. If the web build is missing, startup fails. |
| `--team <username>` | Runs cloud sync scoped to a team workspace. The `team:` prefix is optional. |
| `--provider <name>` | Configures an LLM provider after startup. Can also come from `CODEBOLT_LLM_PROVIDER`. |
| `--model <name>` | Sets the default model. Can also come from `CODEBOLT_LLM_MODEL`. |
| `--api-key <key>` | Sets the provider API key. Can also come from `CODEBOLT_API_KEY`. |
| `--api-url <url>` | Uses a custom provider API base URL. Can also come from `CODEBOLT_API_URL`. |
| `--embedding-provider <name>` | Sets the embedding provider. Can also come from `CODEBOLT_EMBEDDING_PROVIDER`. |
| `--embedding-model <name>` | Sets the embedding model. Can also come from `CODEBOLT_EMBEDDING_MODEL`. |
| `--debug` | Enables debug mode for supported launch paths. |

Provider setup runs only when both `--provider` and `--api-key` are supplied. If no port is supplied, watch the startup output for the selected server URL.

## Connect with CLI commands

Once the server is running, use `codebolt command ...` from another terminal:

```bash
codebolt command --port 3457 system health
codebolt command --port 3457 agents list
codebolt command --port 3457 threads list --json
```

`codebolt command` supports:

| Option | What it does |
|---|---|
| `--host <string>` | Server host. Default: `localhost`. |
| `--port <number>` | Server port. Default: `2719`. |
| `--json` | Prints raw JSON instead of formatted tables. |

## Connect with the Client SDK

Use `@codebolt/client-sdk` when you are building a custom UI, API integration, or automation script.

```bash
npm install @codebolt/client-sdk
```

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const codebolt = new CodeBoltClient({
  host: 'localhost',
  port: 3457,
  autoConnect: false,
});

const threads = await codebolt.chat.getThreadsInfo();
const agents = await codebolt.agents.getInstalled();

console.log({ threads, agents });

await codebolt.disconnectAll();
```

For the full SDK architecture, modules, and WebSocket options, see [Build on Codebolt -> Client SDK](../../../../04_build-on-codebolt/04_custom-uis/02_client-sdk.md).

## See also

- [Headless CLI Overview](./01_overview.md)
- [Headless Prompt](./03_headless-prompt.md)
- [Command Mode Overview](../02_cli-commands/01_overview.md)
