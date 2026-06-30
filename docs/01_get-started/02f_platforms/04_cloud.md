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

> New here? **[Using Codebolt -> Cloud](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)** explains what Cloud gives you, and **[Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)** walks you through your first cloud agent run.

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

## Cloud APIs and endpoints

Most users do not need to call Cloud HTTP or WebSocket endpoints directly. The portal, cloud plugin, CLI, and runtime providers handle endpoint selection, authentication, runtime creation, live chat, previews, and sync.

The useful high-level details are:

- the portal talks to the Cloud REST API and live WebSocket relay
- cloud runtimes connect back over outbound WebSocket routes
- local runtimes use the cloud plugin, so you do not need to open inbound ports
- login tokens from Settings authenticate CLI, API, and self-started runtime flows

For endpoint URLs and platform details, see **[Cloud Portal](../../02_using-codebolt/02_surfaces/06_cloud/02_cloud-portal.md)**. For runtime lifecycle, sandbox providers, and environment behavior, see **[Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)** and **[Cloud Scaling](../04_core-concepts/07_cloud-scaling.md)**.

## In this section

The platform page you're reading is the entry point. The detailed Cloud documentation lives under **Using Codebolt → Cloud**:

| Page | What it covers |
|---|---|
| **[Using Codebolt -> Cloud](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)** | What Cloud gives you, when to reach for it, and how it connects to the rest of CodeBolt |
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

Cloud is **additive**, not a replacement. Your local setup keeps working - Desktop and CLI sign in with the same account and consume the same marketplace.

If you need the fullest desktop affordances (`@mentions`, Ctrl+K inline editing, multi-pane diffs, multi-tab chat) and want execution on your own machine, use the **[Desktop App](./01_desktop.md)**. For terminal-first workflows, use the **[CLI](./02_cli.md)**.

## See also

- [Using Codebolt -> Cloud](../../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)
- [Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md)
- [Runtimes & Providers](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md)
- [Platform Overview](../../02_using-codebolt/02_surfaces/01_overview.md) - compare all platforms
- [Environments](../../02_using-codebolt/08a_environments/01_overview.md) — the broader environment concept that runtimes implement
