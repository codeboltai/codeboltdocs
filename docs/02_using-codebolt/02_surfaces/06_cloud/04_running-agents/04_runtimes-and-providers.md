---
sidebar_position: 4
title: Runtimes & Providers
description: A runtime in the cloud portal is a running instance of the CodeBolt server inside a sandbox provisioned by a runtime provider.
---

# Runtimes & Providers

A **runtime** in the cloud portal is a running instance of the CodeBolt server inside a sandbox. The sandbox itself is provisioned by a **runtime provider** — E2B, Daytona, Runloop, Docker, or a self-hosted runner. Runtimes are the core of how you scale work in Cloud: one per task, many in parallel, clean up when done.

## The Environments page

**Agents → Environments** is the control center for every runtime tied to your account. It has two tabs:

- **Execution Environments** — running CodeBolt server instances (your agents live here)
- **Preview Environments** — live preview sessions of artifacts the agent is building (websites, apps)

The execution tab shows a **tree** grouping your environments into three categories:

| Category | What it is |
|---|---|
| **Cloud Sandboxed Environments** | Sandboxes the portal created for you (E2B / Daytona / Runloop / Docker) |
| **Self Started Environments** | Runtimes you started yourself and connected to the portal — e.g. a local `codebolt --server` you registered, or a worktree on your machine |
| **Self-Hosted Runner Nodes** | Machines you connected with `codebolt runner daemon start`, and the runtimes they host |

### What you see for each runtime

| Field | Meaning |
|---|---|
| **Status dot** | `online` (green), `starting` / `stopping` (amber, pulsing), `offline` / `stopped` (grey), `error` (red) |
| **Name** | The environment name, project name, or path basename — whatever best identifies it |
| **Type** | `local`, `e2b`, `docker`, `daytona`, `runloop`, `runner`, `custom` |
| **Origin** | Where it came from: `Cloud`, `Runner`, `Manual`, `Child`, `Local workspace` |
| **Sandbox ID** | The provider sandbox ID (shown for cloud sandboxes) |
| **Project path** | Absolute path inside the sandbox, usually `/home/user/<repo-name>` |
| **Active threads** | How many chat threads are currently attached |
| **Available providers** | Sandbox providers this runtime can spawn child environments on |
| **Runtime ID** | UUID used by the API and CLI |

Status is merged from **two sources**: the persisted record (from the API / environment snapshots) and live WebSocket events (`runtime_connected`, `runtime_stopping`, `runtime_disconnected`). A runtime that existed but has no live connection shows `offline` with 0 active threads.

Stop a runtime with the **Stop** button — for E2B sandboxes this destroys the sandbox; for others it sends a graceful stop request through the proxy. You cannot recover in-sandbox state once stopped, but threads and conversation history are persisted on the portal backend and survive.

## The runtime types

| Type | Where it runs | Origin label | Use when |
|---|---|---|---|
| **`local`** | Your own machine, registered with the portal | `Local workspace` / `Manual` | You want portal features while keeping execution on your laptop |
| **`e2b`** | [E2B](https://e2b.dev) cloud sandboxes | `Cloud` | Default cloud path. Fast start, strong isolation, pay-per-second |
| **`daytona`** | [Daytona](https://daytona.io) sandboxes | `Cloud` | Bring-your-own-key Daytona workspaces |
| **`runloop`** | [Runloop](https://runloop.ai) sandboxes | `Cloud` | Bring-your-own-key Runloop runtimes |
| **`docker`** | A Docker host accessible to the portal (self-hosted or BYO) | `Cloud` | Running on your own infra or a private cluster |
| **`runner`** | A machine connected via the runner daemon | `Runner` | Driving your own hardware remotely — see [Runner Nodes](./05_runner-nodes.md) |
| **`custom`** | A provider you implemented against the provider SDK | `Cloud` | Any sandbox backend the built-ins don't cover |

All types share the same runtime surface — chat, threads, agent lifecycle — regardless of where the sandbox lives. E2B, Docker, Daytona, Runloop and custom providers are **single-action**: one task at a time. `local` and `runner` can host multiple concurrent threads.

## Runtime lifecycle

```
create  →  starting  →  online  →  (optional) stop  →  terminated
                          │
                          └── E2B/Docker/Daytona: auto-terminate after 1 hour idle
```

- **Create** happens implicitly when Remote Chat picks **New**, explicitly via the CLI, or when a Runner Node launches a runtime.
- **Starting**: the portal clones the repo (if any), installs the CodeBolt CLI into the sandbox (if not pre-baked into the template), copies your settings, and runs `codebolt --server --port 3100 --project <path>`.
- **Online**: the runtime's outbound WebSocket to the proxy is connected and chats can attach.
- **Idle timeout** (cloud sandboxes only): ~1 hour with no active WebSocket triggers automatic cleanup. Runner and local runtimes have no timeout.

### What happens during sandbox startup

When you create a new cloud sandbox with a repo, the portal runs this sequence inside the sandbox — each step reports progress back to the chat:

1. **Create** — spin up the E2B / Daytona / Docker sandbox from the configured template.
2. **Clone** — `git clone <repo>` into `/home/user/<repo-name>`. Uses a GitHub App token or your installation token for private repos. Clones the default branch first, then checks out your requested branch if different.
3. **Install** — install the CodeBolt CLI at the pinned version (skipped if the template already has it). Uses a memory-conscious install strategy to avoid OOM on small sandboxes.
4. **Copy settings** — write your `settings.json` (user profile, LLM providers, default agent) into `~/.codebolt/`.
5. **Start** — launch `codebolt --server` in the background with env vars (`CLOUD_URL`, `RUNTIME_TYPE`, `RUNTIME_ID`, `SANDBOX_ID`).
6. **Ready** — wait for the server to open port 3100, then return the reachable host.

## Runtime providers (bring your own key)

Under **Settings → Remote Sandboxes** you can supply your own credentials so sandbox usage bills to your account, not ours.

| Provider | What you bring | Where it's used |
|---|---|---|
| **E2B** | E2B API key | Sandboxes created with type `e2b` |
| **Daytona** | Daytona API key | Sandboxes created with type `daytona` |
| **Runloop** | Runloop API key | Sandboxes created with type `runloop` |
| **Sprites** | Sprites API token | Stateful app and static site previews |
| **Modal** | Modal token ID + secret | Reserved for future Modal sandbox previews |

Credentials are stored **in your browser's local storage** and sent directly from the browser to the provider when creating/stopping a sandbox. They are **never transmitted to or stored on the portal backend**. If you don't supply a key, the hosted tier is used instead. See [Remote Sandboxes](../05_settings/03_remote-sandboxes.md) for the full provider list and field reference.

:::note
Stopping an E2B sandbox you own requires the same E2B API key that created it. If the key is missing from local storage, the portal sends a graceful stop request but cannot destroy the sandbox directly.
:::

## See also

- [Cloud Environments](./02_environments.md) — the three categories and parent/child environments
- [Syncing Changes](./03_syncing-changes.md) — Git sync vs Workspace Sync
- [Runner Nodes](./05_runner-nodes.md) — connecting your own machine
