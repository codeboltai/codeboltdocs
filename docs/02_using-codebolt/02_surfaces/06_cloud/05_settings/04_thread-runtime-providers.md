---
sidebar_position: 4
title: Thread Runtime Providers
description: Enable which remote sandbox providers can create execution environments for chat and issue threads.
---

# Thread Runtime Providers

**Thread Runtime Providers** (`/settings/thread-runtime-providers`) controls which remote sandbox providers are allowed to spin up execution environments for your chat threads and issue threads. It's a thin enable/disable layer that sits on top of the credentials you configure in [Remote Sandboxes](./03_remote-sandboxes.md).

A thread runtime is what runs when you start a Remote Chat in **New** mode or when a [Scheduled Task](../04_running-agents/07_scheduled-tasks.md) fires — a fresh sandbox provisioned on demand.

## How it relates to Remote Sandboxes

Each thread runtime provider maps to a **remote sandbox provider** whose credentials must already be configured:

| Thread provider | Needs sandbox credentials from | Runtime type |
|---|---|---|
| **E2B Remote** | E2B | `e2b` |
| **Sprites Remote** | Sprites | `sprites` |
| **Runloop Remote** | Runloop | `runloop` |
| **Modal Remote** *(planned)* | Modal | `modal` |

A provider **cannot be enabled until its credentials are set** in Remote Sandboxes. The page shows a **credentials set / credentials missing** badge on each, with an **Add credentials** shortcut that jumps to Remote Sandboxes.

## Enabling and disabling

- **Enable** — turns the provider on so it appears in the provider pickers (Remote Chat **New** mode, Scheduled Tasks). Providers with credentials are **enabled by default** the moment their credentials land.
- **Disable** — hides the provider from pickers without removing its credentials. Use this to temporarily retire a provider.

Changes save immediately via your account settings. The header shows the **enabled count**.

## Planned providers

Providers marked **planned** (currently Modal Remote) cannot be enabled yet — they're reserved for when the backend implementation lands. You can still store credentials ahead of time in Remote Sandboxes.

## What this enables

Once a thread runtime provider is enabled and credentialed, you can:

- Pick it as the **New** runtime provider in [Remote Chat](../04_running-agents/01_remote-chat.md)
- Target it as the `providerId` in [Scheduled Tasks](../04_running-agents/07_scheduled-tasks.md)
- Use it for issue-thread execution in [Issues & Tasks](../04_running-agents/09_issues-and-tasks.md)

## See also

- [Remote Sandboxes](./03_remote-sandboxes.md) — set the credentials first
- [Scheduled Tasks](../04_running-agents/07_scheduled-tasks.md) — consumes enabled providers
- [Runtimes & Providers](../04_running-agents/04_runtimes-and-providers.md) — runtime types
