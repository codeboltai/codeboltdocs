---
sidebar_position: 6
title: Preview Provider Settings
description: Manage providers that serve live previews of artifacts agents build — websites, apps, and static sites — from built-in, managed, and remote backends.
---

# Preview Provider Settings

**Preview Provider Settings** (`/settings/preview-providers`) manages the providers that serve **live previews** of artifacts your agents build — websites, web apps, static sites. When an agent produces something with a URL, a preview provider hosts it so you can click and view it in real time.

This is distinct from [Remote Sandboxes](./03_remote-sandboxes.md) (where agents *run*) and governs the **Preview Environments** tab under [Cloud Environments](../04_running-agents/02_environments.md).

## Preview provider kinds

| Kind | What it is |
|---|---|
| **builtin** | Built-in preview host bundled with Codebolt |
| **managed** | Codebolt-managed provider backed by a remote sandbox (E2B, Daytona, Runloop, Sprites) — uses credentials from Remote Sandboxes |
| **remote** | A remote preview endpoint you point Codebolt at |
| **local** | A local preview server |

Each provider declares which **artifact types** it can serve (e.g. `static-site`, `webapp`), so the right provider is picked per artifact.

## Managed providers

Managed providers are backed by the remote sandbox providers you've credentialed. The settings let you:

- **Enable/disable** the managed preview system as a whole
- Set a **default provider per artifact type** (`defaultProviderByType`)
- Toggle individual managed providers and set their **priority** and which artifact types they're the default for

A managed provider only shows as available when its underlying sandbox credentials are present (see [Remote Sandboxes](./03_remote-sandboxes.md)) and its implementation status is `available` (not `planned`).

## Adding and connecting

- **Add providers** — register a remote or local preview endpoint (URL + artifact types).
- **Live status** — the page reflects live connection state from the **PreviewHub** Durable Object; providers show as connected/available in real time.
- **Credentials** — managed providers reuse Remote Sandbox keys; remote providers may need their own credential fields.

## How previews appear

When an agent serves an artifact, a preview session is created with a status flow: `starting` → `acknowledged` → `ready` (or `error`). Ready previews show a clickable URL in the Preview Environments tab. Stopping a preview tears down the session but leaves the execution runtime intact.

## See also

- [Remote Sandboxes](./03_remote-sandboxes.md) — credentials managed providers depend on
- [Cloud Environments](../04_running-agents/02_environments.md) — the Preview Environments tab
- [Thread Runtime Providers](./04_thread-runtime-providers.md) — execution-side counterpart
