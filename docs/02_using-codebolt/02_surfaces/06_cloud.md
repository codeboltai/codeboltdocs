---
sidebar_position: 6
title: Cloud
description: Codebolt's browser-based client — run agents in managed sandboxes or drive your local machine from anywhere via the cloud portal.
---

# Cloud

The Codebolt **Cloud** is the browser-based way to use Codebolt — nothing to install. Sign in at [portal.codebolt.ai](https://portal.codebolt.ai) and you get a full agent environment in any modern browser. It is the same agent runtime, plugin system, and CLI that power the desktop app; Cloud just controls *where the runtime runs* and *how you interact with it*.

Cloud offers two execution models:

- **Cloud sandbox** — the portal spins up an isolated sandbox (E2B, Daytona, Runloop, or a Runner Node) and runs the CodeBolt CLI inside it.
- **Local runtime** — you connect your own machine with the **cloud plugin**. The agent runs on your hardware with your files and tools, but you drive it from any browser.

> New here? The platform overview lives at **[Cloud (Platforms)](../../01_get-started/02f_platforms/04_cloud.md)**, and the full Cloud guide is under **[Cloud](../08f_cloud/01_overview.md)**.

## How to launch

Open **[portal.codebolt.ai](https://portal.codebolt.ai)** in a browser and sign in with the same account you use for the desktop app, then head to **Agents → Remote Chat**.

```text
https://portal.codebolt.ai
  → Agents
    → Remote Chat   (chat against a sandbox or local runtime)
    → Environments  (your runtime instances)
    → Runner Nodes  (connected local machines)
```

## What's cloud-only

- **Remote Chat** — talk to an agent running in a managed sandbox or on your machine, from any browser
- **Managed sandboxes** — spin up clean, isolated E2B / Daytona / Runloop runtimes on demand
- **Marketplace publishing** — agents, MCPs, skills, plugins, and apps are published through the portal
- **Runner Nodes** — register and manage connected local machines
- **Review Merge** — review and merge agent-raised changes from the portal

## What varies vs the desktop app

The browser client has lighter affordances than the desktop app — no `@mentions`, no Ctrl+K inline editing, no multi-pane visual diffs. Use the **[Desktop App](./02_desktop-app/00_get-started.md)** when you need those. Cloud is additive: your local setup keeps working, and all surfaces share the same account and marketplace.

## In this section

The detailed Cloud documentation lives under **Using Codebolt → Cloud**:

| Page | What it covers |
|---|---|
| **[Cloud Overview](../08f_cloud/01_overview.md)** | What Cloud gives you and when to reach for it |
| **[Cloud Portal](../08f_cloud/02_cloud-portal.md)** | The browser UI — Registry, Agents, Settings |
| **[Remote Chat](../08f_cloud/03_remote-chat.md)** | Chat against an agent in a cloud sandbox or on your local machine |
| **[Runtimes & Providers](../08f_cloud/04_runtimes-and-providers.md)** | Manage runtime instances and bring your own sandbox API key |
| **[Marketplace Publishing](../08f_cloud/05_marketplace-publishing.md)** | Publishing agents, MCPs, skills, and plugins |

## See also

- [Cloud (Platforms)](../../01_get-started/02f_platforms/04_cloud.md) — the platform entry point and architecture
- [Platform Overview](./01_overview.md) — compare all clients
- [Headless Mode](./05_headless.md)
