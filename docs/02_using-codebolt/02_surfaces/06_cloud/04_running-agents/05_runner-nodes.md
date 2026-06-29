---
sidebar_position: 5
title: Runner Nodes
description: Connect your own machine to Codebolt Cloud as a self-hosted runner node using the Codebolt CLI's runner daemon.
---

# Runner Nodes

A **Runner Node** is your own machine — a laptop, a workstation, or a server — connected to Codebolt Cloud so the agent runs on your hardware but you drive it from any browser. Runner nodes are the self-hosted counterpart to cloud sandboxes: no per-second billing, no idle timeout, full access to your local files, tooling, and network.

Runner nodes show up in the portal at **Agents → Runner Nodes** and the runtimes they host appear nested under **Agents → Environments → Self-Hosted Runner Nodes**.

## Why use a runner node

- **Work on local repositories** — the agent operates on your real working tree, no clone round-trip.
- **Use local-only tooling** — Docker, GPUs, databases, VPN-locked services that a cloud sandbox can't reach.
- **Keep data on your hardware** — nothing leaves your machine unless an agent explicitly writes or uploads it.
- **Long-lived, no idle timeout** — a runner stays alive as long as the daemon runs, unlike cloud sandboxes which auto-terminate after ~1 hour.

The connection is **outbound only**. The runner establishes a WebSocket to Cloudflare's relay infrastructure (the Wrangler server). No inbound ports are opened on your machine.

## Connecting a runner node

1. Get your cloud auth token from **Settings → Login Tokens** (see [Login Tokens](../05_settings/07_login-tokens.md)).
2. Run the daemon on the machine you want to connect:

```bash
codebolt runner daemon start --auth-token <your-cloud-auth-token>
```

The daemon registers with the cloud relay, generates a unique node ID, and begins streaming its status (CPU, memory, connection, host info) to the portal. The node appears in **Agents → Runner Nodes** within a few seconds.

3. Confirm it shows **online** in the portal. You can now target this node when creating a runtime in Remote Chat.

Multiple machines can connect under the same account — each is a separate node with its own runtimes.

## The Runner Nodes page

**Agents → Runner Nodes** lists every machine you've connected. For each node you see:

| Field | Meaning |
|---|---|
| **Status** | `online` (green), `offline` (grey) — based on the live WebSocket connection |
| **Node name** | Hostname or label you gave the node |
| **Node ID** | The unique identifier used in runtime IDs (`runner-<nodeId>-...`) |
| **CPU / Memory** | Live host metrics streamed from the daemon |
| **Host info** | OS, platform, monitor count — diagnostics from the machine |
| **Connected runtimes** | Runtimes hosted by this node, shown nested |

The page surfaces a **Start command** you can copy, pre-filled with your auth token placeholder, so you can onboard additional machines quickly.

## Runtimes on a runner

Each runtime hosted by a runner:

- Has type `runner` and origin `Runner`.
- Appears nested under its parent node in the Environments tree.
- Carries the node ID in its `runtime_id` (`runner-<nodeId>-<rand>`).
- Defaults to **Workspace Sync** (since it works on your local files).
- Has **no idle timeout** — it runs until the daemon stops or you stop it.

A runner node can host **multiple concurrent runtimes** (unlike single-action cloud sandboxes), so you can run several parallel threads on one machine.

## Stopping a runner

Stop a node by stopping the daemon on the machine:

```bash
codebolt runner daemon stop
```

Runtimes hosted by the node stop with it. Thread history and conversation logs are persisted on the portal backend and survive the restart. When you start the daemon again, the node re-registers and its runtimes come back online.

## See also

- [Remote Chat](./01_remote-chat.md) — local runtime mode
- [Cloud Environments](./02_environments.md) — the "Self-Hosted Runner Nodes" category
- [Runtimes & Providers](./04_runtimes-and-providers.md) — the `runner` runtime type
- [Login Tokens](../05_settings/07_login-tokens.md) — where to get the auth token
