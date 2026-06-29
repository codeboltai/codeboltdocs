---
sidebar_position: 1
title: Remote Chat
description: Run agents in cloud sandboxes or connect your local Codebolt to the cloud portal for remote management from any browser.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remote Chat

**Remote Chat** lets you talk to a Codebolt agent from any browser — without the desktop app open. There are two fundamentally different modes:

| Mode | Where the agent runs | Best for |
|---|---|---|
| **Cloud sandbox** | E2B / Daytona sandbox spun up by the portal | Clean-room tasks, CI-style runs, no local setup |
| **Local runtime** | Your own machine — connected to the cloud via the cloud plugin | Using your local environment, files, and tools from anywhere |

Open Remote Chat at **Agents → Remote Chat** in the portal.

---

## Mode 1 — Cloud sandbox

The portal spins up a fresh sandbox, installs the Codebolt CLI, and connects your browser to it. The agent runs entirely in the cloud.

### How it works

1. Pick (or create) a **runtime** — the cloud-hosted sandbox the server runs in.
2. Pick an **agent** from the registry.
3. Optionally pick a **GitHub repository** — the portal clones it into the sandbox before starting.
4. The portal installs the Codebolt CLI, writes your LLM settings into the sandbox, and starts the server on port 3100.
5. A WebSocket tunnel connects your browser to the sandbox. Chat behaves exactly like the desktop app.

Every step streams in the sandbox log panel next to the chat — create, clone, install, copy settings, start, ready. First-time startup takes 30–90 s; subsequent chats on the same runtime are instant.

### Runtime: existing vs new

At the top of the chat, a toggle picks how to run:

- **Existing** — a drop-down of your live runtimes. Fast; no spin-up cost. Shows the runtime name, bound repo, and a green/amber status dot.
- **New** — pick a runtime provider (E2B Remote or Daytona). The portal spins up a fresh sandbox for this chat.

Use **New** for a clean environment per task. Use **Existing** to continue a thread or avoid spin-up time.

### GitHub integration

1. Click **Select repository** in the chat header.
2. Sign in with GitHub (OAuth) on first use — the token is stored in browser storage only.
3. Pick a repo and optionally a branch.
4. The portal runs `git clone` inside the sandbox at startup.

If no repo is selected, the agent starts in an empty project directory.

### What gets installed in the sandbox

- **Template** — a small E2B image with Node and git pre-installed
- **Codebolt CLI** — installed via `npm install -g codebolt@<version>` at startup; version is pinned by the portal
- **Settings** — your LLM provider keys, selected model, and agent are written to `/home/user/.codebolt/settings.json` before the server starts

---

## Mode 2 — Local runtime (connect your machine to the cloud)

Instead of a cloud sandbox, you connect your local Codebolt installation to the cloud portal. The agent runs on your machine — with access to your local files, tools, and environment — but you can chat with it from any browser.

This is powered by the **cloud plugin**, which establishes a persistent outbound WebSocket connection from your machine to Cloudflare's relay infrastructure. No ports need to be opened on your machine.

### Architecture

```
Your machine                    Cloudflare (Wrangler WS)        Portal browser
─────────────                   ────────────────────────        ──────────────
Codebolt server
  └─ cloud-plugin ─── wss ────► ProxyHub (Durable Object) ◄─── wss ─── portal UI
       │                            │
       ├─ registers runtimeId       ├─ routes messages by appToken
       ├─ streams chat events       ├─ buffers to KV store
       └─ streams task events       └─ notifies portal of new runtimes
```

Each local project folder gets a unique `runtimeId` (UUID stored in `.codebolt/runtime-ids.json`). Multiple machines or projects can connect under the same account simultaneously.

### Setup

<Tabs groupId="codebolt-interface">
<TabItem value="desktop" label="Desktop App" default>

1. Open **Settings → Cloud** in the desktop app.
2. Make sure you're signed in to the same account you use on the portal.
3. Toggle **Connect to cloud** — the cloud plugin starts and registers your machine.
4. Open the portal at `portal.codebolt.ai` → **Agents → Remote Chat** → **Existing runtimes**.
5. Your local machine appears in the list labelled `local` with your project name and git remote URL.

</TabItem>
<TabItem value="cli" label="CLI / Environment variables">

Set these before starting the Codebolt server:

```bash
export CODEBOLT_CLOUD_URL="wss://codebolt-wrangler-ws.arrowai.workers.dev"
export CODEBOLT_APP_TOKEN="<your-app-token>"   # from portal → Account → API tokens
export CODEBOLT_API_KEY="<your-api-key>"
export CODEBOLT_USER_ID="<your-user-id>"

codebolt --server
```

The cloud plugin initialises automatically on server start, generates or loads a `runtimeId`, and connects to the relay. Your machine appears in the portal within a few seconds.

</TabItem>
</Tabs>

### What connecting enables

Once your local machine is registered:

- **Chat from any browser** — open the portal, pick your local runtime, and chat with an agent running on your machine
- **Remote task management** — tasks created in the portal sync bidirectionally to your local TaskManager
- **Issue assignment** — when an issue is assigned in the portal, the local RoutingGateway picks it up and starts the appropriate agent
- **Execution streaming** — every tool call, terminal command, and file write is streamed to the portal in real time
- **Multi-machine** — connect multiple machines under one account; the portal shows each as a separate runtime and you can target any of them

### What stays local

The connection is outbound only — no inbound ports are opened on your machine. Your code, files, and credentials never leave your machine unless an agent explicitly writes or uploads them. The cloud relay only sees chat messages and execution event streams, not raw file contents.

### Reconnection

The cloud plugin reconnects automatically with exponential backoff if the connection drops. It also polls every 5 s to detect project switches and re-registers with a new `runtimeId` when you open a different folder.

---

## Selecting the agent

The model selector in the chat input picks which agent handles your next message. Changing the agent mid-thread is allowed; the new agent picks up on the next message.

For **self-executed remote agents**: select the agent, hover the help icon in the selector, copy the thread token, and paste it into the machine running your agent process. See [Authentication → Remote agent](../../../09_account/01_authentication-and-authorization.md#authentication).

---

## Threads

The left sidebar lists every thread tied to the connected runtime. Thread history is stored on the portal backend, not inside the sandbox or on your local machine, so threads persist across restarts and reconnects.

---

## Stopping and cleaning up

**Cloud sandboxes** — closing the browser tab does not terminate the sandbox. Sandboxes auto-terminate after a 1-hour idle window. To stop immediately: **Agents → Environments → Stop**.

**Local runtimes** — disconnecting stops the cloud-plugin WebSocket. Your local Codebolt server keeps running. To disconnect: **Settings → Cloud → toggle off**, or stop the server.

---

## When to use which mode

| | Cloud sandbox | Local runtime |
|---|---|---|
| Need a clean environment | ✓ | |
| Need your local files and tools | | ✓ |
| Running on a remote server or CI | ✓ | |
| Want to use local models (Ollama etc.) | | ✓ |
| No local Codebolt install | ✓ | |
| Prefer full IDE (editor + terminal) | | Use desktop app |

---

## Related

- [Cloud Get Started](../00_get-started.md)
- [Runtimes & Providers](./04_runtimes-and-providers.md) — manage sandboxes
- [Authentication & Authorization](../../../09_account/01_authentication-and-authorization.md)
