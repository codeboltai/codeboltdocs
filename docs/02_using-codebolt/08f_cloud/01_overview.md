---
sidebar_position: 1
title: Cloud Overview
description: Everything you do in the desktop app — run agents, edit code, install from the marketplace, manage providers — you can also do from a browser against cloud-managed runtimes.
---

import CloudPlatformArchitecture from '@site/src/components/diagrams/CloudPlatformArchitecture';

# Codebolt Cloud

Everything you do in the desktop app — run agents, edit code, install from the marketplace, manage providers — you can also do from a browser against cloud-managed runtimes. That is **Codebolt Cloud**: a hosted portal at [portal.codebolt.ai](https://portal.codebolt.ai) plus a runtime fabric that spins up sandboxed CodeBolt server instances on demand.

Nothing you already learned about CodeBolt changes. The agent runtime, the plugin system, the CLI, the settings format — all identical. Cloud is just *where* the CodeBolt server process runs (a managed sandbox) and *how* you interact with it (a browser, not a desktop window).

## Architecture at a glance

The cloud platform is built from three cooperating components:

<CloudPlatformArchitecture />

| Component | Where it lives | What it does |
|---|---|---|
| **Cloud Portal** | Your browser | The UI — chat, environments, marketplace, settings |
| **Wrangler WebSocket Server** | Cloudflare Workers + Durable Objects | Routes every message between portal and runtime; persists state in KV |
| **CodeBolt Runtime** | Managed sandbox **or** your local machine via the cloud plugin | The agent process that does the actual work |

Both connections (portal ↔ server, server ↔ runtime) are **outbound WebSocket** — no inbound ports are opened on your machine. The portal and your runtime never talk directly; the Wrangler server relays every message.

## What Cloud gives you

- **No install.** Sign in at [portal.codebolt.ai](https://portal.codebolt.ai) and you have a working CodeBolt environment — no Docker, no Node, no CLI bootstrap on your laptop.
- **Scale on demand.** Spawn one runtime per task, or many in parallel. Sandboxes are short-lived by default and clean up automatically.
- **Own your sandbox provider.** Use the hosted E2B tier, or bring your own API key for [E2B](https://e2b.dev) or [Daytona](https://daytona.io). Credentials live in your browser, not on our servers.
- **Publish once, reach everyone.** The marketplace — agents, MCPs, skills, capabilities, providers, action blocks, executors, templates, apps, plugins — is served from the same portal.
- **Manage from anywhere.** Your runtimes, login tokens, LLM providers, plans, and usage are all portal-native.

## Two ways to run an agent

Cloud offers **two execution models**, and understanding the difference is the key to using Cloud well:

### 1. Cloud sandbox (managed)

The portal spins up an isolated sandbox — [E2B](https://e2b.dev), [Daytona](https://daytona.io), [Runloop](https://runloop.ai), or a self-hosted Docker host — and runs the CodeBolt CLI inside it. You bring a repo URL (or a blank project), and the sandbox is yours for the lifetime of the runtime.

- **Best for:** parallel runs, clean/repeatable environments, when your laptop is busy or offline.
- **Lifecycle:** created on demand, auto-terminates after ~1 hour idle, can be stopped manually any time.
- **Sync:** changes flow back to your repo via **Git** (clone → work → push) or through **Review Merge Requests**.

### 2. Local runtime (your machine)

You connect your own machine as a **Runner Node** using the CodeBolt CLI's runner daemon. The agent runs on *your* hardware with *your* files and tools, but you drive it from any browser.

- **Best for:** working on local repositories, using local-only tooling, keeping data on your hardware.
- **Lifecycle:** stays alive as long as the runner daemon runs. No idle timeout.
- **Sync:** no sync needed — you're already on the real files. Use **Workspace Sync** to create isolated worktrees for each task.

> **Cloud is additive.** Your local desktop setup keeps working untouched. All surfaces (desktop, CLI, TUI, Cloud) share the same account, agents, and marketplace.

## When to reach for Cloud

- **You don't want to install the desktop app.** Travel laptops, chromebooks, shared dev boxes — the portal works in any modern browser.
- **You're running many agents at once.** Scaling on a laptop hits CPU, memory, and network limits fast. Cloud sandboxes isolate each run.
- **You need repeatable environments.** A cloud runtime starts from a known template every time. No "works on my machine."
- **You're publishing.** Agents, MCPs, skills, providers, and apps are published through the cloud portal — that's the only way to reach the marketplace.
- **You want to review agent work from anywhere.** Review Merge Requests (RMRs) surface agent-raised changes in a portal review queue.
- **Your team needs shared runtimes.** Each runtime is identifiable by user ID and shows up across devices when you sign in.

## When local is enough

- **Single-machine development** where a local CodeBolt server on your laptop is faster and free.
- **Offline work** — Cloud sandboxes need a live connection back to the portal's WebSocket bridge.
- **Strict data residency** — if your code can't leave your network, run self-hosted or local.

## What you'll find in this section

| Page | Covers |
|---|---|
| [Cloud Portal](./02_cloud-portal.md) | The browser UI — three tabs (Registry, Agents, Settings) and what lives under each |
| [Remote Chat](./03_remote-chat.md) | Chat against an agent in a cloud sandbox; clone a repo; pick or create a runtime |
| [Runtimes & Providers](./04_runtimes-and-providers.md) | Runtime types, lifecycle, bringing your own sandbox API key |
| [Cloud Environments](./06_environments.md) | Setting up environments, the three categories, parent/child environments, worktrees |
| [Syncing Changes](./07_syncing-changes.md) | Git sync vs Workspace Sync, merge strategies, environment paths |
| [Runner Nodes](./08_runner-nodes.md) | Connecting your own machine as a self-hosted runner |
| [Review Merge Requests](./09_review-merge-requests.md) | The RMR workflow for reviewing and merging agent-raised changes |
| [Marketplace Publishing](./05_marketplace-publishing.md) | Publishing agents, MCPs, skills, and plugins to the marketplace |

## Related

- [Cloud (Platforms)](../../01_get-started/02f_platforms/04_cloud.md) — the platform entry point
- [Remote Environments](../../04_build-on-codebolt/06_remote-environments.md) — the provider API for building custom sandbox backends
