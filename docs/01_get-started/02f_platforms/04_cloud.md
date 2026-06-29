---
sidebar_position: 4
title: Cloud
description: Codebolt's browser-based platform — run agents in managed sandboxes or drive your local machine from anywhere via the cloud portal at portal.codebolt.ai.
---

import CloudPlatformArchitecture from '@site/src/components/diagrams/CloudPlatformArchitecture';

# Cloud

The Codebolt **Cloud** platform is the browser-based way to use Codebolt. There is nothing to install — sign in at [portal.codebolt.ai](https://portal.codebolt.ai) and you get a full agent environment in any modern browser. Behind the scenes it is the same agent runtime, the same plugin system, and the same CLI that power the desktop app — Cloud simply controls *where the runtime runs* (a managed sandbox or your own machine) and *how you interact with it* (a browser instead of a desktop window).

Cloud is unique among the four platforms because it offers **two execution models**:

- **Cloud sandbox** — the portal spins up an isolated sandbox (E2B, Daytona, Runloop, or a Runner Node) and runs the CodeBolt CLI inside it. No local setup.
- **Local runtime** — you connect your own machine to the cloud with the **cloud plugin**. The agent runs on your hardware with your files and tools, but you can drive it from any browser.

> New here? The **[Cloud Overview](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)** explains what Cloud gives you, and **[Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)** walks you through your first cloud agent run.

## How to launch

Open a browser and sign in at **[portal.codebolt.ai](https://portal.codebolt.ai)** using the same account you use for the desktop app. Then head to **Agents → Remote Chat** and either pick an existing runtime or create a new one.

```text
https://portal.codebolt.ai
  → Agents
    → Remote Chat   (chat against a sandbox or local runtime)
    → Environments  (list of your runtime instances)
    → Runner Nodes  (connected local machines)
```

To run the agent on **your own machine** from the browser, start the CodeBolt server with the cloud environment variables:

```bash
export CODEBOLT_CLOUD_URL="wss://codebolt-wrangler-ws.arrowai.workers.dev"
export CODEBOLT_APP_TOKEN="<your-app-token>"   # from portal → Settings → Login Tokens
export CODEBOLT_API_KEY="<your-api-key>"
export CODEBOLT_USER_ID="<your-user-id>"

codebolt --server
```

The cloud plugin starts automatically, generates a `runtimeId`, and your machine appears in the portal's **Environments** list within a few seconds.

## Architecture at a glance

The cloud platform is built from three cooperating components:

<CloudPlatformArchitecture />

| Component | Where it lives | What it does |
|---|---|---|
| **Cloud Portal** | React app hosted at `portal.codebolt.ai` | The browser UI — Registry, Agents, and Settings tabs |
| **Wrangler WebSocket Server** | Cloudflare Worker with Durable Objects | The relay fabric: routes messages, persists state, provisions sandboxes, manages previews, and talks to GitHub |
| **Cloud Plugin** | Runs inside every CodeBolt server | Establishes the outbound WebSocket, mirrors local events to the cloud, and applies incoming cloud commands |

## The Cloud Portal

The portal organises everything into **three top-level tabs**. Each tab is focused on one kind of task.

### Registry — browse and discover

The Registry tab is where you browse everything publishable. Each entity type has an **All** view (the public marketplace) and a **My** view (what you've published).

| Section | What you find |
|---|---|
| **Home** | Landing dashboard |
| **Agents** / **My Agents** | Browse or publish agents |
| **MCPs** | Model Context Protocol servers |
| **Providers** | LLM provider integrations |
| **Skills** | Slash-command skills |
| **Action Blocks** | Side-execution code units |
| **Capabilities** | Versioned capability bundles |
| **Plugins** | Plugins that extend the application |
| **Executors** | Runtime executors (Node, Python, shell) |
| **Templates** | Project templates |
| **Apps** | Packaged applications |

See **[Marketplace Publishing](../../02_using-codebolt/02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md)** for the publish flow.

### Agents — run and iterate

This tab is where you actually *use* the cloud runtime.

| Page | Route | Purpose |
|---|---|---|
| **Remote Chat** | `/remote-chat` | Start or join a chat against an agent running in a cloud sandbox or your local machine |
| **Environments** | `/environments` | List of your runtime instances with live status |
| **Runner Nodes** | `/runner-nodes` | Connected local machines registered via the cloud plugin |
| **Scheduled Tasks** | `/scheduled-tasks` | Tasks scheduled to run on a cron |
| **Inbox** | `/inbox` | Messages from agents to you |
| **Tasks** | `/tasks` | Ticket-style issue tracking, synced bidirectionally with local agents |
| **Review Merge** | `/review-merge-requests` | Review/Merge Requests (RMRs) raised by agents before their changes are merged |

See **[Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)** and **[Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)** for the deep dive.

### Settings — account and config

The Settings tab collects everything configuration-related.

- **General Settings** — profile, theme, account-wide defaults
- **Subscription** — Plans, Usage, and Billing
- **Agent Settings**
  - **Login Tokens** — personal access tokens for the CLI / API
  - **Remote Sandboxes** — bring-your-own-key for E2B / Daytona / Runloop / Sprites
  - **Thread Runtime Providers** — per-thread provider overrides
  - **Connectors** — GitHub and other integrations
  - **LLM Provider Settings** — which providers and models are available
  - **Preview Provider Settings** — manage preview backends
- **Team Settings** — General and Members for team workspaces

## The Wrangler WebSocket Server

The relay fabric is a **Cloudflare Worker** fronted by **Durable Objects** and a **KV namespace**. It is the connective tissue between the portal, sandboxes, and your local machines.

### Durable Objects

| Object | Binding | Responsibility |
|---|---|---|
| **ProxyHub** | `PROXY_HUB` | The message router. One instance per authenticated routing token. Routes messages between agents, apps, gateways, and runner nodes. Buffers payloads to KV while peers are offline, tracks connections, persists runtimes/threads/tasks/review-merge-requests. |
| **PreviewHub** | `PREVIEW_HUB` | Manages live preview sessions for artifacts (static sites, dynamic sites). One instance per preview routing token. |

Both objects use SQLite-backed storage (`new_sqlite_classes`) so state survives hibernation and restarts.

### KV store

The `CHAT_STORE` KV namespace persists the durable record of:

- **Runtimes** — index under `runtimes:<token>`, detail under `runtime:<token>:<runtimeId>`
- **Threads** and **thread messages**
- **Review Merge Requests**
- **Runner Nodes**

Live status is always merged from these persisted records *and* the live WebSocket connections — a persisted runtime with no live connection shows as `offline`.

### HTTP endpoints

The worker exposes both WebSocket upgrade routes and REST-style routes. Auth uses a **routing token** derived from the JWT subject in your app token, optionally scoped to a workspace (`<appToken>::<workspaceId>`).

| Route | Method | Purpose |
|---|---|---|
| `/proxy/<token>` | `GET` (WS) | Register an agent/app/gateway/runner connection |
| `/dispatch/<token>` | `POST` | Send a one-off dispatch without keeping a socket open |
| `/preview/ws/<token>` | `GET` (WS) | Connect a preview provider |
| `/runtimes/create/<token>` | `POST` | Provision a new sandbox runtime |
| `/runtimes/stop/<token>` | `POST` | Terminate a runtime |
| `/runtimes/list/<token>` | `GET` | List your live runtimes |
| `/runtimes/providers/<token>` | `GET` | List available runtime providers + config state |
| `/runtimes/prospective-path/<token>` | `POST` | Preview the resolved project path + sync policy |
| `/runtimes/review-merge/<token>` | `POST` | Trigger a review-merge for a runtime |
| `/runner-nodes/list/<token>` | `GET` | List connected runner nodes |
| `/threads/list/<token>` | `GET` | List threads for a runtime |
| `/threads/messages/<token>?threadId=` | `GET` | Fetch a thread's messages |
| `/review-merge-requests/<token>` | `GET` | List review/merge requests |
| `/github/app-token/<token>` | `POST` | Mint a GitHub App installation token |
| `/github/merge-pr/<token>` | `POST` | Merge a GitHub pull request |
| `/live/<token>` | `GET` | Live monitoring dashboard (HTML) |
| `/debug/kv*` | `GET`/`PUT` | Debug helpers for KV (dev only) |

### Runtime providers

The server delegates sandbox provisioning to a pluggable **runtime provider** registry. Each provider implements the same contract — `getProspectivePath`, `create`, and `stop`.

| Provider | Type | Description |
|---|---|---|
| **E2B Remote** | `e2b` | Spins up an [E2B](https://e2b.dev) sandbox and runs the CodeBolt CLI inside it. Default cloud path. |
| **Runner Node** | `runner` | Starts a CodeBolt process on a connected runner daemon (your own machine or a self-hosted node). Dynamic per-node provider IDs. |
| **Sprites** | `sprites` | Runs on a Sprites-managed environment. |
| **Runloop** | `runloop` | Provisions a Runloop devbox. |

All four share the same runtime surface — chat, threads, agent lifecycle — regardless of where the sandbox physically lives. Each provider advertises a **sync policy** (how project files sync: `none`, `git`, or `workspace_sync`) and a **RMR policy** (how agent changes are reviewed and merged back).

### Preview providers

Preview providers turn artifacts (static sites, dynamic apps, images) into live preview URLs. The server ships a managed registry:

| Provider | Hosts |
|---|---|
| **E2B Static Site** | Static sites on E2B |
| **Sprites Static Site** | Static sites via Sprites |
| **Daytona Sandbox** | Previews inside a Daytona sandbox |
| **Runloop Devbox** | Previews from a Runloop devbox |

Local runtimes also register themselves as a **local preview provider** through the cloud plugin, so previews of artifacts produced on your machine are reachable from the portal.

### GitHub App integration

The worker can act as a **GitHub App** so cloud runtimes can clone private repos and open pull requests without you pasting tokens:

- **App tokens** — `/github/app-token` mints short-lived installation tokens scoped to a repo
- **Clone with credentials** — when you pick a repo in Remote Chat, the server attaches an installation token so `git clone` works on private repos
- **Merge PRs** — `/github/merge-pr` merges a pull request and persists the result as a Review Merge Request
- **Auto PR creation** — git-based runtimes can automatically commit changes, push a branch, and open a PR when an agent finishes

Configure `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, and `GITHUB_APP_INSTALLATION_ID` as worker secrets.

### Environments

The worker runs in three environments, each a separate Worker deployment:

```bash
wrangler deploy                  # development
wrangler deploy --env staging    # staging
wrangler deploy --env production # production
```

Each environment has its own durable object bindings and KV namespace. The `CLOUD_API_URL` and `STATIC_PREVIEW_URL_TEMPLATE` vars point every environment at the same API host and the `*.codeboltai.org` preview domain.

## The Cloud Plugin

The **cloud plugin** is what makes a *local* runtime cloud-aware. It ships with the CodeBolt server and runs on startup, establishing a persistent **outbound** WebSocket to the Wrangler server — no inbound ports need to be opened on your machine.

### What it syncs to the cloud

| Local event | Cloud mirror |
|---|---|
| **Execution notifications** | Streamed as execution events (tool calls, terminal, file writes) |
| **Chat broadcasts** | Mirrored so threads are visible and searchable in the portal |
| **Tasks** | Bidirectional sync — portal issues ↔ local TaskManager |
| **Threads** | Created/updated/completed events |
| **Artifacts** | Files uploaded to the cloud API; metadata events over WebSocket |
| **Inbox messages** | Synced so portal inbox reflects local agent messages |
| **Review Merge Requests** | Bidirectional sync of RMRs and their statuses |
| **Environment snapshots** | Running environments broadcast every 10 s |

### What it receives from the cloud

| Incoming message | Action |
|---|---|
| `userMessage` / `forward_to_agent` | Injects the chat into your local agent (enables browser→local chat) |
| `taskSync` / `issueSync` | Applies portal task changes to the local TaskManager |
| `reviewMergeRequestSync` | Applies portal RMR changes locally |
| `taskRunStart` / `issueAssigned` | Routes a task to an agent via the RoutingGateway |
| `providerCreateEnvironment` | Starts a child environment on your machine |
| `createGitPullRequest` | Commits, pushes, and opens a GitHub PR from the runtime |
| `thread.stop` / `stopProcessClicked` | Stops a running agent thread |
| `runtime.stopRequest` | Disconnects the plugin and stops the local preview provider |

The plugin polls every 5 s for project switches and re-registers with a new `runtimeId` when you open a different folder. It reconnects automatically with exponential backoff if the connection drops.

### Workspaces

Each connection is scoped to a **workspace** — either `personal:<userId>` or `team:<teamId>`. The workspace determines which runtimes, tasks, and RMRs a connection can see. Configure via:

```bash
export CODEBOLT_CLOUD_TEAM="<team-id>"              # use a team workspace
# or default to personal:<userId>
```

### Policy profiles

Every runtime advertises the **policy profiles** available to it (guardrail presets like `approval-on-write`, `read-only`, `allow-all`). These are read from `.codebolt/policy-profiles.json` in the project or fall back to application defaults. The selected profile governs which tool calls need approval.

## In this section

The platform page you're reading is the entry point. The detailed Cloud documentation lives under **Using Codebolt → Cloud**:

| Page | What it covers |
|---|---|
| **[Cloud Overview](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)** | What Cloud gives you, when to reach for it, and how it connects to the rest of CodeBolt |
| **[Cloud Portal](../../02_using-codebolt/02_surfaces/06_cloud/02_cloud-portal.md)** | The browser UI — three tabs and what lives under each |
| **[Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)** | Chat against an agent in a cloud sandbox or on your local machine |
| **[Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)** | Manage runtime instances, bring your own sandbox API key, scaling patterns |
| **[Marketplace Publishing](../../02_using-codebolt/02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md)** | Publishing agents, MCPs, skills, plugins, and more from the portal or CLI |

## When to use Cloud

- **You don't want to install the desktop app** — travel laptops, chromebooks, shared dev boxes
- **You're running many agents at once** — scale across isolated sandboxes instead of one laptop
- **You need repeatable environments** — a cloud runtime starts from a known template every time
- **You're publishing** to the marketplace — agents, MCPs, skills, and apps are published through the portal
- **Your team needs shared runtimes** — each runtime is identifiable and shows up across devices

Cloud is **additive**, not a replacement. Your local setup keeps working — Desktop, CLI, and TUI all sign in with the same account and consume the same marketplace.

If you need the fullest desktop affordances (`@mentions`, Ctrl+K inline editing, multi-pane diffs, multi-tab chat) and want execution on your own machine, use the **[Desktop App](./01_desktop.md)**. For terminal-first workflows, use the **[CLI](./02_cli.md)** or **[TUI](./03_tui.md)**.

## See also

- [Cloud Overview](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)
- [Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)
- [Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)
- [Platform Overview](../02_surfaces/01_overview.md) — compare all four platforms
- [Environments](../../02_using-codebolt/08a_environments/01_overview.md) — the broader environment concept that runtimes implement
