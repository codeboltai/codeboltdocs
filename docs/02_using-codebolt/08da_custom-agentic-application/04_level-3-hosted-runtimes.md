---
sidebar_position: 4
title: Level 3 Hosted Runtimes
---

import RemoteEnvironmentsOverview from '@site/src/components/diagrams/RemoteEnvironmentsOverview';

# Level 3: Separate Application with Hosted Runtimes

Level 3 is the remote runtime model.

Your application runs outside Codebolt and connects to cloud-hosted runtimes or remote sandboxes instead of a local Codebolt server.

## Core shape

Typical Level 3 architecture:

- A hosted or remote application acts as the user-facing product
- A remote runtime runs Codebolt agents
- A cloud relay or proxy maintains the connection between app and runtime
- Messages, thread state, and runtime events flow through that relay

<RemoteEnvironmentsOverview />

## How it works

1. The application provisions or selects a hosted runtime.
2. Codebolt runs in that remote environment.
3. The application connects to a cloud WebSocket or relay endpoint instead of `localhost`.
4. App messages are forwarded to the runtime.
5. Agent replies and runtime events are forwarded back to the app.

## What changes from Level 2

Level 2 and Level 3 can look similar from the UI side, but the connection target is different:

- Level 2 connects directly to a local Codebolt server
- Level 3 connects to a hosted runtime through a relay or remote transport layer

This changes deployment, runtime lifecycle, auth, and connection handling.

## When to use Level 3

- You want remote execution instead of local execution
- You want a hosted product experience
- You need per-user, per-thread, or per-workspace runtime provisioning
- The end user should not need to run a local Codebolt server

## Tradeoffs

Advantages:

- Best fit for hosted products
- Supports remote provisioning and runtime isolation
- Removes the requirement for a local Codebolt installation on the user machine

Limits:

- More moving parts: runtime provisioning, relay layer, and remote lifecycle management
- Requires cloud infrastructure and remote connection handling

## Related docs

- [Cloud](../02_surfaces/06_cloud/00_get-started.md)
- [Choosing the Right Architecture](./05_choosing-the-right-architecture.md)
